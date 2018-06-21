import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import Snackbar from 'react-native-snackbar'

import { Color } from '../colors'
import { List } from '../components/list'
import { Event, EventModel, TrackedEvent } from '../model/realm'
import { Screen } from '../routes'
import { RootState } from '../redux/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export interface State {
  events: ReadonlyArray<EventModel>
}

class ListScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state = {
    events: Event.all().sorted('createdOn'),
  }

  onItemSelected = async (event: EventModel) => {
    await TrackedEvent.create(event)

    Snackbar.show({
      title: 'Event logged successfully.',
      backgroundColor: Color.Black,
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: '✕',
        color: Color.White,
      },
    })

    this.props.navigation.navigate(Screen.Home)
  }

  render() {
    return (
      <View style={styles.container}>
        <List events={this.state.events} onClick={this.onItemSelected} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ListScreen)
