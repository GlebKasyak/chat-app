import React, { FC } from "react";
import { History } from "history";
import { useHistory, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Button } from "antd";
import icons from "../../../shared/icons";

import "./style.scss";
import { logout } from "../../../store/actions/user.action";

import { storageKeys } from "../../../shared/constants";
import { AppStateType } from "../../../store/reducers";

type MapStateToPropsType = {
    token: string
}

type MapDispatchToPropsType = {
    logout: (token: string) => void
}

type NavBarPropsType = MapStateToPropsType & MapDispatchToPropsType;

const NavBar: FC<NavBarPropsType> = ({ logout, token }) => {
    const history: History = useHistory();
    const { pathname } = history.location;

    const authData = localStorage.getItem(storageKeys.isAuth);

    let navigationsLinks = authData && JSON.parse(authData)
        ? (
            <div className="navbar-wrapper">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    className="navbar navbar--left"
                    defaultSelectedKeys={ [pathname] }
                    selectedKeys={ [pathname] }
                >
                    <Menu.Item key="/" className="navbar__item" >
                        <NavLink exact to="/" >
                            <icons.HomeOutlined />
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/users" className="navbar__item" >
                        <NavLink to="/users" >
                            <icons.ContactsOutlined />
                            Users
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/dialogs" className="navbar__item" >
                        <NavLink to="/dialogs" >
                            <icons.MessageOutlined />
                            Dialogs
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/profile" className="navbar__item" >
                        <NavLink to="/profile" >
                            <icons.UserOutlined />
                            Profile
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/logout" >
                        <Button
                            type="danger"
                            className="btn"
                            icon="logout"
                            onClick={ () => {
                                logout(token);
                                localStorage.removeItem(storageKeys.isAuth);
                                localStorage.removeItem(storageKeys.userInfo);
                            } }
                        >
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </div>)
        : (
            <Menu
                mode="horizontal"
                theme="dark"
                className="navbar navbar--right"
                defaultSelectedKeys={ [pathname] }
                selectedKeys={ [pathname] }
            >
                <Menu.Item key="/login" className="navbar__item" >
                    <NavLink to="/login" >
                        <icons.LoginOutlined />
                        Login
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/register" className="navbar__item" >
                    <NavLink to="/register" >
                        <icons.SaveOutlined />
                        Register
                    </NavLink>
                </Menu.Item>
            </Menu>
        );

    return (
        <>{ navigationsLinks }</>
    )
};


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    ({ user }: AppStateType): MapStateToPropsType => ({ token: user.token }),
    { logout })
(NavBar);