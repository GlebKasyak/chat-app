import React, { FC } from "react";
import Recaptcha from "react-recaptcha";

import { CAPTCHA_CLIENT_KEY } from "../../../shared/constants";
import "./style.scss";

type PropsType = {
    verifyCallback: (response: string) => void
};

const RecaptchaComponent: FC<PropsType> = ({ verifyCallback }) => (
    <Recaptcha
        verifyCallback={ verifyCallback }
        sitekey={ CAPTCHA_CLIENT_KEY }
        className="captcha"
        render="explicit"
    />
);

export default RecaptchaComponent;