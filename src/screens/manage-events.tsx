import React from 'react'
import { Component } from 'react'
import { StyleSheet, Alert, ScrollView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { Event, EventModel } from '../model/realm'
import { RootState } from '../redux/store'
import { Screen } from '../routes'
import { SwipeDelete } from '../components/swipe-delete'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
  },
  bigPadding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

interface State {
  events: ReadonlyArray<EventModel>
}

class ManageEventsScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state = {
    events: Event.all(),
  }

  onEventPressed = (event: EventModel) => {
    this.props.navigation.navigate(Screen.EventDetail, {
      eventId: event.id,
    })
  }

  onDeleteRequested = (event: EventModel) => {
    Alert.alert(
      'Are you sure?',
      'Once you delete this event, all log entries associated with it will be deleted as well.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => this.onDeleteConfirmed(event) }],
    )
  }

  onDeleteConfirmed = (event: EventModel) => {
    Event.delete(event)
    this.setState((state) => ({ ...state, events: Event.all() }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.events.map((event) => (
          <SwipeDelete key={event.id} onClick={() => this.onDeleteRequested(event)}>
            <ListItem
              containerStyle={styles.bigPadding}
              title={event.name}
              onPress={() => this.onEventPressed(event)}
              onLongPress={() => this.onDeleteRequested(event)}
            />
          </SwipeDelete>
        ))}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ManageEventsScreen)
