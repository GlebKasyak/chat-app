import { IDbDocumentType } from "./common";

export interface UserState {
    user: IUser,
    users: Array<IUser>
}

export interface IUser extends IDbDocumentType{
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
    count: number
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}

