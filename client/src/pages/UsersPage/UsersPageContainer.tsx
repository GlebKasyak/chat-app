import React, { useState, useEffect, useCallback, FC } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Preloader } from "../../components";
import UsersPage from "./UsersPage";

import { DialogAPI } from "../../core/dialogAPI";
import { AppStateType } from "../../store/reducers";
import { IUser } from "../../typescript/user";
import { ResponseType, ScrollDataType } from "../../typescript/common";
import { dialogActions, ThunkDispatchDialogsType } from "../../store/actions/dialog.action";
import { getUsers, searchUserByEmail, ThunkDispatchUsersType } from "../../store/actions/user.action";


type MapStateToPropsType = {
    userId: string,
    token: string,
    users: Array<IUser>,
}

type MapDispatchToPropsType = {
    getUsers: (data: ScrollDataType) => Promise<Array<IUser>>,
    searchUserByEmail: (value: string, token: string, userId: string) => Promise<ResponseType>,
    clearDialogList: () => void,
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersPageContainer: FC<PropsType> = (
    {
        getUsers,
        searchUserByEmail,
        userId,
        token,
        users,
        clearDialogList
    }) => {

    const limit = 9;
    const history = useHistory();

    const [page, setPage] = useState(Math.ceil(users.length / limit) + 1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const data = { userId, token, limit, page };

    const fetchData = useCallback( async () => {
        setIsLoading(true);

        const response = await getUsers(data);
        response.length < limit && setHasMore(false);

        setIsLoading(false);
    }, [getUsers, data]);

    const handleScroll = async () => {
        if(page > 1) {
            const response = await getUsers(data);

            setPage(prevPage => prevPage + 1);
            response.length < limit && setHasMore(false);
        }
    };

    useEffect(() => {
        if(!!token && !!userId && page === 1 && !users.length) {
            setPage(2);
            fetchData();
        }

    }, [fetchData, token, userId, users.length, page]);

    const createDialogHandler = async (partnerId: string) => {
        setIsLoading(true);
        const data = {
            author: userId,
            partner: partnerId,
        }

        await DialogAPI.createDialog(data, token);
        clearDialogList();

        setIsLoading(false);
        history.push("/dialogs");
    }

    if(isLoading) return <Preloader text="Users are loading... Please wait!" />;

    return <UsersPage
        users={ users }
        onClick={ createDialogHandler }
        setNextPage={ handleScroll }
        hasMore={ hasMore }
        searchUserByEmail={ searchUserByEmail }
    />
};


const mapStateToProps = ({ user }: AppStateType) => ({
    users: user.users,
    userId: user.user._id,
    token: user.token
});

type DispatchType = ThunkDispatchUsersType & ThunkDispatchDialogsType;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    getUsers: (data: ScrollDataType) => dispatch(getUsers(data)),
    searchUserByEmail: (value: string, token: string, userId: string) =>
        dispatch(searchUserByEmail(value, token, userId)),
    clearDialogList: () => dispatch(dialogActions.clearDialogListAC()),
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps)
(UsersPageContainer);