import React, { FC } from "react";
import { Alert } from "antd";

import "./style.scss";

type PropsType = {
    title: string,
    description: string
}

const InfoMessage: FC<PropsType> = ({ title, description }) => (
    <Alert
        message={ title }
        description={ description }
        type="info"
        showIcon
        className="info-message"
    />
);

export default InfoMessage;