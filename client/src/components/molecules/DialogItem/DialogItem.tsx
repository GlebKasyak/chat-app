import React, { FC } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button } from "antd";

import { LastMessageType } from "../../../interfaces/dialog";
import { getShortenString } from "../../../shared/helpres";
import icons from "../../../shared/icons";
import { ENV } from "../../../assets/constants";
import "./style.scss";

type PropsType = {
    name: string,
    lastMessage: LastMessageType,
    dialogId: string,
    onClick: (dialogId: string) => void,
    avatar: string,
}

const DialogItem: FC<PropsType> = (
    {
        name,
        lastMessage,
        dialogId,
        onClick,
        avatar,
    }) => (
    <List.Item className="dialog-item" >
        <Link to={ `/chat?id=${ dialogId }&partner=${ name }` } className="dialog-item__link" >
            <List.Item.Meta
                avatar={ <Avatar src={ `${ ENV.SERVER_URL }/${ avatar }` } className="dialog-item__avatar img" />  }
                title={ <p className="dialog-item__partner-name">{ name }</p> }
                description={
                    <div className="last-message">
                        <img
                            src={ `${ ENV.SERVER_URL }/${ lastMessage.avatar }` }
                            alt={ lastMessage.name }
                            className="last-message__avatar img"
                        />
                        <span className="last-message__author" >{ lastMessage.name }:</span>
                        <span className="last-message__message">{  getShortenString(lastMessage.message) }</span>
                    </div>
                }
            />
        </Link>
        <Button
            onClick={ onClick.bind(null, dialogId) }
            type="danger"
            className="dialog-item__btn"
        >
            Delete dialog
            <icons.DeleteOutlined />
        </Button>
    </List.Item>
)

export default DialogItem;