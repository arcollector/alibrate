// @flow

import {
  handleActions,
} from 'redux-actions';

import {
  setPage,
  type TPayloads,
} from '../actions/page';

export type TStore = {
  page: string,
};

export const initialState: TStore = {
  page: '',
};

export const reducer = handleActions(
  {
    [setPage]: (
      state: TStore,
      { payload }: { payload: $PropertyType<TPayloads, 'setPage'> }
    ): TStore => {
      return {
        ...state,
        page: payload,
      };
    },
  },
  initialState
);
