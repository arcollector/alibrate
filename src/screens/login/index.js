// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {
  login,
  loginTryAgain,
  type TDispatchers,
} from '../../store/actions/login';

import {
  type TStore,
} from '../../store/reducers/login';

import Logo from './logo';
import FormInput from '../../components/form.input';
import FacebookForm from './facebook.form';
import Form, { type TFormData } from './form';
import Signup from './signup';
import KeyboardAvoidingView from '../../components/keyboard.avoiding.view';
import ImageBackground from '../../components/image.background';
import Preloader from '../../components/preloader';

type StateProps = {
  loginStart: $PropertyType<TStore, 'loginStart'>,
  loginGood: $PropertyType<TStore, 'loginGood'>,
  loginBad: $PropertyType<TStore, 'loginBad'>,
  msg: $PropertyType<TStore, 'msg'>,
  loginFailure: $PropertyType<TStore, 'loginFailure'>,
};

type DispatchProps = {
  login: $PropertyType<TDispatchers, 'login'>,
  loginTryAgain: $PropertyType<TDispatchers, 'loginTryAgain'>,
};

type Props = StateProps & DispatchProps;

type State = {
  show: bool,
  error: bool,
};

const BACKGROUND_IMAGE = require('../../images/background.png');

export class Index extends PureComponent<Props, State> {

  state = {
    show: false,
    error: false,
  };

  showPreloader(): void {
    this.setState({
      show: true,
      error: false,
    });
  }

  hidePreloader(): void {
    this.setState({
      show: false,
      error: false,
    });
  }

  onSubmit(data: TFormData): void {
    this.showPreloader();
    const {
      email,
      pass,
    } = data;
    this.props.login({ email, pass });
  }

  componentWillReceiveProps(props: Props) {
    if(props.loginGood > this.props.loginGood) {
      this.hidePreloader();
    }
    if(props.loginBad > this.props.loginBad) {
      this.hidePreloader();
      Alert.alert('Falló ingreso', props.msg);
    }
    if(props.loginFailure > this.props.loginFailure) {
      this.setState({
        error: true,
      }); 
    }
  }

  onTryAgain(): void {
    this.showPreloader();
    this.props.loginTryAgain();
  }

  render() {
    const {
      show,
      error,
    } = this.state;
    return (
<KeyboardAvoidingView>
  <ImageBackground
    source={BACKGROUND_IMAGE}
    style={styles.container}
  >
    <Logo />

    <FacebookForm />

    <Form
      onPress={(data: TFormData) => this.onSubmit(data)}
    />

    <Signup />

    <Preloader
      show={show}
      error={error}
      onTryAgain={() => this.onTryAgain()}
    />
  </ImageBackground>
</KeyboardAvoidingView>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

import { connect } from 'react-redux';

export default connect(
  ({
    login: {
      loginStart,
      loginGood,
      loginBad,
      msg,
      loginFailure,
    },
  }: {
    login: TStore,
  }): StateProps => ({
    loginStart,
    loginGood,
    loginBad,
    msg,
    loginFailure,
  }),
  {
    login,
    loginTryAgain,
  }
)(Index);
