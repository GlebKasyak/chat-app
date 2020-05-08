import React, { FC } from "react";
import { Divider, Col, Row, Typography, Button } from "antd";

import { DescriptionItem, UploadButton } from "../../components";

import { IUser } from "../../interfaces/user";
import { timeFromNow } from "../../shared/helpres";
import { ENV } from "../../assets/constants";
import showConfirm from "../../shared/showConfirm";
import "./style.scss";

type PropsType = {
    user: IUser,
    removeUser: () => void
}

const ProfilePage: FC<PropsType> = ({ user, removeUser }) => (
    <div className="profile container">
        <Typography.Title level={4} >User Profile</Typography.Title>
        <p className="profile__section" >Personal</p>

        <DescriptionItem title="The first name" content={ user.firstName } />
        <DescriptionItem title="The second name" content={ user.secondName } />
        <DescriptionItem title="Register date" content={ timeFromNow(user.createdAt!) } />

        <Row>
            <Col md={12} xs={24} className="profile__avatar" >
                <DescriptionItem title="Avatar" />
                <div className="profile-avatar-wrapper" >
                    <img
                        src={ user.avatar && `${ ENV.SERVER_URL }/${ user.avatar }` }
                        alt={ user.firstName }
                        className="profile-avatar img"
                    />
                </div>
                <UploadButton text="Update avatar" />
            </Col>
        </Row>

        <Divider />
        <p className="profile__section" >Contacts</p>

        <DescriptionItem title="Email" content={ user.email } />
        <Button
            onClick={ () => showConfirm(removeUser, "Do you Want to delete this account?") }
            type="danger"
            icon="delete"
            className="w-100 btn"
        >
            Remove account
        </Button>
    </div>
)

export default ProfilePage;