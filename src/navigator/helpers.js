// @noflow

import React, { PureComponent } from 'react';

import Navigator, { type navigatorType } from './index';

export const bindComponentToNavigator = (Component) => {
  return class HOC extends PureComponent<{ navigator: navigatorType}> {
    componentDidMount() {
      Navigator.set(this.props.navigator);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};
