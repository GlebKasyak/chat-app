import React, { FC } from "react";
import Recaptcha from "react-recaptcha";

import { ENV } from "../../../assets/constants";
import "./style.scss";

type PropsType = {
    verifyCallback: (response: string) => void
};

const RecaptchaComponent: FC<PropsType> = ({ verifyCallback }) => (
    <Recaptcha
        verifyCallback={ verifyCallback }
        sitekey={ ENV.CAPTCHA_CLIENT_KEY }
        className="captcha"
        render="explicit"
    />
);

export default RecaptchaComponent;