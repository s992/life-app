import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, ListRenderItemInfo, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'

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

  renderItem = ({ item }: ListRenderItemInfo<EventModel>) => (
    <ListItem
      title={item.name}
      onPress={() => this.onEventPressed(item)}
      onLongPress={() => this.onEventLongPressed(item)}
    />
  )

  onEventPressed = (event: EventModel) => {
    this.props.navigation.navigate(Screen.EventDetail, {
      eventId: event.id,
    })
  }

  onEventLongPressed = (event: EventModel) => {
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
      <View style={styles.container}>
        {this.state.events.map((event) => (
          <ListItem
            key={event.id}
            title={event.name}
            onPress={() => this.onEventPressed(event)}
            onLongPress={() => this.onEventLongPressed(event)}
          />
        ))}
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ManageEventsScreen)
