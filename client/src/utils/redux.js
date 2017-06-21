import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import { reducer as formReducer } from 'redux-form';

export function createStore(
  reducers,
  middlewares = [],
  enhancers = [],
  initialState = undefined,
) {
  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(
      ...middlewares,
    ),
    ...enhancers,
  )(reduxCreateStore);

  const reducer = combineReducers({
    ...reducers,
    // form: formReducer,
  });

  return createStoreWithMiddleware(reducer, initialState);
}
