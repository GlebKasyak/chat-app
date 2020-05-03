import React from "react";
import { Avatar, Card, Col, Tooltip } from "antd";
import icons from "./../../../shared/icons";

import { SERVER_URL } from "../../../shared/constants";
import { IUser } from "../../../typescript/user";
import "./style.scss";

type UserCardPropsType = {
    user: IUser,
    onClick: (partnerId: string) => Promise<void>
};

const UserCard: React.FC<UserCardPropsType> = ({ user, onClick }) => (
    <Col xs={24} sm={12} lg={8} className="user-card" >
        <Card
            className="user-card__card"
            actions={[
                <icons.SettingOutlined key="setting" />,
                <Tooltip title="Create dialog" >
                    <icons.MessageOutlined key="message" onClick={ onClick.bind(null, user._id) } />
                </Tooltip>
            ]}
        >
            <Card.Meta
                avatar={ <Avatar src={ `${ SERVER_URL }/${ user.avatar }` } /> }
                title={ `${ user.firstName } ${ user.secondName }` }
                description={ user.email }
            />
        </Card>
    </Col>
)

export default UserCard;