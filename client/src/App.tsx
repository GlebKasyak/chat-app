import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { AppStateType } from "./store/reducers";

import "./styles/app.scss";

import { Home, UsersPage, DialogsPage, ChatPage, ProfilePage, Page404 } from "./pages";
import { NavBar } from "./components";
import { LoginForm, RegisterForm } from "./modules";

import { Auth, DoNotAuth } from "./hoc";
import { storageKeys } from "./shared/constants";
import { getAuthUserData } from "./store/actions/user.action";

type MapStateToPropsType = {
  isAuth?: boolean,
}

type MapDispatchToPropsType = {
  getAuthUserData: (token: string) => void
}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

let App: FC<AppPropsType> = ({ isAuth, getAuthUserData }) => {
  useEffect(() => {
    const authData = localStorage.getItem(storageKeys.isAuth);

    if(!!authData && JSON.parse(authData)) {
      const authData = localStorage.getItem(storageKeys.userInfo);

      if (authData) {
        const data = JSON.parse(authData);
        getAuthUserData(data.token);
      }
    }
  }, [isAuth, getAuthUserData]);

  return (
      <div className={"app " + (isAuth ? "app--active" : "app--not-active")} >
        <NavBar />
        <Switch>
          <Route exact path="/" component={ DoNotAuth(Home) } />
          <Route exact path="/users" component={ DoNotAuth(UsersPage) } />
          <Route exact path="/dialogs" component={ DoNotAuth(DialogsPage) } />
          <Route exact path="/chat" component={ DoNotAuth(ChatPage) } />
          <Route exact path="/profile" component={ DoNotAuth(ProfilePage) } />

          <Route path="/login" component={ Auth(LoginForm) } />
          <Route path="/register" component={ Auth(RegisterForm) } />

          <Route path="*" component={ DoNotAuth(Page404) } />
        </Switch>
      </div>
  );
};

const mapStateToProps = ({ user }: AppStateType) => ({
  isAuth: user.user.isAuth,
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getAuthUserData })
(App);
