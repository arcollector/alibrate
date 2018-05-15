// @flow

import {
  handleActions,
} from 'redux-actions';

import {
  loginStart,
  loginGood,
  loginBad,
  loginFailure,
  type TPayloads,
} from '../actions/login';

export type TStore = {
  loginStart: number,
  loginGood: number,
  loginBad: number,
  msg: string,
  accessToken: string,
  loginFailure: number,
};

export const initialState: TStore = {
  loginStart: 0,
  loginGood: 0,
  loginBad: 0,
  msg: '',
  accessToken: '',
  loginFailure: 0,
};

export const reducer = handleActions(
  {
    [loginStart]: (
      state: TStore,
      { payload }: { payload: $PropertyType<TPayloads, 'loginStart'> }
    ): TStore => {
      return {
        ...state,
        loginStart: payload,
      };
    },

    [loginGood]: (
      state: TStore,
      { payload: { accessToken, timestamp } }: { payload: $PropertyType<TPayloads, 'loginGood'> }
    ): TStore => {
      return {
        ...state,
        accessToken,
        loginGood: timestamp,
      };
    },

    [loginBad]: (
      state: TStore,
      { payload: { msg, timestamp } }: { payload: $PropertyType<TPayloads, 'loginBad'> }
    ): TStore => {
      return {
        ...state,
        msg,
        loginBad: timestamp,
      };
    },

    [loginFailure]: (
      state: TStore,
      { payload }: { payload: $PropertyType<TPayloads, 'loginFailure'> }
    ): TStore => {
      return {
        ...state,
        loginFailure: payload,
      };
    },

  },
  initialState
);
