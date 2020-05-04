import React, { FC } from "react";
import { Button, Typography  } from "antd";
import icons from "../../shared/icons";
import { RouteComponentProps } from "react-router-dom";

import "./style.scss";

const Page404: FC<RouteComponentProps> = props => (
    <div className="container page-404">
        <Typography.Title type="warning" >Page 404</Typography.Title>
        <Button.Group>
            <Button type="primary" onClick={ () => props.history.goBack() }>
                <icons.LeftOutlined />
                Go back
            </Button>
        </Button.Group>
    </div>
)

export default Page404;


