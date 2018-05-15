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

export default class FacebookForm extends PureComponent<Props, State> {

  render() {
    return (
<View style={styles.container}>
  <Text style={styles.text}>
    INGRESAR
  </Text>

  <Button
    icon="facebook"
    text="INGRESAR CON FACEBOOK"
    backgroundColor={Style.blueColor}
    style={styles.button}
    onPress={() => null}
  />
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: Style.fontSizeBig,
    color: Style.whiteColor,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  button: {
    width: '100%',
  },
});
