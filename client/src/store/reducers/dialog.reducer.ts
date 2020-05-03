import { Reducer } from "redux";

import * as dialogTypes from "../types/dialogTypes";
import { dialogActions } from "../actions/dialog.action";
import { DialogState } from "../../typescript/dialog";
import { InferActionsTypes } from "./index";

const initialState: DialogState = {
    dialogs: [],
    isSearching: false
};

type ActionsTypes = InferActionsTypes<typeof dialogActions>;

const reducer: Reducer<DialogState, ActionsTypes> = (state = initialState, action: ActionsTypes ): DialogState => {
    switch (action.type) {
        case dialogTypes.GET_DIALOGS_BY_ID:
            return {
                ...state,
                dialogs: [...state.dialogs, ...action.payload],
                isSearching: false
            };
        case dialogTypes.REMOVE_DIALOGS_BY_ID:
            return {
                ...state,
                dialogs: state.dialogs.filter(dialog => dialog._id !== action.payload)
            };
        case dialogTypes.CLEAR_DIALOG_LIST:
            return {  ...state, dialogs: [] };
        case dialogTypes.SEARCH_DIALOGS:
            return {
                ...state,
                dialogs: [...state.dialogs, ...action.payload],
                isSearching: true
            };
        default:
            return state;
    }
};

export default reducer;