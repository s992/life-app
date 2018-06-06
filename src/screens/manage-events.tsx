import React from 'react'
import { Component } from 'react'
import { StyleSheet, Alert, ScrollView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Icon, ListItem } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'
import Swipeout from 'react-native-swipeout'

import { Color } from '../colors'
import { Event, EventModel } from '../model/realm'
import { RootState } from '../redux/store'
import { Screen } from '../routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
  },
})

interface State {
  events: ReadonlyArray<EventModel>
}

class ManageEventsScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state = {
    events: Event.all(),
  }

  getDeleteButton = (event: EventModel) => ({
    component: (
      <Icon
        name="delete"
        color={Color.White}
        containerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      />
    ),
    backgroundColor: Color.Red,
    onPress: () => this.onDeleteRequested(event),
  })

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
          <Swipeout key={event.id} backgroundColor={Color.White} right={[this.getDeleteButton(event)]}>
            <ListItem
              title={event.name}
              onPress={() => this.onEventPressed(event)}
              onLongPress={() => this.onDeleteRequested(event)}
            />
          </Swipeout>
        ))}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ManageEventsScreen)
