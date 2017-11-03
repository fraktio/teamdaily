import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import App from 'containers/AppContainer';
import ReduxRouter from 'components/ReduxRouter';
import RequiresAuthentication from 'components/RequiresAuthentication'
import firebaseApp from './firebaseApp';

import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';

addLocaleData([...en, ...fi]);

const messages = {
  en: require('./translations/en.json'),
  fi: require('./translations/fi.json'),
};

const DEFAULT_LOCALE = 'en'; //TODO:  Get from somewhere eles

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
        <ReduxRouter dispatch={store.dispatch}>
          <RequiresAuthentication firebaseApp={firebaseApp}>
            <App />
          </RequiresAuthentication>
        </ReduxRouter>
      </IntlProvider>
    </Provider>
  );
};

export default Root;
