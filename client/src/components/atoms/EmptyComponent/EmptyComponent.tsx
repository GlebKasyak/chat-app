import React, { ReactNode, FC } from "react";
import { Empty } from "antd";

import "./style.scss";

type PropsType = {
    description: string | ReactNode
}

const EmptyComponent: FC<PropsType> = ({ description }) =>
    <Empty description={ description } />;

export default EmptyComponent;
