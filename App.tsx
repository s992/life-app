import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {StackNavigator} from 'react-navigation';

import {Color} from './colors';
import MainScreen from './screens/main';
import ListScreen from './screens/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
  button: {
    backgroundColor: Color.Red,
    height: '60%',
  },
});

const RootStack = StackNavigator(
  {
    Main: MainScreen,
    List: ListScreen,
  },
  {initialRouteName: 'Main', headerMode: 'none'},
);

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.White}}>
        <Header
          leftComponent={{icon: 'menu', color: Color.White}}
          centerComponent={{
            text: 'LIFE',
            style: {color: Color.White},
          }}
          rightComponent={{icon: 'home', color: Color.White}}
          backgroundColor={Color.Black}
        />
        <RootStack />
      </View>
    );
  }
}
