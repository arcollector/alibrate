// @flow

import {
  createActions,
} from 'redux-actions';

import { type TReviewers } from '../../dependencies/reviewers';

export type TDispatchers = {
  getTop: ({ page: number, limit: number }) => any,
};

export type TPayloads = {
  getTopSuccess: { list: TReviewers, timestamp: number },
};

export const {
  reviewers: {
    getTop,
    getTopStart,
    getTopSuccess,
    getTopFailure,
    getTopTryAgainBuffer,
    getTopTryAgain,
  },
} = createActions({
  REVIEWERS: {
    GET_TOP: [
      ({ page, limit }) => ({
        page,
        limit,
      }),
      ({ failures }) => ({
        failures: typeof failures === 'undefined' ? 0 : failures
      })
    ],
    GET_TOP_START: undefined,
    GET_TOP_SUCCESS: undefined,
    GET_TOP_FAILURE: undefined,
    GET_TOP_TRY_AGAIN_BUFFER: undefined,
    GET_TOP_TRY_AGAIN: undefined,
  },
});
