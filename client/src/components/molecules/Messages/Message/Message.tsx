import React, { FC } from "react";
import cn from "classnames";

import { IMessage } from "../../../../typescript/dialog";
import "./style.scss";


type PropsType = {
    message: IMessage,
    userId: string
}

const Message: FC<PropsType> = ({ message, userId }) => {
    let self = userId === message.author._id;
    const name = self ? "You" : message.author.firstName;

    return (
        <div className={ cn("message mt-1", {"message--self": self}) }>
            <p className="sent-text">{ name }</p>
            <div className="message-box ">
                <p className="message-text">{ message.message }</p>
            </div>
        </div>
    );
}

export default Message;