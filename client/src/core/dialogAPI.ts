import instance from "./api";
import { ScrollDataType } from "../typescript/common";
import { CreateDialogDataType } from "../typescript/dialog";

export class DialogAPI {

    static createDialog = (data: CreateDialogDataType, token: string) => {
        return instance.post("/dialog", data, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static getDialogsById = ({ userId, limit, page, token }: ScrollDataType) => {
        return instance.get(`/dialog?userId=${ userId }&limit=${ limit }&page=${ page }`, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static removeDialogByID = (dialogId: string, token: string) => {
        return instance.delete(`/dialog/${ dialogId }`, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static searchDialogs = (value: string, token: string, userId: string) => {
        return instance.post("/dialog/search", { value, userId }, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    }
}