import React, { FC, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import { EmptyComponent, Preloader } from "../../components";
import DialogsPage from "./DialogsPage";

import {
    getDialogsById,
    deleteDialogsById,
    searchDialogs,
    ThunkDispatchDialogsType,
    dialogActions
} from "../../store/actions/dialog.action";
import { UserSelectors, DialogSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { ResponseType, ScrollDataType } from "../../interfaces/common";
import { IDialog, IResponseDialogsData } from "../../interfaces/dialog";


type MapStateToPropsType = {
    userId: string,
    dialogs: Array<IDialog>,
    ifSearching: boolean
}

type MapDispatchToPropsType = {
    getDialogsById: (data: ScrollDataType) => Promise<IResponseDialogsData>
    deleteDialogsById: (dialogId: string) => void,
    searchDialogs: (value: string, userId: string) => Promise<ResponseType>,
    clearDialogList: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const DialogsPageContainer: FC<PropsType> = (
    {
        getDialogsById,
        deleteDialogsById,
        searchDialogs,
        userId,
        dialogs,
        ifSearching,
        clearDialogList
    }) => {

    const limit = 6;

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const data = { userId, limit, page };

    const fetchData = useCallback(async () => {
        setIsLoading(true);

        const response = await getDialogsById(data);
        response.dialogs!.length < limit && setHasMore(false);

        setIsLoading(false);
    }, [getDialogsById, data]);

    useEffect(() => {
        if(!!userId && page === 1 && !dialogs.length) {
            setPage(2);
            fetchData();
        }
    }, [userId, page, dialogs.length, fetchData]);

    useEffect(() => {
        return () => clearDialogList();
    }, [clearDialogList])

    const handleScroll = async () => {
        if(page > 1 && !ifSearching) {
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

        await deleteDialogsById(dialogId);
        clearDialogList();

        await getDialogsById({ userId, limit, page: 1 });

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
                page={ page }
            />
            { !dialogs.length &&  <EmptyComponent description="Dialogs list is empty" /> }
        </>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    userId: UserSelectors.getUserId(state),
    dialogs: DialogSelectors.getDialogs(state),
    ifSearching: DialogSelectors.getIfSearching(state)
})

const mapDispatchToProps = (dispatch: ThunkDispatchDialogsType) => ({
    getDialogsById: (data: ScrollDataType) => dispatch(getDialogsById(data)),
    deleteDialogsById: (dialogId: string) => dispatch(deleteDialogsById(dialogId)),
    searchDialogs: (value: string, userId: string) =>
        dispatch(searchDialogs(value, userId)),
    clearDialogList: () => dispatch(dialogActions.clearDialogListAC()),
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    mapDispatchToProps)
(DialogsPageContainer);