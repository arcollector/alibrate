// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';

type Props = {
  source: number | string,
  style?: any,
  children?: any,
};

type State = void;

export default class MyImageBackground extends PureComponent<Props, State> {

  render() {
    const {
      source,
      style,
      children,
    } = this.props;
    return (
<ScrollView
  contentContainerStyle={styles.contentContainer}
  bounces={false}
>
  <ImageBackground
    source={source}
    style={[
      styles.container,
      style,
    ]}
  >
    {children}
  </ImageBackground>
</ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});
