import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import { initializeListeners } from 'react-navigation-redux-helpers'
import { Provider, connect, Dispatch } from 'react-redux'
import { DrawerActions, NavigationActions, NavigationDispatch, NavigationState } from 'react-navigation'

import { Color } from './colors'
import { RootDrawer } from './routes'

import HeaderIcon from './components/header-icon'
import { AppState, navigationPropConstructor, ROOT, store } from './store'

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
  componentDidMount() {
    initializeListeners(ROOT, this.props.nav)
  }

  render() {
    const navigation = navigationPropConstructor(this.props.dispatch, this.props.nav)
    const routeIndex = this.props.nav.routes[this.props.nav.index].index
    const isBackable = !!routeIndex && routeIndex !== 0
    const leftIcon = isBackable ? 'arrow-back' : 'menu'
    const leftAction = isBackable ? NavigationActions.back() : DrawerActions.toggleDrawer()

    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <HeaderIcon
              name={leftIcon}
              onClick={() => this.props.dispatch(leftAction)}
            />
          }
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

const mapStateToProps = (state: AppState) => ({ nav: state.nav })
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
