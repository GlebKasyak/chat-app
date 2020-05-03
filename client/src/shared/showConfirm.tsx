import React from "react";
import { Modal } from "antd";
import icons from "./icons";

export default (onOk: () => void) => (
    Modal.confirm({
        title: "Do you Want to delete this account?",
        icon: <icons.ExclamationCircleOutlined />,
        onOk() { onOk() },
    })
)
