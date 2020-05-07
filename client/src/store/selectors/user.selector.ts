import { AppStateType } from "../reducers";


export class UserSelectors {
    static getUser = (state: AppStateType) => state.user.user;

    static getUserId = (state: AppStateType) => state.user.user._id;

    static getUsers = (state: AppStateType) => state.user.users;
}