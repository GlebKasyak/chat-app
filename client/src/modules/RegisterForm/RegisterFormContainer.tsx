import React, { useState, memo, FC } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { connect } from "react-redux";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { UserAPI } from "../../core/userAPI";

import { ErrorMessage, Preloader } from "../../components";
import RegisterForm from "./RegisterForm";

import { AppStateType } from "../../store/reducers";
import { Handlers, FieldsType } from "../../typescript/common";
import { RegisterDataType } from "../../typescript/user";


type PropsType = FormComponentProps;

const RegisterFormContainer: FC<PropsType> = memo(({ form }) => {
  const history: History = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setEr] = useState<string | null>(null);

  type DataType = { [field: string]: string };

  const fetchData = async (data: DataType) => {
    setIsLoading(true);

    const registerData: RegisterDataType = {
      firstName: data.firstName,
      secondName: data.secondName,
      email: data.email,
      password: data.password,
    };

   try {
     const response = await UserAPI.register(registerData);

     setIsLoading(false);
     form.resetFields();

     if(response.data.success) {
       history.push("login");
     }

   } catch (err) {
     setEr(err.response.data.err.errmsg);
     setIsLoading(false);
   }
  };

  const handleSubmit: Handlers.SubmitType = e => {
    e.preventDefault();

    form.validateFields((err: Error) => {
      if(!err) {
        const formData = form.getFieldsValue();
        fetchData(formData);
      }
    });
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue("password")) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  let registerFormFields = setRegisterFormField(
      [
        { "password": validateToNextPassword },
        { "confirm": compareToFirstPassword }
      ]);

  if(isLoading) return <Preloader text="Registration...Please wait" />;

  return (
      <>
        { err && <ErrorMessage text={ err } /> }
        <RegisterForm
            form={ form }
            onSubmit={ handleSubmit }
            registerFormFields={ registerFormFields }
        />
      </>
  )
});

type ValidatorsType = {
  [v: string]: (rule: any, value: any, callback: any) => any
}

const setRegisterFormField = (validators: Array<ValidatorsType>) => {
  const fields: Array<FieldsType> = [
    {
      labelField: "First Name",
      nameField: "firstName",
      rules: [{ required: true, message: "Minimum length 4! Maximum length 30!", min: 4, max: 30 }],
      iconType: "user"
    },
    {
      labelField: "Second Name",
      nameField: "secondName",
      rules: [{ required: true, message: "Minimum length 5! Maximum length 30!", min: 5, max: 30 }],
      iconType: "user"
    },
    {
      labelField: "Email",
      nameField: "email",
      type: "email",
      rules: [{ required: true, message: "Please input your email!", type: "email" }],
      iconType: "mail"
    },
    {
      labelField: "Password",
      nameField: "password",
      type: "password",
      rules: [
        { required: true, message: "Minimum length 5!", min: 5 }],
      iconType: "lock"
    },
    {
      labelField: "Compare Password",
      nameField: "confirm",
      type: "password",
      rules: [
        { required: true, message: "Please confirm your password!" }],
      iconType: "lock",
    },
  ];

  fields.map(field =>
    validators.forEach((validator: ValidatorsType) =>
        validator[field.nameField] && field.rules.push({
          validator: validator[field.nameField]
        })
    )
  );

  return fields;
};

const RegisterFormComponent = Form.create()(RegisterFormContainer);

export default connect<{}, null, {}, AppStateType>(
    null, null)
(RegisterFormComponent);