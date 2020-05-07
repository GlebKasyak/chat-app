import React from "react";
import { Avatar, Card, Col, Tooltip } from "antd";
import icons from "./../../../shared/icons";

import { ENV } from "../../../assets/constants";
import { IUser } from "../../../interfaces/user";
import "./style.scss";

type PropsType = {
    user: IUser,
    onClick: (partnerId: string) => Promise<void>
};

const UserCard: React.FC<PropsType> = ({ user, onClick }) => (
    <Col xs={24} sm={12} lg={8} className="user-card" >
        <Card
            className="user-card__card"
            actions={[
                <Tooltip title="Create dialog" >
                 <div onClick={ onClick.bind(null, user._id) } >
                     <span>Create dialog </span>
                     <icons.MessageOutlined key="message"  />
                 </div>
                </Tooltip>
            ]}
        >
            <Card.Meta
                avatar={ <Avatar src={ `${ ENV.SERVER_URL }/${ user.avatar }` } /> }
                title={
                    <div className="user-card__title" >
                        { user.firstName } { user.secondName }
                    </div>
                }
                description={ user.email }
            />
        </Card>
    </Col>
)

export default UserCard;