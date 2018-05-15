// @flow

import Navigator from './navigator';

import createStore from './store';

const store = createStore();
Navigator.init(store);
