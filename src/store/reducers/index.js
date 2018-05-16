// @flow

import {
  combineReducers,
} from 'redux';

import {
  reducer as reducerLogin,
  initialState as initialStateLogin,
  type TStore as TStoreLogin,
} from './login';

import {
  reducer as reducerPage,
  initialState as initialStatePage,
  type TStore as TStorePage,
} from './page';

import {
  reducer as reducerReviewers,
  initialState as initialStateReviewers,
  type TStore as TStoreReviewers,
} from './reviewers';

export const reducer = combineReducers({
  login: reducerLogin,
  page: reducerPage,
  reviewers: reducerReviewers,
});

export type TStore = {
  login: TStoreLogin,
  page: TStorePage,
  reviewers: TStoreReviewers,
};

export const initialState: TStore = {
  login: initialStateLogin,
  page: initialStatePage,
  reviewers: initialStateReviewers,
};
