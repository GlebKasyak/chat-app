import React, { FC } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button } from "antd";

import { LastMessageType } from "../../../typescript/dialog";
import { getShortenString } from "../../../shared/helpres";
import { SERVER_URL } from "../../../shared/constants";
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
        <Link to={ `/chat?id=${ dialogId }` } className="dialog-item__link" >
            <List.Item.Meta
                avatar={ <Avatar src={ `${ SERVER_URL }/${ avatar }` } className="dialog-item__avatar img" />  }
                title={ <p>{ name }</p> }
                description={
                    <div className="last-message">
                        <img
                            src={ `${ SERVER_URL }/${ lastMessage.avatar }` }
                            alt={ lastMessage.name }
                            className="last-message__avatar img"
                        />
                        <span className="last-message__author" >{ lastMessage.name }:</span>
                        <span className="last-message__message">{  getShortenString(lastMessage.message) }</span>
                    </div>
                }
            />
        </Link>
        <Button type="danger" onClick={ onClick.bind(null, dialogId) } className="dialog-item__btn" >
            Delete dialog
        </Button>
    </List.Item>
)

export default DialogItem;