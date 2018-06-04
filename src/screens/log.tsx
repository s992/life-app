import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, SectionList, ListRenderItemInfo, SectionListData, Alert, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem, Text } from 'react-native-elements'
import { format } from 'date-fns'

import { Color } from '../colors'
import { realm, TrackedEvent, TrackedEventModel } from '../model/realm'
import { LogHeader } from '../components/log/log-header'
import { AppState } from '../redux/store'
import { connect, DispatchProp } from 'react-redux'
import { trackedEventDeleted } from '../redux/tracked-event'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

interface Props {
  events: ReadonlyArray<TrackedEventModel>
}

class LogScreen extends Component<NavigationScreenProps & Props & DispatchProp> {
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
    this.props.dispatch(trackedEventDeleted(event))
  }

  renderEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text h4>You haven't logged anything yet.</Text>
    </View>
  )

  render() {
    if (!this.props.events.length) {
      return this.renderEmptyView()
    }

    const sections = createSections(groupEventsByDay(this.props.events))

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

const mapStateToProps = (state: AppState) => ({ nav: state.nav, events: state.trackedEvent.trackedEvents })
export default connect(mapStateToProps)(LogScreen)
