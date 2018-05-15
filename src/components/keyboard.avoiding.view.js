// @flow

import React, { PureComponent } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

type Props = {
  children?: any,
};

type State = void;

export default class MyKeyboardAvoidingView extends PureComponent<Props, State> {

  render() {
    const { children } = this.props;
    return Platform.OS === 'ios' ? (
<KeyboardAvoidingView
  keyboardVerticalOffset={0}
  enabled={Platform.OS === 'ios'}
  behavior="padding"
>
  {children}
</KeyboardAvoidingView>
    ) : (
    children
    );
  }

}
