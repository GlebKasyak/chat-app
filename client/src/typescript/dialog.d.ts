import { ICommon, ResponseType } from "./common";
import { IUser } from "./user";

export interface CreateDialogDataType {
    author: string,
    partner: string,
}

export interface DialogState {
    dialogs: Array<IDialog>,
    isSearching: boolean
}

export type LastMessageType = {
    message: string,
    avatar: string,
    name: string
}

export interface IDialog extends ICommon {
    author: IUser,
    partner: IUser,
    messages?: Array<IMessage>,
    lastMessage: LastMessageType
}

export interface IMessage extends ICommon {
    message: string,
    author: IUser,
    dialog: string,
}

export interface IResponseDialogsData extends ResponseType {
    dialogs?: Array<IDialog>
}