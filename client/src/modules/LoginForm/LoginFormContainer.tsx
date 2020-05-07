import React, { useEffect, useState, memo, FC } from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import LoginForm from "./LoginForm";
import { ErrorMessage, Preloader, Recaptcha } from "../../components";

import { login, ThunkDispatchUsersType } from "../../store/actions/user.action";
import { UserSelectors } from "../../store/selectors"
import { storageKeys } from "../../assets/constants/commons";
import rememberMe from "../../shared/rememberMe";

import { AppStateType } from "../../store/reducers";
import { Handlers, ResponseType } from "../../interfaces/common";
import { IUser, LoginDataType } from "../../interfaces/user";
import { getLoginFormFields } from "./loginFormFields";

type MapStateToPropsType = {
    user: IUser
}

type MapDispatchToPropsType = {
   login: (data: LoginDataType) => Promise<ResponseType>
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & FormComponentProps;

const LoginFormContainer: FC<PropsType> = memo((
    {
        user,
        form,
        login
    }) => {
    const [recaptchaResponse, setRecaptchaResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [errorsCount, setErrorsCount] = useState(0);

    const userDataFromLocalStorage = localStorage.getItem(storageKeys.isRememberMe);

    const fetchData = async (data: LoginDataType) => {
        setIsLoading(true);
        rememberMe(form, JSON.stringify(data));

        const response = await login(data);

        if(response.success) {
            setErrorsCount(0);
        } else {
            setIsLoading(false);
            setErr(response.message!);
            setErrorsCount(prevState => prevState + 1);
        }

        form.resetFields();
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();

        form.validateFields((err: Error) => {
            if(!err) {
                const { email, password } = form.getFieldsValue();
                fetchData({ email, password, captcha: recaptchaResponse, count: errorsCount });
            }
        });
    };

    useEffect(() => {
        if(user.isAuth) {
            localStorage.setItem(storageKeys.isAuth, JSON.stringify(user.isAuth));
        }

        return () => setIsLoading(false);
    }, [user.isAuth,  user._id]);

    useEffect(() => {
        if(userDataFromLocalStorage && !isLoading) {
            form.setFieldsValue({ "isRememberMe": true })
        }
    }, [userDataFromLocalStorage, isLoading]);


    if(isLoading) return <Preloader text="Authorization...Please wait" />;

    return (
        <>
            { err && <ErrorMessage text={ err } /> }
            <LoginForm
                form={ form }
                onSubmit={ handleSubmit }
                loginFormFields={ getLoginFormFields(userDataFromLocalStorage) }
            />
            { errorsCount > 2 && <Recaptcha
                verifyCallback={ response => setRecaptchaResponse(response) }
            /> }
        </>
    )
});

const mapDispatchToProps = (dispatch: ThunkDispatchUsersType) => ({
    login: (data: LoginDataType) => dispatch(login(data)),
});

const LoginFormComponent = Form.create()(LoginFormContainer);

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    state => ({ user: UserSelectors.getUser(state) }),
    mapDispatchToProps)
(LoginFormComponent);