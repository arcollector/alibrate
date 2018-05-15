// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import * as Style from '../../stylesheet';

import Button from '../../components/button';

type Props = {};

type State = void;

export default class Signup extends PureComponent<Props, State> {

  render() {
    return (
<View style={styles.container}>
  <Text style={styles.text}>
    No tienes cuenta?
  </Text>
  <Button
    text="Registrate ahora"
    backgroundColor="transparent"
    style={styles.button}
    textStyle={styles.buttonText}
    onPress={() => null}
  />
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Style.fontSize,
    color: Style.whiteColor,
  },
  button: {
    paddingHorizontal: 5,
  },
  buttonText: {
    color: Style.turquoiseColor,
  },
});
