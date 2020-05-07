import React, { useState, memo, FC } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { connect } from "react-redux";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { ErrorMessage, Preloader } from "../../components";
import RegisterForm from "./RegisterForm";

import { UserAPI } from "../../apiServices/userAPI";
import { Handlers } from "../../interfaces/common";
import { RegisterDataType } from "../../interfaces/user";
import { getRegisterFieldsWithValidators } from "./registerFormFields";

const RegisterFormContainer: FC<FormComponentProps> = memo(({ form }) => {
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

     if(response.data.success) history.push("login");

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


  if(isLoading) return <Preloader text="Registration...Please wait" />;

  return (
      <>
        { err && <ErrorMessage text={ err } /> }
        <RegisterForm
            form={ form }
            onSubmit={ handleSubmit }
            registerFormFields={ getRegisterFieldsWithValidators(form) }
        />
      </>
  )
});


export default connect()(
    Form.create()(RegisterFormContainer)
);