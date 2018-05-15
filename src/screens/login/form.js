// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import * as Style from '../../stylesheet';

import FormInput from '../../components/form.input';
import Button from '../../components/button';

export type TFormData = {
  email: string,
  pass: string,
};

type Props = {
  onPress: (data: TFormData) => any,
};

type State = void;

export default class Form extends PureComponent<Props, State> {

  email: FormInput | null = null;
  pass: FormInput | null = null;

  fields: {
    email: string,
    pass: string,
  } = {
    email: '',
    pass: '',
  };

  onChangeEmail(value: string): void {
    this.fields.email = value;
  }

  onSubmitEmail(): void {
    this.pass !== null && this.pass.focus();
  }

  onChangePass(value: string): void {
    this.fields.pass = value;
  }

  onSubmitPass(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    this.props.onPress({
      ...this.fields,
    });
  }

  render() {
    return (
<View style={styles.container}>

  <View style={styles.hrContainer}>
    <View style={styles.hr} />
    <Text style={styles.hrText}>
      O CON TU E-MAIL
    </Text>
    <View style={styles.hr} />
  </View>

  <Text style={styles.text}>
    E-mail (o usuario si ya eres miembro)
  </Text>
  <FormInput
    ref={(elem) => this.email = elem}
    placeholder="Ej:flor@mail.com"
    returnKeyType="next"
    onChange={(value: string) => this.onChangeEmail(value)}
    onSubmit={() => this.onSubmitEmail()}
  />

  <Text style={styles.text}>
    Contrasena
  </Text>
  <FormInput
    ref={(elem) => this.pass = elem}
    placeholder="Ingresa tu contrasena"
    returnKeyType="done"
    secureTextEntry
    onChange={(value: string) => this.onChangePass(value)}
    onSubmit={() => this.onSubmitPass()}
  />

  <Button
    text="Olvidate tu contrasena?"
    backgroundColor="transparent"
    onPress={() => null}
  />

  <Button
    text="INGRESAR"
    backgroundColor={Style.turquoiseColor}
    onPress={() => this.onSubmit()}
  />
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hr: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: Style.whiteColor,
  },
  hrText: {
    fontSize: Style.fontSizeBig,
    color: Style.whiteColor,
    marginHorizontal: 20,
  },
  text: {
    fontSize: Style.fontSize,
    color: Style.whiteColor,
    marginVertical: 15,
  },
});
