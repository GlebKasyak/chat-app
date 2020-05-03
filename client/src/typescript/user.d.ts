import { ICommon } from "./common";

export interface UserState {
    user: IUser,
    token: string,
    users: Array<IUser>
}

export interface IUser extends ICommon{
    firstName: string,
    secondName: string,
    email: string,
    avatar: string,
    password?: string,
    isAuth?: boolean
}

export type LoginDataType = {
    email: string,
    password: string,
    captcha?: string
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}


