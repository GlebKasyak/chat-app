import React, { FC, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import {
    getDialogsById,
    deleteDialogsById,
    searchDialogs,
    ThunkDispatchDialogsType,
    dialogActions
} from "../../store/actions/dialog.action";
import { AppStateType } from "../../store/reducers";
import { ResponseType, ScrollDataType } from "../../typescript/common";
import { IDialog, IResponseDialogsData } from "../../typescript/dialog";

import { EmptyComponent, Preloader } from "../../components";
import DialogsPage from "./DialogsPage";


type MapStateToPropsType = {
    userId: string,
    token: string,
    dialogs: Array<IDialog>,
    isSearching: boolean
}

type MapDispatchToPropsType = {
    getDialogsById: (data: ScrollDataType) => Promise<IResponseDialogsData>
    deleteDialogsById: (dialogId: string, token: string) => void,
    searchDialogs: (value: string, token: string, userId: string) => Promise<ResponseType>,
    clearDialogList: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const DialogsPageContainer: FC<PropsType> = (
    {
        getDialogsById,
        deleteDialogsById,
        searchDialogs,
        userId,
        token,
        dialogs,
        isSearching,
        clearDialogList
    }) => {

    const limit = 6;

    const [page, setPage] = useState(Math.ceil(dialogs.length / limit) + 1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const data = { userId, token, limit, page };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setHasMore(true);

        const response = await getDialogsById(data);
        response.dialogs!.length < limit && setHasMore(false);

        setIsLoading(false);
    }, [getDialogsById, data]);

    useEffect(() => {
        if(!!token && !!userId && page === 1 && !dialogs.length) {
            setPage(2);
            fetchData();
        }
    }, [token, userId, page, dialogs.length, fetchData]);

    const handleScroll = async () => {
        if(page > 1 && !isSearching) {
            const response = await getDialogsById(data);

            setPage(prevPage => prevPage + 1);
            response.dialogs!.length < limit && setHasMore(false);
        } else {
            setHasMore(false);
        }
    };

    const getAllDialogs = () => {
        clearDialogList();
        setPage(1);
    }

    const deleteDialogByIdHandler = async (dialogId: string) => {
        setIsLoading(true);

        await deleteDialogsById(dialogId, token);
        clearDialogList();

        await getDialogsById({ userId, token, limit, page: 1 });

        setPage(2);
        setIsLoading(false);
    }

    if(isLoading) return <Preloader text="Dialogs are loading..." />

    return (
        <>
            <DialogsPage
                dialogs={ dialogs }
                userId={ userId }
                searchDialogs={ searchDialogs }
                onClick={ deleteDialogByIdHandler }
                setNextPage={ handleScroll }
                hasMore={ hasMore }
                getAllDialogs={ getAllDialogs }
            />
            { !dialogs.length &&  <EmptyComponent description="Dialogs list is empty" /> }
        </>
    )
}

const mapStateToProps = ({ user, dialog }: AppStateType) => ({
    userId: user.user._id,
    token: user.token,
    dialogs: dialog.dialogs,
    isSearching: dialog.isSearching
})

const mapDispatchToProps = (dispatch: ThunkDispatchDialogsType) => ({
    getDialogsById: (data: ScrollDataType) => dispatch(getDialogsById(data)),
    deleteDialogsById: (dialogId: string, token: string) => dispatch(deleteDialogsById(dialogId, token)),
    searchDialogs: (value: string, token: string, userId: string) =>
        dispatch(searchDialogs(value, token, userId)),
    clearDialogList: () => dispatch(dialogActions.clearDialogListAC()),
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps)
(DialogsPageContainer);