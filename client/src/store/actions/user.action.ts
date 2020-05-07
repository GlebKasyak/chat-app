import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../apiServices/userAPI";
import { AppStateType, InferActionsTypes } from "../reducers";
import { storageKeys } from "../../assets/constants/commons";

import { ResponseType, ScrollDataType } from "../../interfaces/common";
import { IUser, LoginDataType } from "../../interfaces/user";


export const userActions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
    getUsersAC: (payload: Array<IUser>) => ({ type: userTypes.GET_USERS, payload } as const),
    uploadAvatarAC: (payload: string) => ({ type: userTypes.UPLOAD_AVATAR, payload } as const),
    removeUserAC: () => ({ type: userTypes.REMOVE_USER } as const),
    searchUserByEmailAC: (payload: Array<IUser>) => ({ type: userTypes.SEARCH_USER_BY_EMAIL, payload } as const),
    clearUsersListAC: () => ({ type: userTypes.CLEAR_USERS_LIST } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof userActions>>;
export type ThunkDispatchUsersType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof userActions>>;


export const getAuthUserData = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me();
    const { success, user } = response.data;

    if(success) dispatch(userActions.loginAC(user!));
};

export const login = (data: LoginDataType): ThunkActionType<ResponseType> => async dispatch => {
    try {
        const response = await UserAPI.login(data);

        const { success, token, message } = response.data;
        if(success) {
            localStorage.setItem(storageKeys.token, JSON.stringify({ token }));
            dispatch(getAuthUserData());

            return { success, message };
        }
    } catch (err) { return err }
};

export const logout = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout();

    const { success } = response.data;
    if(success) {
        localStorage.removeItem(storageKeys.isAuth);
        localStorage.removeItem(storageKeys.token);

        dispatch(userActions.logoutAC());
    }
};

export const getUsers = (data: ScrollDataType): ThunkActionType<Array<IUser>> => async dispatch => {
    const response = await UserAPI.getUsers(data);

    const { success, users } = response.data;
    if(success) dispatch(userActions.getUsersAC(users));

    return users;
};

export const uploadAvatar = (type: string, file: File): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.uploadAvatar(type, file);

    const { success, avatar } = response.data;
    if(success) dispatch(userActions.uploadAvatarAC(avatar!));
};

export const removeUser = (): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.removeUser();

    if(response.data.success) {
        localStorage.clear();
        dispatch(userActions.removeUserAC());
    }
};

export const searchUserByEmail = (value: string, userId: string): ThunkActionType<ResponseType> => async dispatch => {
   try {
       const response = await UserAPI.searchUserByEmail(value, userId);

       const { success, user, message } = response.data;
       if(success) {
           dispatch(userActions.searchUserByEmailAC([user]));
           return { success, message };
       }

   } catch(err) {
       dispatch(userActions.searchUserByEmailAC([]));
       return err;
   }
};