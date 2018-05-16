// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { bindComponentToNavigator } from '../../navigator/helpers';

import * as Style from '../../stylesheet';

import TabBarButton from './tab.bar.button';

import Ranking from '../../screens/ranking';

import {
  setPage,
  type TDispatchers,
} from '../../store/actions/page';

import {
  type TStore,
} from '../../store/reducers/page';

type StateProps = {
  page: $PropertyType<TStore, 'page'>,
};

type DispatchProps = {
  setPage: $PropertyType<TDispatchers, 'setPage'>,
};

type Props = StateProps & DispatchProps;

type State = void;

export class Index extends PureComponent<Props, State> {

  setPage(page: string): void {
    if(page !== this.props.page) {
      this.props.setPage(page);
    }
  }

  render() {
    const { page } = this.props;
    return (
<View style={styles.container}>
  <View style={styles.componentContainer}>
    {(page === '' || page === 'ranking') &&
    <Ranking />
    }
  </View>

  <View style={styles.tabsBarContainer}>
    <TabBarButton
      icon="user"
      onPress={() => this.setPage('ranking')}
    />
    <TabBarButton
      icon="clock-o"
      onPress={() => null}
    />
    <TabBarButton
      icon="list"
      onPress={() => null}
    />
    <TabBarButton
      icon="facebook"
      onPress={() => null}
    />
    <TabBarButton
      icon="google"
      onPress={() => null}
    />
  </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  componentContainer: {
    flex: 1,
  },
  tabsBarContainer: {
    height: 50,
    backgroundColor: Style.darkBlueColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import { connect } from 'react-redux';

export const connectedComponent = connect(
  ({
    page: {
      page,
    },
  }: {
    page: TStore,
  }): StateProps => ({
    page,
  }),
  {
    setPage,
  }
)(Index);

export default bindComponentToNavigator(connectedComponent);
