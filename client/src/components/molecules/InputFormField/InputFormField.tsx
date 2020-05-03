import React, { FC } from "react";
import { Form, Icon, Input } from "antd";
import { ValidationRule, FormComponentProps } from "antd/lib/form/Form";


interface IInputFormFieldProps extends FormComponentProps {
    labelField: string,
    nameField: string,
    rules: [ValidationRule],
    initialValue?: string,
    type?: string,
    iconType: string,
    onBlur?: () => void,
}

const InputFormField: FC<IInputFormFieldProps> = (
    {
        labelField,
        nameField,
        rules,
        initialValue,
        form,
        type,
        iconType,
        onBlur
    }) => (
    <Form.Item hasFeedback label={ labelField } >
        { form.getFieldDecorator(nameField, {
            rules,
            initialValue
        })(
            <Input
                type={ type || "text" }
                placeholder={ labelField }
                prefix={ <Icon type={ iconType } /> }
                onBlur={ onBlur }
            />
        )}
    </Form.Item>
);

export default InputFormField;