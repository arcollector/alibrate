// @flow

import {
  createActions,
} from 'redux-actions';

export type TDispatchers = {
  setPage: (page: string) => any,
};

export type TPayloads = {
  setPage: string,
};

export const {
  page: {
    setPage,
  },
} = createActions({
  PAGE: {
    SET_PAGE: undefined,
  },
});
