import React from 'react';
import { Provider } from 'react-redux';
import App from './components/container/AppContainer';
import ReduxRouter from './components/ReduxRouter';

const Root = ({ store }) => {
  return (
  <Provider store={store}>
    <ReduxRouter dispatch={store.dispatch}>
      <App />
    </ReduxRouter>
  </Provider>
)};

export default Root;
