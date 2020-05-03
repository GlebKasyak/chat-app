import React from "react";

import "./style.scss";

type PropsType = {
    title: string,
    content?: string
}

const DescriptionItem: React.FC<PropsType> = ({ title, content }) => (
    <div className="description-item" >
        <p className="description-item__title" >{ title }:</p>
        { content }
    </div>
);

export default DescriptionItem;