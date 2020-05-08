import React from "react";
import { Modal } from "antd";
import icons from "./icons";

export default (onOk: () => void, title: string) => (
    Modal.confirm({
        title,
        icon: <icons.ExclamationCircleOutlined />,
        onOk() { onOk() },
    })
)
