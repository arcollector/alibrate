// @flow

import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
} from 'react-native';

type Props = {
  source: number | string,
  style: any,
};

type State = {
  opacity: Animated.Value,
};

export default class ImageFaceIn extends PureComponent<Props, State> {

  state = {
    opacity: new Animated.Value(0),
  };

  onLoadEnd() {
    this.state.opacity.setValue(0);
    Animated
      .timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
        },
      )
      .start()
    ;
  }

  render() {
    const {
      source,
      style,
    } = this.props;
    const {
      opacity,
    } = this.state;
    return (
<Animated.Image
  onLoadEnd={() => this.onLoadEnd()}
  source={typeof source === 'string' ? { uri: source } : source}
  style={[
    style,
    { opacity },
  ]}
/>
    );
  }

}
