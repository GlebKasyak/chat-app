import { AppStateType } from "../reducers";


export class DialogSelectors {
    static getDialogs = (state: AppStateType) => state.dialog.dialogs;

    static getIfSearching = (state: AppStateType) => state.dialog.ifSearching;
}