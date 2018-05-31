import { StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import { Color } from './colors'
import { ListScreen, LogScreen, MainScreen, SettingsScreen } from './screens'

export enum Screen {
  Main = 'Main',
  List = 'List',
  Home = 'Home',
  Log = 'Log',
  Settings = 'Settings',
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

export const RootDrawer = DrawerNavigator(
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
