import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, SectionList, ListRenderItemInfo, SectionListData, Alert, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { format } from 'date-fns'

import { Color } from '../colors'
import { realm, TrackedEvent, TrackedEventModel } from '../model/realm'
import { LogHeader } from '../components/log/log-header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
})

interface TrackedEventsByDate {
  [key: string]: TrackedEventModel[]
}

const keyExtractor = (event: TrackedEventModel) => event.id
const renderHeader = ({ section: { title } }: { section: SectionListData<TrackedEventModel> }) => (
  <LogHeader title={title} />
)
const groupEventsByDay = (events: ReadonlyArray<TrackedEventModel>) =>
  events.reduce((accum: TrackedEventsByDate, event) => {
    const date = format(event.timestamp, 'MM/DD/YY')

    if (!accum[date]) {
      accum[date] = []
    }

    accum[date].push(event)

    return accum
  }, {})
const createSections = (groupedItems: TrackedEventsByDate) =>
  Object.keys(groupedItems).map((key) => ({ title: key, data: groupedItems[key] }))

interface State {
  events: ReadonlyArray<TrackedEventModel>
}

export default class LogScreen extends Component<NavigationScreenProps, State> {
  state = {
    events: [],
  }

  componentWillMount() {
    this.loadEvents()
  }

  loadEvents() {
    this.setState((state) => ({ ...state, events: TrackedEvent.all() }))
  }

  renderItem = ({ item }: ListRenderItemInfo<TrackedEventModel>) => (
    <ListItem
      title={item.event.name}
      subtitle={format(item.timestamp, 'h:mm:ss a')}
      hideChevron
      onPress={() => ToastAndroid.show('Long press an item to delete it.', ToastAndroid.SHORT)}
      onLongPress={() => this.onEventLongPressed(item)}
    />
  )

  onEventLongPressed = (event: TrackedEventModel) => {
    Alert.alert('Are you sure?', 'Once you delete this event, it cannot be recovered.', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => this.onDeleteConfirmed(event) },
    ])
  }

  onDeleteConfirmed = (event: TrackedEventModel) => {
    realm.write(() => realm.delete(event))
    this.loadEvents()
  }

  render() {
    const sections = createSections(groupEventsByDay(this.state.events))

    return (
      <View style={styles.container}>
        <SectionList
          style={styles.flatList}
          keyExtractor={keyExtractor}
          sections={sections}
          renderSectionHeader={renderHeader}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
