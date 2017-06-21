/* global __DEVELOPMENT__ */

import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from '../ducks';

export function getMiddlewares() {
  let middleware = [
    thunk,
    promiseMiddleware(),
  ];

  if (__DEVELOPMENT__) {
    middleware = middleware.concat([
      logger
    ]);
  }

  return middleware;
}

export function getReducers() {
  return reducers;
}

export function getEnhancers() {
  return [];
}
