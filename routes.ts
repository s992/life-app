import {StyleSheet} from 'react-native';
import {StackNavigator, DrawerNavigator} from 'react-navigation';

import {Color} from './colors';
import Navigation from './navigation';
import MainScreen from './screens/main';
import ListScreen from './screens/list';

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: Color.Black,
  },
  drawerTxt: {
    color: Color.White,
  },
});

export const MainStack = StackNavigator(
  {
    Main: MainScreen,
    List: ListScreen,
  },
  {initialRouteName: 'Main', headerMode: 'none'},
);

export const RootDrawer = DrawerNavigator(
  {Home: MainStack},
  {
    style: styles.drawer,
    contentOptions: {labelStyle: styles.drawerTxt},
  },
);
