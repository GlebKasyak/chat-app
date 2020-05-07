import React, { FC } from "react";
import { FormComponentProps } from "antd/lib/form";
import { Button, Col, Form } from "antd";

import { InputFormField } from "../../components";

import { formItemLayout, tailFormItemLayout, formWrapperLayout } from "../../assets/constants/formLayout";
import { Handlers, FieldsType } from "../../interfaces/common";

interface IRegisterForm extends FormComponentProps{
    onSubmit: Handlers.SubmitType,
    registerFormFields: Array<FieldsType>
}

const RegisterForm: FC<IRegisterForm> = (
    {
        form,
        onSubmit,
        registerFormFields
    }) => (
    <div className="form-container">
      <div className="container">
          <Col { ...formWrapperLayout } offset={4} className="form"  >

              <Form  { ...formItemLayout } onSubmit={ onSubmit } >
                  { registerFormFields.map(field =>
                      <InputFormField
                          key={ field.nameField }
                          { ...field }
                          form={ form }
                      />
                  ) }
                  <Form.Item { ...tailFormItemLayout } >
                      <Button
                          type="primary"
                          htmlType="submit"
                          className="form__button w-100 btn"
                      >
                          Register
                      </Button>
                  </Form.Item>
              </Form>

          </Col>
      </div>
    </div>
);

export default RegisterForm;