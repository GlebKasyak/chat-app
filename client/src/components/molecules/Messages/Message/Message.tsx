import React, { FC } from "react";
import cn from "classnames";

import { IMessage } from "../../../../interfaces/dialog";
import { getTimeMessage } from "../../../../shared/helpres";
import "./style.scss";

type PropsType = {
    message: IMessage,
    userId: string
}

const Message: FC<PropsType> = ({ message, userId }) => {
    let self = userId === message.author._id;
    const name = self ? "You" : message.author.firstName;

    return (
        <div className={ cn("message mt-1", { "message--self": self }) }>
            <time className="message__time">{ getTimeMessage(message.createdAt!) }</time>
            <p className="message__author-name">
                { name }
            </p>
            <div className="message__box ">
                <p className="message__text">{ message.message }</p>
            </div>
        </div>
    );
}

export default Message;