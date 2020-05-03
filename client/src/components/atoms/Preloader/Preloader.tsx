import React, { FC } from "react";
import { Spin } from "antd";

import "./style.scss";

type PreloaderPropsType = {
    text: string,
    modifier?: string
}

const Preloader: FC<PreloaderPropsType> = ({ text, modifier}) => (
    <Spin
        tip={ text }
        className={`preloader preloader--${ modifier }`}
        size="large"
    />
);

export default Preloader;