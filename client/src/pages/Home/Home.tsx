import React, { FC } from "react";
import { Typography } from "antd";

import { InfoMessage } from "../../components";

const Home: FC = () => {
    return (
        <div className="container">
            <Typography.Title level={2} >Simple chat</Typography.Title>
            <InfoMessage
                title="Greeting"
                description="Welcome!"
            />
        </div>
    );
};

export default Home;