// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as Style from '../../stylesheet';

import { type TReviewer } from '../../dependencies/reviewers';

import ImageFadeIn from '../../components/image.fade.in';

type Props = { index: number } & TReviewer;

type State = void;

export default class Row extends PureComponent<Props, State> {

  render() {
    const {
      index,
      profile: {
        picture,
      },
      username,
      countReviews,
    } = this.props;
    return (
<View style={styles.container}>
  <Text style={styles.indexText}>
    {index + 1}
  </Text>
  <View style={styles.imageContainer}>
    <ImageFadeIn
      source={picture}
      style={styles.image}
    />
  </View>
  <View style={styles.dataContainer}>
    <Text style={styles.usernameText}>
      {username}
    </Text>
    <Text style={styles.reviewsCountText}>
      {countReviews} reseñas
    </Text>
  </View>
  <TouchableOpacity
    style={styles.buttonContainer}
  >
    <Text style={styles.buttonText}>
      Seguir
    </Text>
  </TouchableOpacity>
</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexText: {
    fontSize: Style.fontSizeBig,
    color: Style.darkBlueColor,
    fontWeight: '600',
  },
  imageContainer: {
    borderRadius: 100,
    marginLeft: 5,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 60,
  },
  dataContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  usernameText: {
    fontSize: Style.fontSizeBig,
    color: Style.darkBlueColor,
    fontWeight: '600',
  },
  reviewsCountText: {
    fontSize: Style.fontSize,
    color: Style.turquoiseColor,
    fontWeight: '600',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: Style.darkBlueColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: Style.darkBlueColor,
    fontSize: Style.fontSize,
  },
});
