import axios from "axios";
import { ScrollDataType } from "../interfaces/common";
import { CreateDialogDataType } from "../interfaces/dialog";

export class DialogAPI {
    static createDialog = (data: CreateDialogDataType) => axios.post("/dialog", data);

    static getDialogsById = ({ userId, limit, page }: ScrollDataType) =>
        axios.get(`/dialog?userId=${ userId }&limit=${ limit }&page=${ page }`);

    static removeDialogByID = (dialogId: string) => axios.delete(`/dialog/${ dialogId }`);

    static searchDialogs = (value: string, userId: string) =>
        axios.post("/dialog/search", { value, userId });
}