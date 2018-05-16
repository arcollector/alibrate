// @flow

import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { _throw } from 'rxjs/observable/throw';
import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  FAILURES_MAX_RETRIES,
  FAILURES_RETRY_DELAY,
} from './constants';

import {
  login,
  loginStart,
  loginGood,
  loginBad,
  loginFailure,
  loginTryAgainBuffer,
  loginTryAgain,
} from '../actions/login';

import { type TDependencies } from '../../dependencies';
import { type TLoginResponse } from '../../dependencies/login';

export const login$ = (
  action$: *,
  state: *,
  { Helper, Login, now }: TDependencies,
) => {
  return action$
    .ofType(login.toString())
    .switchMap(({
      payload: { email, pass },
      meta: { failures },
    }) => merge(
      of(loginStart(now())),
      fromPromise(Login.login(email, pass))
        .do((response: TLoginResponse) =>
          response !== null &&
          response.success &&
          Helper.setAccessToken(response.data)
        )
        .switchMap((response: TLoginResponse) =>
          response === null ? _throw() :
          response.success ? of(loginGood({
            accessToken: response.data,
            timestamp: now(),
          })) :
          of(loginBad({
            msg: response.data,
            timestamp: now(),
          }))
        )
        .catch(() => failures >= FAILURES_MAX_RETRIES ?
          of(
            loginFailure(now()),
            loginTryAgainBuffer({ email, pass })
          ) :
          of(login({
            email,
            pass,
            failures: failures + 1
          })).pipe(delay(FAILURES_RETRY_DELAY))
        )
    ))
};

export const loginTryAgainBuffer$ = (
  action$: *,
  state: *,
) => {
  return action$
    .ofType(loginTryAgainBuffer.toString())
    .buffer(action$.ofType(loginTryAgain.toString()))
    .map(([{ payload: { email, pass } }]) =>
      login({
        email,
        pass,
      })
    )
  ;
};

export const epics = [
  login$,
  loginTryAgainBuffer$,
];
