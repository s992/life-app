import { StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import { Color } from './colors'
import {
  AddItemScreen,
  ListScreen,
  LogScreen,
  MainScreen,
  SettingsScreen,
} from './screens'

export enum Screen {
  List = 'List',
  Home = 'Home',
  Log = 'Log',
  Settings = 'Settings',
  AddItem = 'AddItem',
}

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
)

export const SettingsStack = StackNavigator(
  {
    [Screen.Settings]: SettingsScreen,
    [Screen.AddItem]: AddItemScreen,
  },
  {
    initialRouteName: Screen.Settings,
    headerMode: 'none',
  },
)

export const RootDrawer = DrawerNavigator(
  {
    [Screen.Home]: MainStack,
    [Screen.Log]: LogScreen,
    [Screen.Settings]: SettingsStack,
  },
  {
    initialRouteName: Screen.Home,
    style: styles.drawer,
    contentOptions: { labelStyle: styles.drawerTxt },
  },
)
