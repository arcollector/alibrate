// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Style from '../stylesheet';

type Props = {
  text: string,
  backgroundColor?: string,
  icon?: string,
  style?: any,
  textStyle?: any,
  onPress: () => any,
};

type State = void;

export default class Button extends PureComponent<Props, State> {

  render() {
    const {
      text,
      icon,
      backgroundColor,
      style,
      textStyle,
      onPress,
    } = this.props;
    return (
<TouchableOpacity
  style={[
    styles.container,
    typeof backgroundColor !== 'undefined' ? { backgroundColor } : null,
    style,
  ]}
  onPress={() => onPress()}
>
  {typeof icon !== 'undefined' &&
  <Icon
    name={icon}
    color={Style.whiteColor}
    size={Style.fontSize}
    style={styles.icon}
  />
  }
  <Text
    style={[
      styles.text,
      textStyle,
    ]}
  >
    {text}
  </Text>
</TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f00',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: Style.whiteColor,
    fontSize: Style.fontSize,
    fontWeight: 'bold',
  },
});
