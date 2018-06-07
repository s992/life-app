import React from 'react'
import { Component } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Card, ListItem } from 'react-native-elements'
import { differenceInCalendarDays, format } from 'date-fns'

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

enum Frequency {
  Daily,
  Weekly,
  Monthly,
}

interface State {
  event: EventModel
  trackedEvents: ReadonlyArray<TrackedEventModel>
  selectedFrequency: Frequency
  frequency?: {
    [Frequency.Daily]: number
    [Frequency.Weekly]: number
    [Frequency.Monthly]: number
  }
}

export default class EventDetailScreen extends Component<NavigationScreenProps, State> {
  state: State = {
    event: Event.getById(this.props.navigation.getParam('eventId')),
    trackedEvents: TrackedEvent.getByEventId(this.props.navigation.getParam('eventId')).sorted('timestamp'),
    selectedFrequency: Frequency.Daily,
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

  cycleFrequency = () => {
    let next = this.state.selectedFrequency + 1

    if (next > 2) {
      next = 0
    }

    this.setState((state) => ({ ...state, selectedFrequency: next }))
  }

  getFrequency() {
    const all = TrackedEvent.all().sorted('timestamp', true)
    const first = all[0].timestamp
    const last = all[all.length - 1].timestamp
    const dayDiff = Math.max(1, differenceInCalendarDays(first, last))
    const byDay = this.state.trackedEvents.length / dayDiff
    const byWeek = byDay * 7
    const byMonth = byDay * 30

    return {
      [Frequency.Daily]: byDay,
      [Frequency.Weekly]: byWeek,
      [Frequency.Monthly]: byMonth,
    }
  }

  getFrequencyString() {
    switch (this.state.selectedFrequency) {
      case Frequency.Daily:
        return ' / day'
      case Frequency.Weekly:
        return ' / wk'
      case Frequency.Monthly:
        return ' / mo'
    }
  }

  componentDidMount() {
    const frequency = this.getFrequency()

    this.setState((state) => ({ ...state, frequency }))
  }

  render() {
    const { event, trackedEvents, frequency, selectedFrequency } = this.state
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
          {frequency && (
            <ListItem
              title="Frequency"
              rightTitle={`${frequency[selectedFrequency].toFixed(2)}${this.getFrequencyString()}`}
              rightTitleStyle={styles.listRightTitle}
              onPress={this.cycleFrequency}
              hideChevron
            />
          )}
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
