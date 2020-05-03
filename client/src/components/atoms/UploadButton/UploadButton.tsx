import React, { ChangeEvent, FC } from "react";
import { connect } from "react-redux";

import { uploadAvatar } from "../../../store/actions/user.action";
import { AppStateType } from "../../../store/reducers";

import { storageKeys } from "../../../shared/constants";
import icons from "../../../shared/icons";
import "./style.scss";


type MapDispatchToPropsType = {
    uploadAvatar: (type: string, file: File, token: string) => void
};

type OwnPropsType = { text: string };

type PropsType = MapDispatchToPropsType & OwnPropsType;


const UploadButton: FC<PropsType> = ({ text, uploadAvatar }) => {
    const token = JSON.parse(localStorage.getItem(storageKeys.userInfo) || "{}").token;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        uploadAvatar("avatar", e.target.files![0], token);
    };

    return (
        <div className="upload-file">
            <icons.UploadOutlined className="upload-file__icon" />{ text }
            <input onChange={ handleChange } type="file" className="upload-file__file-btn" />
        </div>
    )
};

export default connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    null,
    { uploadAvatar })
(UploadButton);