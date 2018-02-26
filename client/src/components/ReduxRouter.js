import React from "react";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

export const history = createBrowserHistory();

class ReduxRouter extends React.Component {
  componentDidMount() {
    this.unsubscribe = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleLocationChange = (location, action) => {
    const { dispatch } = this.props;

    dispatch({
      type: LOCATION_CHANGE,
      location,
      action
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
}

export const { push, replace, go, goBack, goForward } = history;

export default ReduxRouter;
