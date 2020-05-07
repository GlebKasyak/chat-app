import { WrappedFormUtils } from "antd/lib/form/Form";
import { FieldsType } from "../../interfaces/common";

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

export const getRegisterFieldsWithValidators = (form: WrappedFormUtils) => {
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

    return setRegisterFormField(
        [
            { "password": validateToNextPassword },
            { "confirm": compareToFirstPassword }
        ]);
};