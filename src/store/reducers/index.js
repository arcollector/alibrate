// @flow

import {
  combineReducers,
} from 'redux';

import {
  reducer as reducerLogin,
  initialState as initialStateLogin,
  type TStore as TStoreLogin,
} from './login';

export const reducer = combineReducers({
  login: reducerLogin,
});

export type TStore = {
  login: TStoreLogin,
};

export const initialState: TStore = {
  login: initialStateLogin,
};
