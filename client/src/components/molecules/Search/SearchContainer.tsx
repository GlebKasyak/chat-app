import React, { FC, useState } from "react";
import { connect } from "react-redux";

import { AppStateType } from "../../../store/reducers";
import { UserSelectors } from "../../../store/selectors";
import { Handlers, ResponseType } from "../../../interfaces/common";

import Search from "./Search";
import { ErrorMessage } from "./../../index";

type MapStateToProps = {
    userId: string
}

type OwnProps = {
    callback: (value: string, userId: string) => Promise<ResponseType>,
    tooltip: string,
    placeholder: string,
}

type PropsType = MapStateToProps & OwnProps;

const SearchContainer: FC<PropsType> = (
    {
        userId,
        callback,
        tooltip,
        placeholder,
    }) => {
    const [value, setValue] = useState("");
    const [prevValue, setPrevValue] = useState("");
    const [err, setErr] = useState<string | null>(null);

    const handleSubmit: Handlers.SubmitType = async (e) => {
        e.preventDefault();

        setErr(null);
        setPrevValue(value);

        const response = await callback(value.trim(), userId);
        if(!response.success) setErr(response.message!);
    }

    return (
      <>
          { err && <ErrorMessage text={ err } /> }
          <Search
              value={ value }
              prevValue={ prevValue }
              setValue={ setValue }
              onSubmit={ handleSubmit }
              tooltip={ tooltip }
              placeholder={ placeholder }
          />
      </>
    )
}

export default connect<MapStateToProps, {}, OwnProps, AppStateType>(
    state => ({ userId: UserSelectors.getUserId(state) })
)(SearchContainer);