import { StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import { Color } from './colors'
import { AddEventScreen, ListScreen, LogScreen, MainScreen, ManageEventsScreen, SettingsScreen } from './screens'

export enum Screen {
  List = 'List',
  Home = 'Home',
  Log = 'Log',
  Settings = 'Settings',
  AddEvent = 'AddEvent',
  ManageEvents = 'ManageEvents',
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
    [Screen.AddEvent]: AddEventScreen,
    [Screen.ManageEvents]: ManageEventsScreen,
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
