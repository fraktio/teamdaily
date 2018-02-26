/* global document, window */
/* eslint global-require: "off" */

import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { createStore } from "./utils/redux";
import { getMiddlewares, getReducers, getEnhancers } from "./config/redux";

const initialState = undefined;

const store = createStore(
  getReducers(),
  getMiddlewares(),
  getEnhancers(),
  initialState
);

function render(Root, rootElement) {
  ReactDOM.render(<Root store={store} />, rootElement);
}

const rootElement = document.getElementById("app");
render(Root, rootElement);

if (module.hot) {
  module.hot.accept("./Root", () => {
    const Root = require("./Root").default;
    render(Root, rootElement);
  });
}
