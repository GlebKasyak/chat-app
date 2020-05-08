import axios from "axios";
import { History } from "history";

import { userActions } from "../store/actions/user.action";
import { StoreType } from "../store";
import { storageKeys } from "../assets/constants/commons";
import { ENV, urls } from "../assets/constants";

export default (store: StoreType, history: History) => {
    axios.defaults.baseURL = `${ ENV.SERVER_URL }/api/`;

    axios.interceptors.request.use(config =>{
        const authData = localStorage.getItem(storageKeys.token);
        config.headers.Authorization = !!authData && `Bearer ${ JSON.parse(authData).token }`;

        return config;
    }, err => console.log(err));

    axios.interceptors.response.use(res => res,
        ({ response }) => {
            switch (response.status) {
                case 404:
                    history.push(urls.page404);
                    return Promise.reject(response.data);
                case 401:
                    if(!localStorage.getItem(storageKeys.isAuth)) {
                        return Promise.reject(response.data);
                    }

                    localStorage.removeItem(storageKeys.isAuth);
                    localStorage.removeItem(storageKeys.token);

                    store.dispatch(userActions.logoutAC());
                    return Promise.reject(response.data);
                default:
                    return Promise.reject(response.data);
            }
        });
}

