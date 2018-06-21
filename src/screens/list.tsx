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
import { TrackWithDetail } from '../components/track-with-detail'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export interface State {
  events: ReadonlyArray<EventModel>
  selectedEvent?: EventModel
}

class ListScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state = {
    events: Event.all().sorted('createdOn'),
    selectedEvent: undefined,
  }

  onItemSelected = async (event: EventModel) => this.setState((state) => ({ ...state, selectedEvent: event }))

  onItemSavedWithNote = async (note?: string) => {
    const event = this.state.selectedEvent

    if (!event) {
      this.props.navigation.navigate(Screen.Home)
      return
    }

    await this.finishSaving(event, note)
  }

  onItemSaved = async (event: EventModel) => {
    await this.finishSaving(event)
  }

  private async finishSaving(event: EventModel, note?: string) {
    await TrackedEvent.create(event, note)

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
        {this.state.selectedEvent ? (
          <TrackWithDetail onSave={this.onItemSavedWithNote} />
        ) : (
          <List events={this.state.events} onClick={this.onItemSaved} onLongPress={this.onItemSelected} />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ListScreen)
