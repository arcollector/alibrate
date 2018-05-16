// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

import * as Style from '../stylesheet';

type Props = {
  title: string,
};

type State = void;

export default class NavBar extends PureComponent<Props, State> {

  render() {
    const { title } = this.props;
    return (
<View style={styles.container}>
  <Text style={styles.text}>
    {title}
  </Text>
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.darkBlueColor,
    paddingHorizontal: 15,
    height: Platform.OS === 'ios' ? 60 : 50,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: Style.fontSizeHuge,
    color: Style.whiteColor,
    fontWeight: '600',
    textAlign: 'center',
  },
});
