import React, { FC } from "react";

import Message from "./Message/Message";

import { IMessage } from "../../../typescript/dialog";

type PropsType = {
    messages: Array<IMessage>,
    userId: string
};

const Messages: FC<PropsType> = ({ messages, userId }) => (
    <div className="messages">
        { messages.map((message: IMessage ) =>
            <Message
                key={ message._id }
                message={ message }
                userId={ userId }
            />
        ) }
    </div>
)

export default Messages;