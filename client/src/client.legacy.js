import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import store from 'util/redux';
import Root from './Root';
import { createRouter } from './routes';

import './client.less';

const history = syncHistoryWithStore(browserHistory, store)
const router = createRouter(history);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} router={router} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

// Enable hot reload
if (module.hot) {
  module.hot.accept('./Root', render);
}
