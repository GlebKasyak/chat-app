import React, { FC } from "react";

import "./style.scss";

type PropsType = {
    isTyping: boolean,
    message: string
}

const TypingMessage: FC<PropsType> = ({ isTyping, message }) => (
    <>
        { isTyping &&
            <div className="message-typing">
                <div>{ message }</div>
                <div className="message-typing__wrapper-animation">
                    <span className="point" />
                    <span className="point" />
                    <span className="point" />
                </div>
            </div>
        }
    </>
)

export default TypingMessage;