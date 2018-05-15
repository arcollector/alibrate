// @flow

import {
  BackHandler,
  Platform,
} from 'react-native';
import {
  Navigation,
} from 'react-native-navigation';
import {
  Provider
} from 'react-redux';

import * as Style from '../stylesheet';

import Login from '../screens/login';

type TScreens = (
  'Alibrate.Login'
);

export type navigatorType = Navigation;

export default class Navigator {

  static navigator: navigatorType | null = null;

  static store: * = null;

  static count: number = 0;

  static onPop: (() => any) | null = null;

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: Style.backgroundColor,
    statusBarTextColorScheme: 'light',
    statusBarTextColorSchemeSingleScreen: 'light',
  };

  static set(navigator: navigatorType): void {
    Navigator.navigator = navigator;
    Navigator.navigator.setOnNavigatorEvent((e) => {
      if(e.id === 'drawer') { // eslint-disable-line
      } else if(e.id === 'backPress') {
        // if I am in the first screen dont do anything
        // backhandler listener will take care of this
        if(Platform.OS === 'android' && Navigator.isEmpty()) {
          return;
        }
        Navigator.pop();
      } else if(e.id === 'willDisappear') { // eslint-disable-line
      } else if(e.id === 'didDisappear') { // eslint-disable-line
      } else if(e.id === 'didAppear') { // eslint-disable-line
      }
    });
  }

  static register(screens: Array<[TScreens, Function]>): void {
    screens.forEach(([ screenId, funct ]) => {
      Navigation.registerComponent(
        screenId,
        funct,
        Navigator.store,
        Provider
      );
    });
  }

  static start(
    initialScreen: TScreens
  ): void
  {
    Navigation.startSingleScreenApp({
      screen: {
        screen: initialScreen,
        navigatorStyle: {
          ...Navigator.navigatorStyle,
        },
        navigatorButtons: {},
      },
      animationType: 'slide-down',
      appStyle: {
        orientation: 'portrait',
      },
    });
  }

  static init(store: *): void {
    Navigator.store = store;

    Navigator.register([
      [ 'Alibrate.Login', () => Login ],
    ]);

    Navigator.start(
      'Alibrate.Login'
    );
  }

  static toggleDrawer() : void {
    if(Navigator.navigator === null) {
      return;
    }
    Navigator.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  static isEmpty(): bool {
    return Navigator.count === 0;
  }

  static push(screen: TScreens, passProps?: Object): void {
    if(Navigator.navigator === null) {
      return;
    }
    Navigator.count++;
    Navigator.navigator.push({
      screen,
      animationType: 'slide-horizontal',
      navigatorStyle: { ...Navigator.navigatorStyle },
      overrideBackPress: true,
      passProps,
    });
  }

  static pop(): void {
    if(Navigator.navigator === null) {
      return;
    }
    Navigator.count--;
    Navigator.navigator.pop();
    Navigator.onPop && Navigator.onPop();
  }

  static popToRoot(): void {
    if(Navigator.navigator === null) {
      return;
    }
    Navigator.count = 0;
    Navigator.navigator.popToRoot();
    Navigator.onPop && Navigator.onPop();
  }

  static popAndPush(screen: TScreens, passProps?: Object): void {
    Navigator.pop();
    setTimeout(() => Navigator.push(screen, passProps), 10);
  }

  static popWithDelay(delay: number = 500): void {
    setTimeout(() => Navigator.pop(), delay);
  }

  static popToRootWithDelay(delay: number = 500): void {
    setTimeout(() => Navigator.popToRoot(), delay);
  }

}

// android only
BackHandler.addEventListener('hardwareBackPress', (): bool => {
  // exit app
  if(Navigator.isEmpty()) {
    return false;
  }
  return true;
});
