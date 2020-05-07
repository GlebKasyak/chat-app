import React, { useEffect, ComponentType } from "react";
import { RouteComponentProps  } from "react-router-dom";

import { storageKeys } from "../assets/constants/commons";

const WithDoNotAuthRedirect = <P extends RouteComponentProps>(Component: ComponentType<P>) => {
     const RedirectComponent: React.FC<P> = props => {
        useEffect(() => {
            let isAuth = localStorage.getItem(storageKeys.isAuth);

            if(!isAuth || !JSON.parse(isAuth)) {
                if(props.history.location.pathname !== "/register") {
                    props.history.push("/login");
                }
            }

        }, [props.history]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return RedirectComponent;
};

export default WithDoNotAuthRedirect;