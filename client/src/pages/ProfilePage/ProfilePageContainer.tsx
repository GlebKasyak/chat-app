import React, { FC } from "react";
import { connect } from "react-redux";

import { AppStateType } from "../../store/reducers";
import { IUser } from "../../typescript/user";
import { storageKeys } from "../../shared/constants";
import { removeUser } from "../../store/actions/user.action";

import ProfilePage from "./ProfilePage";

type MapStateToProps = {
  user: IUser,
  token: string
}

type MapDispatchToProps = {
  removeUser: (token: string) => void
}

type PropsType = MapStateToProps & MapDispatchToProps;

const ProfilePageContainer: FC<PropsType> = ({ user, token, removeUser }) => {

  const handleClick = () => {
    removeUser(token);
    localStorage.removeItem(storageKeys.isAuth);
    localStorage.removeItem(storageKeys.userInfo);
    localStorage.removeItem(storageKeys.isRememberMe);
  };

  return (
    <ProfilePage
        user={ user }
        onClick={ handleClick }
    />
  )
}

const mapStateToProps = ({ user }: AppStateType) => ({
  user: user.user,
  token: user.token
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    mapStateToProps,
    { removeUser }
)(ProfilePageContainer);