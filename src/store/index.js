// @flow

import {
  createStore,
  applyMiddleware,
} from 'redux';

import {
  reducer,
  initialState,
} from './reducers';

import {
  createEpicMiddleware,
} from 'redux-observable';

import epics from './epics';

import dependencies from '../dependencies';

export default () => {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      createEpicMiddleware(
        epics,
        { dependencies },
      )
    )
  );
};
