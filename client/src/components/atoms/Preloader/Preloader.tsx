import React, { FC } from "react";
import { Spin } from "antd";

import "./style.scss";

type PropType = {
    text: string,
    modifier?: string
}

const Preloader: FC<PropType> = ({ text, modifier}) => (
    <Spin
        tip={ text }
        className={`preloader preloader--${ modifier }`}
        size="large"
    />
);

export default Preloader;