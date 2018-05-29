import { StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

<<<<<<< HEAD
import { Color } from './colors'
import { ListScreen, LogScreen, MainScreen, SettingsScreen } from './screens'

export enum Screen {
  Main = 'Main',
  List = 'List',
  Home = 'Home',
  Log = 'Log',
  Settings = 'Settings',
}
=======
import {Color} from './colors';
import Navigation from './navigation';
import MainScreen from './screens/main';
import ListScreen from './screens/list';
import SettingsScreen from './screens/settings';
import AddItemScreen from './screens/add-item';
import LogScreen from './screens/log';
>>>>>>> wip adding items

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: Color.Black,
  },
  drawerTxt: {
    color: Color.White,
  },
})

export const MainStack = StackNavigator(
  {
    [Screen.Home]: MainScreen,
    [Screen.List]: ListScreen,
  },
  {
    initialRouteName: Screen.Home,
    headerMode: 'none',
  },
<<<<<<< HEAD
)

export const RootDrawer = DrawerNavigator(
=======
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);

export const SettingsStack = StackNavigator(
  {
    Settings: SettingsScreen,
    AddItem: AddItemScreen,
  },
  {
    headerMode: 'none',
  },
);

export const RootDrawer = DrawerNavigator(
  {
    Home: MainStack,
    Log: LogScreen,
    Settings: SettingsStack,
  },
>>>>>>> wip adding items
  {
    [Screen.Home]: MainStack,
    [Screen.Log]: LogScreen,
    [Screen.Settings]: SettingsScreen,
  },
  {
    initialRouteName: Screen.Home,
    style: styles.drawer,
    contentOptions: { labelStyle: styles.drawerTxt },
  },
)
