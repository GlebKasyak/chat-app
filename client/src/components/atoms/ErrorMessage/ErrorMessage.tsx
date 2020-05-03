import React, { CSSProperties, FC } from "react";
import { Alert } from "antd";

import "./style.scss";

type ErrorMessagePropsType = {
    text: string,
    style?: CSSProperties
};

const ErrorMessage: FC<ErrorMessagePropsType> = ({ text, style}) => (
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