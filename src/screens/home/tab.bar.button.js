// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import * as Style from '../../stylesheet';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  icon: string,
  onPress: () => any,
};

type State = void;

export default class TabBarButton extends PureComponent<Props, State> {

  render() {
    const {
      icon,
      onPress,
    } = this.props;
    return (
<TouchableOpacity
  style={styles.container}
  onPress={() => onPress()}
>
  <Icon
    name={icon}
    size={20}
    color={Style.whiteColor}
  />
</TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
