import React, { CSSProperties, FC } from "react";
import { Alert } from "antd";

import "./style.scss";

type PropType = {
    text: string,
    style?: CSSProperties
};

const ErrorMessage: FC<PropType> = ({ text, style}) => (
    <Alert
        description={ text }
        style={ style }
        className="error-message"
        message="Error"
        type="error"
        showIcon
        closable
    />
);

export default ErrorMessage;