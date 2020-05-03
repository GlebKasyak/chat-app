import { ThunkAction, ThunkDispatch } from "redux-thunk";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../core/userAPI";
import { AppStateType, InferActionsTypes } from "../reducers";

import { ResponseType, ScrollDataType } from "../../typescript/common";
import { IUser, LoginDataType } from "../../typescript/user";

export const userActions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    setUserTokenAC: (payload: string) => ({ type: userTypes.SET_USER_TOKEN, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
    getUsersAC: (payload: Array<IUser>) => ({ type: userTypes.GET_USERS, payload } as const),
    uploadAvatarAC: (payload: string) => ({ type: userTypes.UPLOAD_AVATAR, payload } as const),
    removeUserAC: () => ({ type: userTypes.REMOVE_USER } as const),
    searchUserByEmailAC: (payload: Array<IUser>) => ({ type: userTypes.SEARCH_USER_BY_EMAIL, payload } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof userActions>>;
export type ThunkDispatchUsersType = ThunkDispatch<AppStateType, unknown, InferActionsTypes<typeof userActions>>;


export const getAuthUserData = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me(token);
    const { success, user, token: userToken } = response.data;

    if(success) {
        dispatch(userActions.setUserTokenAC(userToken!));
        dispatch(userActions.loginAC(user!));
    }
};

export const login = (data: LoginDataType): ThunkActionType<ResponseType> => async dispatch => {
    try {
        const response = await UserAPI.login(data);

        const { success, token, message } = response.data;
        if(success) {
            dispatch(getAuthUserData(token!));

            return { success, message };
        }
    } catch (err) {
        return err.response.data;
    }
};

export const logout = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout(token);

    const { success } = response.data;
    if(success) dispatch(userActions.logoutAC());
};

export const getUsers = (data: ScrollDataType): ThunkActionType<Array<IUser>> => async dispatch => {
    const response = await UserAPI.getUsers(data);

    const { success, users } = response.data;
    if(success) dispatch(userActions.getUsersAC(users));

    return users;
};

export const uploadAvatar = (type: string, file: File, token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.uploadAvatar(type, file, token);

    const { success, avatar } = response.data;
    if(success) dispatch(userActions.uploadAvatarAC(avatar!));
};

export const removeUser = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.removeUser(token);

    if(response.data.success) dispatch(userActions.removeUserAC());
};

export const searchUserByEmail = (value: string, token: string, userId: string): ThunkActionType<ResponseType> => async dispatch => {
   try {
       const response = await UserAPI.searchUserByEmail(value, token, userId);

       const { success, user, message } = response.data;
       if(success) {
           dispatch(userActions.searchUserByEmailAC([user]));
           return { success, message }
       }

   } catch(err) {
       dispatch(userActions.searchUserByEmailAC([]));
       return err.response.data;
   }
};