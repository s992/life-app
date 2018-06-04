import React from 'react'
import { Component } from 'react'
import { BackHandler, StatusBar, StyleSheet, ToastAndroid, View } from 'react-native'
import { Header } from 'react-native-elements'
import { initializeListeners } from 'react-navigation-redux-helpers'
import { Provider, connect, Dispatch } from 'react-redux'
import { NavigationActions, NavigationDispatch, NavigationState } from 'react-navigation'

import { Color } from './colors'
import { RootDrawer, Screen } from './routes'
import { HeaderIcon } from './components/header-icon'
import { RootState, store } from './redux/store'
import { navigationPropConstructor, ROOT, toggleDrawer } from './redux/nav'
import { hydrationRequested as eventHydrationRequested } from './redux/event'
import { hydrationRequested as trackedEventHydrationRequested } from './redux/tracked-event'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

interface Props {
  nav: NavigationState
  dispatch: Dispatch & NavigationDispatch
}

class App extends Component<Props> {
  exitTimerRunning = false
  exitTimer?: NodeJS.Timer

  componentDidMount() {
    this.props.dispatch(eventHydrationRequested())
    this.props.dispatch(trackedEventHydrationRequested())

    initializeListeners(ROOT, this.props.nav)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    this.exitTimerRunning = false

    if (this.exitTimer) {
      clearTimeout(this.exitTimer)
    }
  }

  isBackable() {
    const routeIndex = this.props.nav.routes[this.props.nav.index].index
    return !!routeIndex && routeIndex !== 0
  }

  isTopPage() {
    return this.props.nav.index === 0
  }

  maybeExit() {
    if (this.exitTimerRunning) {
      BackHandler.exitApp()
      return true
    }

    ToastAndroid.show('Press back again to exit.', ToastAndroid.SHORT)
    this.exitTimerRunning = true
    this.exitTimer = setTimeout(() => (this.exitTimerRunning = false), 2000)

    return true
  }

  onBackPress = () => {
    if (this.isBackable()) {
      this.props.dispatch(NavigationActions.back())
      return true
    }

    if (!this.isTopPage()) {
      this.props.dispatch(NavigationActions.navigate({ routeName: Screen.Home }))
      return true
    }

    return this.maybeExit()
  }

  render() {
    const navigation = navigationPropConstructor(this.props.dispatch, this.props.nav)
    const isBackable = this.isBackable()
    const leftIcon = isBackable ? 'arrow-back' : 'menu'
    const leftAction = isBackable ? NavigationActions.back() : toggleDrawer()

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.Black} />
        <Header
          leftComponent={<HeaderIcon name={leftIcon} onClick={() => this.props.dispatch(leftAction)} />}
          centerComponent={{
            text: 'LIFE',
            style: { color: Color.White },
          }}
          backgroundColor={Color.Black}
        />
        <RootDrawer navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
const AppWithNavigationState = connect(mapStateToProps)(App)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
