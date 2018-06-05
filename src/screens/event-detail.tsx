import React from 'react'
import { Component } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Card, ListItem } from 'react-native-elements'
import { format } from 'date-fns'

import { Color } from '../colors'
import { Event, EventModel, TrackedEvent, TrackedEventModel } from '../model/realm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  listRightTitle: {
    color: Color.Black,
  },
  deleteContainer: {
    backgroundColor: Color.Red,
    marginTop: 20,
  },
  deleteTitle: {
    color: Color.White,
  },
})

interface State {
  event: EventModel
  trackedEvents: ReadonlyArray<TrackedEventModel>
}

export default class EventDetailScreen extends Component<NavigationScreenProps, State> {
  state = {
    event: Event.getById(this.props.navigation.getParam('eventId')),
    trackedEvents: TrackedEvent.getByEventId(this.props.navigation.getParam('eventId')).sorted('timestamp', true),
  }

  formatTimestamp = (timestamp: Date) => format(timestamp, 'MM/DD/YY hh:mm:ss')

  onDeleteClicked = () => {
    Alert.alert(
      'Are you sure?',
      'Once you delete this event, all log entries associated with it will be deleted as well.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => this.onDeleteConfirmed() }],
    )
  }

  onDeleteConfirmed = () => {
    Event.delete(this.state.event)
    this.props.navigation.pop()
  }

  render() {
    const { event, trackedEvents } = this.state
    const firstTrack = trackedEvents[0]
    const lastTrack = trackedEvents[trackedEvents.length - 1]
    const firstTimestamp = firstTrack ? this.formatTimestamp(firstTrack.timestamp) : 'Never'
    const lastTimestamp = lastTrack ? this.formatTimestamp(lastTrack.timestamp) : 'Never'

    return (
      <View style={styles.container}>
        <Card title={event.name.toUpperCase()}>
          <ListItem
            title="Times tracked"
            rightTitle={trackedEvents.length.toString()}
            rightTitleStyle={styles.listRightTitle}
            hideChevron
          />
          <ListItem
            title="Last tracked"
            rightTitle={lastTimestamp}
            rightTitleStyle={styles.listRightTitle}
            hideChevron
          />
          <ListItem
            title="First tracked"
            rightTitle={firstTimestamp}
            rightTitleStyle={styles.listRightTitle}
            hideChevron
          />
          <ListItem
            containerStyle={styles.deleteContainer}
            titleStyle={styles.deleteTitle}
            underlayColor={Color.Red}
            title="Delete"
            leftIcon={{ name: 'delete', color: Color.White }}
            onPress={this.onDeleteClicked}
            hideChevron
          />
        </Card>
      </View>
    )
  }
}
