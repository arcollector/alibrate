// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import * as Style from '../../stylesheet';

import NavBar from '../../components/nav.bar';

import {
  getTop,
  type TDispatchers,
} from '../../store/actions/reviewers';

import {
  type TStore,
} from '../../store/reducers/reviewers';

import { type TReviewer, type TReviewers } from '../../dependencies/reviewers';

import Row from './row';

type StateProps = {
  list: TReviewers,
  listLength: number,
};

type DispatchProps = {
  getTop: $PropertyType<TDispatchers, 'getTop'>,
};

type Props = StateProps & DispatchProps;

type State = {
  page: number,
  limit: number,
  didEndReached: bool,
  endReachedThreshold: number,
};

export class Index extends PureComponent<Props, State> {

  state = {
    page: 1,
    limit: 5,
    didEndReached: false,
    // BUG: I dont know why need to 0.1 in order to work
    endReachedThreshold: 0.1,
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    // request record if didEndReached did change
    if(this.state.didEndReached && !prevState.didEndReached) {
      this.getTop();
    }
  }

  componentWillReceiveProps(props: Props) {
    // new records has arrived
    if(props.listLength > this.props.listLength) {
      this.setState({
        // list has more items now
        didEndReached: false,
        // set page number to next value
        page: this.state.page + 1,
        // BUG: endReachedThreshold only triggers once
        // so chaing this values for a small amount, endReachedThreshold
        // will always be fired when list did end reached
        endReachedThreshold: Math.random() * 1e-5,
      });
    }
    // all records has been retrived
    if(props.listLength === this.props.listLength &&
      this.state.didEndReached
    ) {
      this.setState({ didEndReached: false });
    }
  }

  componentDidMount() {
    this.getTop();
  }

  getTop() {
    const {
      page,
      limit,
    } = this.state;
    this.props.getTop({ page, limit });
  }

  // triggered when FlatList reached its end
  onEndReached(): void {
    this.setState({ didEndReached: true });
  }

  render() {
    const { list } = this.props;
    const { endReachedThreshold } = this.state;
    return (
<View style={styles.container}>
  <NavBar
    title="Ranking"
  />

  <FlatList
    data={list}
    keyExtractor={({ _id }: TReviewer) => _id}
    renderItem={({ item, index }: { item: TReviewer, index: number }) =>
      <Row
        index={index}
        {...item}
      />
    }
    ListFooterComponent={() =>
      this.state.didEndReached ?
      <ActivityIndicator
        size="small"
        color={Style.turquoiseColor}
      />
      :
      null
    }
    onScroll={({ nativeEvent: {
      contentOffset,
      contentSize,
      layoutMeasurement
    } }: TOnScrollEvent) =>
      null
      //console.log(contentOffset.y, contentSize.height, layoutMeasurement.height)
    }
    onEndReached={() => this.onEndReached()}
    onEndReachedThreshold={endReachedThreshold}
  />
</View>
    );
  }
}

type TOnScrollEvent = {
  nativeEvent: {
    contentOffset: { y: number, x: number },
    contentSize: { height: number, width: number },
    layoutMeasurement: { height: number, width: number },
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.whiteColor,
  },
});

import { connect } from 'react-redux';

export default connect(
  ({
    reviewers: {
      byId,
      allIds,
      timestamp,
    },
  }: {
    reviewers: TStore,
  }): StateProps => ({
    // $FlowFixMe
    list: Object.values(byId),
    listLength: allIds.length,
    timestamp,
  }),
  {
    getTop,
  }
)(Index);
