import instance from "./api";
import { ScrollDataType } from "../typescript/common";
import { LoginDataType, RegisterDataType } from "../typescript/user";

export class UserAPI {

    static login = (data: LoginDataType) => {
        return instance.post("/user/login", data);
    };

    static me = (token: string) =>{
        return instance.get("/user/", {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static register = (data: RegisterDataType) => {
        return instance.post("/user/", data);
    };

    static logout = (token: string) => {
        return instance.get("/user/logout", {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static getUsers = ({ token, userId, limit, page }: ScrollDataType) => {
        return instance.get(`/user/all?userId=${ userId }&limit=${ limit }&page=${ page }`, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static uploadAvatar = (type: string, file: File, token: string) => {
        const formData: FormData = new FormData();
        formData.append(type, file);

        return instance.post("/user/upload-avatar", formData, {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${ token }` }

        });
    };

    static removeUser = (token: string) => {
        return instance.delete("/user/", {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static searchUserByEmail = (value: string, token: string, userId: string) => {
        return instance.post("/user/search", { value, userId }, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };
}