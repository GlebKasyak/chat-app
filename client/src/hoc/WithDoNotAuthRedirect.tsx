import React, { useEffect, ComponentType } from "react";
import { History } from "history";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { storageKeys } from "../shared/constants";
import { AppStateType } from "../store/reducers";

type MapStateToPropsType = {
    isAuth: boolean
}

const WithDoNotAuthRedirect = <P extends any>(Component: ComponentType<P>) => {
    type HocProps = MapStateToPropsType & P;

    const RedirectComponent: React.FC<HocProps | any> = props => {
        const history: History = useHistory();

        useEffect(() => {
            let isAuth = localStorage.getItem(storageKeys.isAuth);

            if(!isAuth || !JSON.parse(isAuth)) {
                if(history.location.pathname !== "/register") {
                    history.push("/login")
                }
            }

        }, [history, props.isAuth]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return connect<MapStateToPropsType, null, {}, AppStateType>(
        ({ user }: AppStateType): MapStateToPropsType => ({ isAuth: user.user.isAuth! }),
    null)
    (RedirectComponent);
};

export default WithDoNotAuthRedirect;