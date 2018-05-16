// @flow

import {
  handleActions,
} from 'redux-actions';

import {
  getTopSuccess,
  type TPayloads,
} from '../actions/reviewers';

import { type TReviewer } from '../../dependencies/reviewers';

export type TStore = {
  byId: { [string]: TReviewer },
  allIds: Array<string>,
  timestamp: number,
};

export const initialState: TStore = {
  byId: {},
  allIds: [],
  timestamp: 0,
};

export const reducer = handleActions(
  {
    [getTopSuccess]: (
      state: TStore,
      { payload: { list, timestamp } }: { payload: $PropertyType<TPayloads, 'getTopSuccess'> }
    ): TStore => {
      const { byId, allIds } = state;
      return {
        ...state,
        byId: {
          ...byId,
          ...list.reduce((
            acc: $PropertyType<TStore, 'byId'>,
            val: TReviewer
          ) => ({
            ...acc,
            [val._id]: { ...val },
          }), {})
        },
        allIds: [
          ...allIds,
          ...list.map(({ _id }) => _id)
        ],
        timestamp,
      };
    },
  },
  initialState
);
