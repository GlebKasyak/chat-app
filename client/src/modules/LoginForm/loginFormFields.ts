import { FieldsType } from "../../interfaces/common";


type InitialValueType = {
    [key: string]: any
};

const setLoginFormFields = (initialValues: Array<InitialValueType>) => {
    const fields: Array<FieldsType> = [
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
            rules: [{ required: true, message: "Minimum length 5!", min: 5 }],
            iconType: "lock"
        },
    ];

    fields.map(field =>
        initialValues.forEach(value => {
            if(value[field.nameField]) {
                field.initialValue = value[field.nameField] || ""
            }
        })
    );

    return fields;
};

export const getLoginFormFields = (dataFromStorage: string | null) => {
    let values = [];

    if(dataFromStorage) {
        let dataAfterParse = JSON.parse(dataFromStorage);

        for(let [key, value] of  Object.entries(dataAfterParse)) {
            values.push({ [key]: value })
        }
    }

    return setLoginFormFields(values);
};
