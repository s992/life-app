import { StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator, NavigationState } from 'react-navigation'

import { Color } from './colors'
import {
  AddEventScreen,
  EventDetailScreen,
  ExportScreen,
  ListScreen,
  LogScreen,
  MainScreen,
  ManageEventsScreen,
  SettingsScreen,
} from './screens'

export enum Screen {
  List = 'List',
  Home = 'Home',
  Log = 'Event Log',
  Settings = 'Settings',
  AddEvent = 'AddEvent',
  ManageEvents = 'ManageEvents',
  Export = 'Export Events',
  EventDetail = 'EventDetail',
}

// not sure why the interface here sucks
type Route = NavigationState & { routeName: string; params: { [key: string]: string } }

export function getActiveRoute(navState: NavigationState): Route {
  if (navState.hasOwnProperty('index')) {
    return getActiveRoute(navState.routes[navState.index])
  }

  return navState as Route
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

export const EventStack = StackNavigator(
  {
    [Screen.ManageEvents]: ManageEventsScreen,
    [Screen.EventDetail]: EventDetailScreen,
  },
  {
    initialRouteName: Screen.ManageEvents,
    headerMode: 'none',
  },
)

export const SettingsStack = StackNavigator(
  {
    [Screen.Settings]: SettingsScreen,
    [Screen.AddEvent]: AddEventScreen,
    [Screen.ManageEvents]: EventStack,
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
    [Screen.Export]: ExportScreen,
    [Screen.Settings]: SettingsStack,
  },
  {
    initialRouteName: Screen.Home,
    style: styles.drawer,
    contentOptions: { labelStyle: styles.drawerTxt },
  },
)
