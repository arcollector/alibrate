// @flow

import {
  combineEpics,
} from 'redux-observable';

import {
  epics as epicsLogin,
} from './login';

export default combineEpics(
  ...epicsLogin,
);
