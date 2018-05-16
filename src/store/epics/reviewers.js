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
  getTop,
  getTopStart,
  getTopSuccess,
  getTopFailure,
  getTopTryAgain,
  getTopTryAgainBuffer,
} from '../actions/reviewers';

import { type TDependencies } from '../../dependencies';
import { type TGetTopResponse } from '../../dependencies/reviewers';

// DEBUG crap
const AUTH_TOKEN = (
'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJfaWQiOiI1YWZiMmQzMzI0MjdjNzQ0N2UzN2E4YjQiLCJlbWFpbCI6Im1hcnRpbi5qb3NlLnJ1aXouZGFnb3N0aW5vQGdtYWlsLmNvbSIsInByb2ZpbGUiOnsiaXNEZWZhdWx0Ijp0cnVlLCJwaWN0dXJlIjoiL2ltYWdlcy9NYW5fU2lsaG91ZXR0ZS5wbmciLCJkaXNwbGF5TmFtZSI6Im1hcnRpbnJ1aXoiLCJoaWRlQWdlIjp0cnVlLCJmaXJzdFRpbWUiOmZhbHNlfSwiYWN0aXZlIjpmYWxzZSwiZmlyc3RUaW1lIjpmYWxzZSwiY3JlYXRlZF9vbiI6IjIwMTgtMDUtMTVUMTg6NTU6NDcuMDgxWiIsInVzZXJuYW1lIjoibWFydGlucnVpeiIsImZhdm9yaXRlX2NhdGVnb3JpZXMiOltdfSwidXNlciI6IjVhZmIyZDMzMjQyN2M3NDQ3ZTM3YThiNCIsInVzZXJJZCI6IjFmMjcxMmRhYzY2NDA4NWZkNzQ3N2VmYTBkNmYyODQ2Iiwic2NvcGUiOiJhbGlicmF0ZSIsInJvbGVzIjpbInVzZXIiXSwicGVybWlzc2lvbnMiOlsiYWxsIC92MS8qIl0sInByb3ZpZGVyIjoibG9jYWwiLCJzaWQiOiJlYWFmNmUyYi1hY2U2LTQ0YzgtOWI3OS1jNjUwZGNkZTIwYjUiLCJpYXQiOjE1MjY0MzQ4NzMsImV4cCI6MTUyNzY0NDQ3MywiYXVkIjoiYWxpYnJhdGUifQ.EixHVGaavKWR6N9fOWSu1ou_gXuig4uUE4h2WneT0Fr7ri9N6d8fFvjORissV4kClhqWVbdWQxAe1Sy9jcirWk7-WXeaMgtqOOHcZLNlUtWW-De8tHEaG9M5M8b3kQI34pVSwQ5IlO6pKAGjAMt9u9lRLtKcPwgtndtf3vt4MzwAhlNN80HEvG_t2Yhxq8SXgrzhAz1Un4tJWrJFJPPWp9hWdkI72cHbjVR0E0SRlMu8CDvjkSsYO2KlXIpNVw9g90xVChxLjLQdljSdhqxaESL-MwcaZk35bu8oOc9V4mT1Vvrrp0tsrLBSMIlfOIpYc7GGS1uR_PZ7WuuEc_FAZQ'
);

export const getTop$ = (
  action$: *,
  state: *,
  { Helper, Reviewers, now }: TDependencies,
) => {
  return action$
    .ofType(getTop.toString())
    // DEBUG crap
    //.do(() => Helper.setAccessToken(AUTH_TOKEN))
    .switchMap(({
      payload: { page, limit },
      meta: { failures },
    }) => merge(
      of(getTopStart(now())),
      fromPromise(Reviewers.getTop(page, limit))
        .switchMap((response: TGetTopResponse) =>
          response === null ? _throw() :
          of(getTopSuccess({
            list: response.data,
            timestamp: now(),
          }))
        )
        .catch(() => failures >= FAILURES_MAX_RETRIES ?
          of(
            getTopFailure(now()),
            getTopTryAgainBuffer({ page, limit })
          ) :
          of(getTop({
            page,
            limit,
            failures: failures + 1
          })).pipe(delay(FAILURES_RETRY_DELAY))
        )
    ))
};

export const getTopTryAgainBuffer$ = (
  action$: *,
  state: *,
) => {
  return action$
    .ofType(getTopTryAgainBuffer.toString())
    .buffer(action$.ofType(getTopTryAgain.toString()))
    .map(([{ payload: { page, limit } }]) =>
      getTop({
        page,
        limit,
      })
    )
  ;
};

export const epics = [
  getTop$,
  getTopTryAgainBuffer$,
];
