// remember me in localstorage
import { WrappedFormUtils } from "antd/lib/form/Form";
import { storageKeys } from "./constants";

export default (form: WrappedFormUtils, data: string) => {
    if(form.getFieldValue("isRememberMe")) {
        localStorage.setItem(storageKeys.isRememberMe, data);
    } else {
        localStorage.removeItem(storageKeys.isRememberMe);
        form.setFieldsValue({ "isRememberMe": false })
    }
};