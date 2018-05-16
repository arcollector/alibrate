// @flow

import {
  combineEpics,
} from 'redux-observable';

import {
  epics as epicsLogin,
} from './login';

import {
  epics as epicsReviewers,
} from './reviewers';

export default combineEpics(
  ...epicsLogin,
  ...epicsReviewers,
);
