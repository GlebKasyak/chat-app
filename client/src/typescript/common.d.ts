import React, { Dispatch, SetStateAction } from "react";
import { ValidationRule } from "antd/lib/form";

export interface ResponseType {
    message?: string,
    success: boolean,
    err?: Error
}

export namespace Handlers {
    type SubmitType = (e: SubmitTypes) => Promise<void> | void;
    type ChangeType = (e: ChangeTypes) => void;
    type ClickType = (e: React.MouseEvent<HTMLButtonElement>) => void;

    type SubmitTypes =
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLElement, MouseEvent>

    type ChangeTypes =
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;


export type FieldsType = {
    labelField: string,
    nameField: string,
    type?: string,
    rules: [ValidationRule],
    iconType: string,
    initialValue?: string
}

export interface ICommon {
    _id: string,
    createdAt?: string,
    updatedAt?: string
}

export type ScrollDataType = {
    userId: string,
    token: string,
    limit: number,
    page: number
}