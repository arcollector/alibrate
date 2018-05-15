// @flow

import Helper from './helper';
import Login, { type ILogin } from './login';

const helper = new Helper();

export default {
  Login: new Login(helper),
  now: Date.now,
};

export type TDependencies = {
  Login: ILogin,
  now: () => number,
};
