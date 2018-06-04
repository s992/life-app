import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { List } from '../components/list'
import { EventModel, TrackedEvent } from '../model/realm'
import { Screen } from '../routes'
import { AppState } from '../redux/store'
import { eventTracked } from '../redux/tracked-event'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export interface Props {
  events: EventModel[]
}

class ListScreen extends Component<NavigationScreenProps & Props & DispatchProp> {
  onItemSelected = (event: EventModel) => {
    this.props.dispatch(eventTracked(TrackedEvent.create(event)))
    this.props.navigation.navigate(Screen.Home)
  }

  render() {
    return (
      <View style={styles.container}>
        <List events={this.props.events} onClick={this.onItemSelected} />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({ events: state.event.events, nav: state.nav })
export default connect(mapStateToProps)(ListScreen)
