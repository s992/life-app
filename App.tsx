import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Color} from './colors';
import {RootDrawer} from './routes';
import Navigation from './navigation';

import HeaderIcon from './components/header-icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <HeaderIcon name="menu" onClick={() => Navigation.toggleDrawer()} />
          }
          centerComponent={{
            text: 'LIFE',
            style: {color: Color.White},
          }}
          rightComponent={<HeaderIcon name="help-outline" onClick={() => {}} />}
          backgroundColor={Color.Black}
        />
        <RootDrawer ref={(ref: any) => Navigation.setNav(ref)} />
      </View>
    );
  }
}
