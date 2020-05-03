import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as dialogTypes from "../types/dialogTypes";
import { DialogAPI } from "../../core/dialogAPI";
import { AppStateType, InferActionsTypes } from "../reducers";
import { ResponseType, ScrollDataType } from "../../typescript/common";
import { IDialog, IResponseDialogsData } from "../../typescript/dialog";

export const dialogActions = {
    getDialogsByIdAC: (payload: Array<IDialog>) => ({ type: dialogTypes.GET_DIALOGS_BY_ID, payload } as const),
    removeDialogsByIdAC: (payload: string) => ({ type: dialogTypes.REMOVE_DIALOGS_BY_ID, payload } as const),
    searchDialogsAC: (payload: Array<IDialog>) => ({ type: dialogTypes.SEARCH_DIALOGS, payload } as const),
    clearDialogListAC: () => ({ type: dialogTypes.CLEAR_DIALOG_LIST } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof dialogActions>>;
export type ThunkDispatchDialogsType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof dialogActions>>;


export const getDialogsById = (data: ScrollDataType): ThunkActionType<IResponseDialogsData> => async dispatch => {
    try {
        const response = await DialogAPI.getDialogsById(data);

        const { success, dialogs } = response.data;
        if(success) {
            dispatch(dialogActions.getDialogsByIdAC(dialogs));
            return { success, dialogs };
        }
    } catch (err) {
        return err.response.data;
    }
};

export const deleteDialogsById = (dialogId: string, token: string): ThunkActionType<void> => async dispatch => {
    const response = await DialogAPI.removeDialogByID(dialogId, token);

    if(response.data.success) dispatch(dialogActions.removeDialogsByIdAC(dialogId));
};

export const searchDialogs = (value: string, token: string, userId: string): ThunkActionType<ResponseType> => async dispatch => {
   try {
       const response = await DialogAPI.searchDialogs(value, token, userId);

       const { success, dialogs, message } = response.data;
       if(success) {
           dispatch(dialogActions.clearDialogListAC());
           dispatch(dialogActions.searchDialogsAC(dialogs));

           return { success, message }
       }
   } catch (err) {
       dispatch(dialogActions.clearDialogListAC());
       return err.response.data;
   }
}