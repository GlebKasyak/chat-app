import axios from "axios";
import { ScrollDataType } from "../interfaces/common";
import { LoginDataType, RegisterDataType } from "../interfaces/user";

export class UserAPI {
    static login = (data: LoginDataType) => axios.post("/users/login", data);

    static me = () => axios.get("/users/");

    static register = (data: RegisterDataType) => axios.post("/users/", data);

    static logout = () => axios.get("/users/logout", );

    static getUsers = ({ userId, limit, page }: ScrollDataType) =>
        axios.get(`/users/all?userId=${ userId }&limit=${ limit }&page=${ page }`);

    static uploadAvatar = (type: string, file: File) => {
        const formData: FormData = new FormData();
        formData.append(type, file);

        return axios.post("/users/upload-avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    };

    static removeUser = () => axios.delete("/users/");

    static searchUserByEmail = (value: string, userId: string) =>
        axios.post("/users/search", { value, userId });
}