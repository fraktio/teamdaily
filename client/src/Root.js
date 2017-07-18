import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import App from './components/container/AppContainer';
import ReduxRouter from './components/ReduxRouter';

import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';

addLocaleData([...en, ...fi]);

const Root = ({ store }) => {
  return (
  <Provider store={store}>
    <IntlProvider
      locale={'en'}
    >
      <ReduxRouter dispatch={store.dispatch}>
        <App />
      </ReduxRouter>
    </IntlProvider>
  </Provider>
)};

export default Root;
