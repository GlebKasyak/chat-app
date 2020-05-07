import React, { FC } from "react";
import { Form, Button, Col, Checkbox  } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Link } from "react-router-dom";

import { InputFormField } from "../../components"

import { formItemLayout, tailFormItemLayout, formWrapperLayout } from "../../assets/constants/formLayout";
import { Handlers, FieldsType } from "../../interfaces/common";

interface ILoginForm extends FormComponentProps {
    onSubmit: Handlers.SubmitType,
    loginFormFields: Array<FieldsType>
}

const LoginForm: FC<ILoginForm> = ({ form, onSubmit, loginFormFields }) =>  (
    <div className="form-container" >
       <div className="container" >
           <Col { ...formWrapperLayout } offset={4} className="form"  >
               <Form { ...formItemLayout } onSubmit={ onSubmit } >
                   { loginFormFields.map(field =>
                       <InputFormField
                           key={ field.nameField }
                           { ...field }
                           form={ form }
                       />
                   ) }
                   <Form.Item { ...tailFormItemLayout } >
                       { form.getFieldDecorator("isRememberMe", {
                           valuePropName: "checked",
                           initialValue: false,
                       }) (<Checkbox>Remember me</Checkbox>)}
                       <Button
                           type="primary"
                           htmlType="submit"
                           className="form__button w-100 btn"
                       >
                           Log in
                       </Button>
                       Or <Link to="/register">register now!</Link>
                   </Form.Item>
               </Form>
           </Col>
       </div>
    </div>
);

export default LoginForm;