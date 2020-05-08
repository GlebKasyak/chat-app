import React, { useState, useEffect, useCallback, FC } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Preloader } from "../../components";
import UsersPage from "./UsersPage";

import { DialogAPI } from "../../apiServices/dialogAPI";
import { AppStateType } from "../../store/reducers";
import { IUser } from "../../interfaces/user";
import { ResponseType, ScrollDataType } from "../../interfaces/common";
import { UserSelectors } from "../../store/selectors";
import { dialogActions, ThunkDispatchDialogsType } from "../../store/actions/dialog.action";
import { getUsers, searchUserByEmail, ThunkDispatchUsersType, userActions } from "../../store/actions/user.action";


type MapStateToPropsType = {
    userId: string,
    users: Array<IUser>,
}

type MapDispatchToPropsType = {
    getUsers: (data: ScrollDataType) => Promise<Array<IUser>>,
    searchUserByEmail: (value: string, userId: string) => Promise<ResponseType>,
    clearDialogList: () => void,
    clearUsersListAC: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersPageContainer: FC<PropsType> = (
    {
        getUsers,
        searchUserByEmail,
        userId,
        users,
        clearDialogList,
        clearUsersListAC
    }) => {

    const limit = 6;
    const history = useHistory();

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const data = { userId, limit, page };

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
        if(!!userId && page === 1 && !users.length) {
            setPage(2);
            fetchData();
        }

    }, [fetchData, userId, users.length, page]);

    useEffect(() => {
        return () => clearUsersListAC();
    }, [clearUsersListAC])

    const createDialogHandler = async (partnerId: string) => {
        setIsLoading(true);
        const data = { author: userId, partner: partnerId };

        await DialogAPI.createDialog(data);
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
        page={ page }
    />
};


const mapStateToProps = (state: AppStateType) => ({
    users: UserSelectors.getUsers(state),
    userId: UserSelectors.getUserId(state)
});

type DispatchType = ThunkDispatchUsersType & ThunkDispatchDialogsType;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    getUsers: (data: ScrollDataType) => dispatch(getUsers(data)),
    searchUserByEmail: (value: string, userId: string) =>
        dispatch(searchUserByEmail(value, userId)),
    clearUsersListAC: () => dispatch(userActions.clearUsersListAC()),
    clearDialogList: () => dispatch(dialogActions.clearDialogListAC()),
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps)
(UsersPageContainer);