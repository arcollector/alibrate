// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Style from '../stylesheet';

type Props = {
  placeholder: string,
  keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad',
  returnKeyType: 'next' | 'done',
  secureTextEntry: bool,
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
  autoCorrect: bool,
  onChange: (text: string) => any,
  onSubmit: () => any,
};

type State = {
  value: string,
  isSecureTextEntry: bool,
};

export default class FormInput extends PureComponent<Props, State> {

  static defaultProps = {
    keyboardType: 'default',
    secureTextEntry: false,
    autoCapitalize: 'none',
    autoCorrect: false,
  };

  textInput: TextInput | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
      isSecureTextEntry: props.secureTextEntry,
    };
  }

  onChangeText(value: string): void {
    this.setState({ value });
    this.props.onChange(value);
  }

  onSubmitEditing(): void {
    this.props.onSubmit();
  }

  focus(): void {
    this.textInput !== null && this.textInput.focus();
  }

  onShowPass(): void {
    this.setState({ isSecureTextEntry: false });
  }

  onHidePass(): void {
    this.setState({ isSecureTextEntry: true });
  }

  render() {
    const {
      keyboardType,
      placeholder,
      returnKeyType,
      secureTextEntry,
      autoCapitalize,
      autoCorrect,
    } = this.props;
    const {
      value,
      isSecureTextEntry,
    } = this.state;
    return (
<View>
  <TextInput
    ref={(elem) => this.textInput = elem}
    keyboardType={keyboardType}
    placeholder={placeholder}
    placeholderTextColor={Style.grayColor}
    underlineColorAndroid="transparent"
    style={styles.container}
    onChangeText={(text: string) => this.onChangeText(text)}
    returnKeyType={returnKeyType}
    secureTextEntry={isSecureTextEntry}
    onSubmitEditing={() => this.onSubmitEditing()}
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    value={value}
  />

  {secureTextEntry &&
  <TouchableOpacity
    style={styles.eyeContainer}
    onPressIn={() => this.onShowPass()}
    onPressOut={() => this.onHidePass()}
  >
    <Icon
      name="eye"
      size={20}
      color={Style.grayColor}
    />
  </TouchableOpacity>
  }
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.whiteColor,
    borderRadius: 5,
    paddingLeft: 15,
    height: 50,
    fontSize: Style.fontSizeBig,
  },
  eyeContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
