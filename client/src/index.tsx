import React from "react";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import App from "./App";

import apiServices from "./apiServices";
import { store } from "./store";

const history = createBrowserHistory();
apiServices(store, history);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history } >
            <App/>
        </Router>
    </Provider>,
    document.getElementById("root"));
