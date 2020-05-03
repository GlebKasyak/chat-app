import React, { FC } from "react";
import { Input, Button, Tooltip } from "antd";

import { SetStateType, Handlers } from "../../../typescript/common";
import "./style.scss";

type PropsType = {
    value: string,
    prevValue: string,
    setValue: SetStateType<string>,
    onSubmit: Handlers.SubmitType,
    tooltip: string
}

const Search: FC<PropsType> = ({ value, prevValue, setValue, onSubmit, tooltip }) => {
  return (
      <form onSubmit={ onSubmit } className="search" >
          <Input
              value={ value }
              onChange={ e => setValue(e.target.value) }
              className="search__input"
              placeholder="Enter your request"

          />
          <Tooltip title={ tooltip } >
              <Button
                  htmlType="submit"
                  className="search__btn"
                  icon="search"
                  type="primary"
                  disabled={ !value || prevValue === value }
              />
          </Tooltip>
      </form>
  )
}

export default Search;