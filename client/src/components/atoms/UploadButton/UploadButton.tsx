import React, { ChangeEvent, FC } from "react";
import { connect } from "react-redux";

import { uploadAvatar } from "../../../store/actions/user.action";
import { ThunkDispatchUsersType } from "../../../store/actions/user.action";
import icons from "../../../shared/icons";
import "./style.scss";


type Props = {
    text: string,
    dispatch: ThunkDispatchUsersType
};

const UploadButton: FC<Props> = ({ text, dispatch }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(uploadAvatar("avatar", e.target.files![0]));
    };

    return (
        <div className="upload-file btn">
            <icons.UploadOutlined className="upload-file__icon" />{ text }
            <input onChange={ handleChange } type="file" className="upload-file__file-btn" />
        </div>
    )
};

export default connect()(UploadButton);