import React, { FC } from "react";
import { Divider, Col, Row, Typography, Button } from "antd";

import { IUser } from "../../typescript/user";
import { timeFromNow } from "../../shared/helpres";
import { SERVER_URL } from "../../shared/constants";
import showConfirm from "../../shared/showConfirm";

import { DescriptionItem, UploadButton } from "../../components";
import "./style.scss";

type PropsType = {
    user: IUser,
    onClick: () => void
}

const ProfilePage: FC<PropsType> = ({ user, onClick }) => (
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
                        src={ user.avatar && `${ SERVER_URL }/${ user.avatar }` }
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
            onClick={ () => showConfirm(onClick) }
            type="danger"
            icon="delete"
        >
            Remove account
        </Button>
    </div>
)

export default ProfilePage;