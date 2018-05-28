import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Color} from './colors';
import Navigation from './navigation';
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
  drawer: {
    backgroundColor: Color.Black,
  },
  drawerTxt: {
    color: Color.White,
  },
});

const RootStack = StackNavigator(
  {
    Main: MainScreen,
    List: ListScreen,
  },
  {initialRouteName: 'Main', headerMode: 'none'},
);

const RootDrawer = DrawerNavigator(
  {Home: RootStack},
  {
    style: styles.drawer,
    contentOptions: {labelStyle: styles.drawerTxt},
  },
);

export default class App extends Component {
  renderMenu() {
    return (
      <Icon
        name="menu"
        color={Color.White}
        underlayColor={Color.Black}
        onPress={() => Navigation.toggleDrawer()}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.White}}>
        <Header
          leftComponent={this.renderMenu()}
          centerComponent={{
            text: 'LIFE',
            style: {color: Color.White},
          }}
          rightComponent={{icon: 'help-outline', color: Color.White}}
          backgroundColor={Color.Black}
        />
        <RootDrawer ref={(nref: any) => Navigation.setNav(nref)} />
      </View>
    );
  }
}
