// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Style from '../stylesheet';

import Button from './button';

type Props = {
  show: bool,
  error: bool,
  onTryAgain: () => any,
};

type State = {
  opacity: Animated.Value,
  show: bool,
  didHide: bool,
};

export default class Preloader extends PureComponent<Props, State> {

  state = {
    opacity: new Animated.Value(0),
    show: false,
    didHide: true,
  };

  componentDidMount() {
    if(this.props.show) {
      this.setState({
        show: true,
        didHide: false,
      });
    }
  }

  componentWillReceiveProps(props: Props) {
    if(!this.props.show && props.show) {
      this.setState({
        show: true,
        didHide: false,
      });
    }
    if(this.props.show && !props.show) {
      this.setState({ show: false });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if(!prevState.show && this.state.show) {
      this.show();
    }
    if(prevState.show && !this.state.show) {
      this.hide();
    }
  }

  show(): void {
    this.state.opacity.setValue(0);
    Animated
      .timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
        }
      )
      .start(() => this.onAnimationEndShow())
    ;
  }

  onAnimationEndShow(): void {
  }

  hide(): void {
    this.state.opacity.setValue(1);
    Animated
      .timing(
        this.state.opacity,
        {
          toValue: 0,
        }
      )
      .start(() => this.onAnimationHideEnd())
    ;
  }

  onAnimationHideEnd(): void {
    this.setState({ didHide: true });
  }

  render() {
    const {
      error,
      onTryAgain,
    } = this.props;
    const {
      show,
      opacity,
      didHide,
    } = this.state;
    if(didHide) {
      return null;
    }
    return (
<Animated.View
  style={[
    styles.container,
    { opacity },
  ]}
>
  {!error &&
  <ActivityIndicator
    size="large"
    color={Style.turquoiseColor}
  />
  }

  {error &&
  <View style={styles.errorContainer}>
    <Icon
      name="exclamation-triangle"
      size={25}
      color={Style.whiteColor}
    />
    <Text style={styles.text}>
      Ha ocurrido un error.
    </Text>
    <Button
      style={styles.buttonContainer}
      text="INTENTAR NUEVAMENTE"
      backgroundColor={Style.grayColor}
      textStyle={styles.buttonText}
      onPress={onTryAgain}
    />
  </View>
  }
</Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Style.blackColorTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Style.whiteColor,
    fontSize: Style.fontSize,
    marginVertical: 5,
  },
  buttonContainer: {
    paddingVertical: 5,
  },
  buttonText: {
    color: Style.whiteColor,
  },
});
