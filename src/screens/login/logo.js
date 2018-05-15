// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import * as Style from '../../stylesheet';

import LogoSVG from '../../images/logo';

type Props = {};

type State = void;

const WIDTH = 270;
const HEIGHT = 80;

export default class Logo extends PureComponent<Props, State> {

  render() {
    return (
<View style={styles.container}>
  <LogoSVG
    width={WIDTH}
    height={HEIGHT}
    fill={Style.whiteColor}
  />
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
