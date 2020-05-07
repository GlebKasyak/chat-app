import React, { FC } from "react";
import { Input, Button, Tooltip } from "antd";

import { SetStateType, Handlers } from "../../../interfaces/common";
import "./style.scss";

type PropsType = {
    value: string,
    prevValue: string,
    setValue: SetStateType<string>,
    onSubmit: Handlers.SubmitType,
    tooltip: string,
    placeholder: string
}

const Search: FC<PropsType> = props => (
    <form onSubmit={ props.onSubmit } className="search" >
        <Input
            value={ props.value }
            onChange={ e => props.setValue(e.target.value) }
            className="search__input"
            placeholder={ props.placeholder }

        />
        <Tooltip title={ props.tooltip } >
            <Button
                htmlType="submit"
                className="search__btn"
                icon="search"
                type="primary"
                disabled={ !props.value || props.prevValue === props.value }
            >
                Search
            </Button>
        </Tooltip>
    </form>
)

export default Search;