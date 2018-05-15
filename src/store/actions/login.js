// @flow

import {
  createActions,
} from 'redux-actions';

export type TData = {
  email: string,
  pass: string,
  failures?: number,
};

export type TDispatchers = {
  login: (data: TData) => any,
  loginTryAgain: () => any,
};

export type TPayloads = {
  loginStart: number,
  loginGood: { accessToken: string, timestamp: number },
  loginBad: { msg: string, timestamp: number },
  loginFailure: number,
};

export const {
  login: {
    login,
    loginStart,
    loginGood,
    loginBad,
    loginFailure,
    loginTryAgainBuffer,
    loginTryAgain,
  },
} = createActions({
  LOGIN: {
    LOGIN: [
      ({ email, pass }) => ({
        email,
        pass
      }),
      ({ failures }) => ({
        failures: typeof failures === 'undefined' ? 0 : failures
      })
    ],
    LOGIN_START: undefined,
    LOGIN_GOOD: undefined,
    LOGIN_BAD: undefined,
    LOGIN_TRY_AGAIN_BUFFER: undefined,
    LOGIN_TRY_AGAIN: undefined,
  },
});
