import React, { FC, useState } from "react";
import { connect } from "react-redux";

import { AppStateType } from "../../../store/reducers";
import { Handlers, ResponseType } from "../../../typescript/common";

import Search from "./Search";
import { ErrorMessage } from "./../../"

type MapStateToProps = {
    token: string,
    userId: string
}

type OwnProps = {
    callback: (value: string, token: string, userId: string) => Promise<ResponseType>,
    tooltip: string
}

type PropsType = MapStateToProps & OwnProps;

const SearchContainer: FC<PropsType> = ({ token, userId, callback, tooltip }) => {
    const [value, setValue] = useState("");
    const [prevValue, setPrevValue] = useState("");
    const [err, setErr] = useState<string | null>(null);

    const handleSubmit: Handlers.SubmitType = async (e) => {
        e.preventDefault();

        setErr(null);
        setPrevValue(value);

        const response = await callback(value.trim(), token, userId);
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
          />
      </>
    )
}

const mapStateToProps = ({ user }: AppStateType) => ({
    token: user.token,
    userId: user.user._id
});

export default connect<MapStateToProps, null, OwnProps, AppStateType>(mapStateToProps)(SearchContainer);