import React from 'react'
import { Component } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  ListRenderItemInfo,
  SectionListData,
  Alert,
  TimePickerAndroid,
  DatePickerAndroid,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem, Text } from 'react-native-elements'
import { format } from 'date-fns'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { TrackedEvent, TrackedEventModel } from '../model/realm'
import { LogHeader } from '../components/log/log-header'
import { RootState } from '../redux/store'
import { Loader } from '../components/export/loader'
import { SwipeEditOrDelete } from '../components/swipe-edit-or-delete'

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
    const date = format(event.timestamp, 'ddd, MM/DD/YY')

    if (!accum[date]) {
      accum[date] = []
    }

    accum[date].push(event)

    return accum
  }, {})

const createSections = (groupedItems: TrackedEventsByDate) =>
  Object.keys(groupedItems).map((key) => ({ title: key, data: groupedItems[key] }))

interface State {
  events?: ReadonlyArray<TrackedEventModel>
  loading: boolean
}

class LogScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state: State = {
    loading: true,
  }

  renderItem = ({ item }: ListRenderItemInfo<TrackedEventModel>) => {
    const timestamp = format(item.timestamp, 'h:mm a')
    const hasNote = item.note && item.note.length
    let subtitle = timestamp

    if (hasNote) {
      subtitle = `${subtitle}\nNote: ${item.note}`
    }

    return (
      <SwipeEditOrDelete onDelete={() => this.onDeleteRequested(item)} onEdit={() => this.editRequested(item)}>
        <ListItem
          title={item.event.name}
          subtitle={subtitle}
          subtitleNumberOfLines={hasNote ? 2 : 1}
          hideChevron
          onLongPress={() => this.onDeleteRequested(item)}
        />
      </SwipeEditOrDelete>
    )
  }

  onDeleteRequested = (event: TrackedEventModel) => {
    Alert.alert('Are you sure?', 'Once you delete this event, it cannot be recovered.', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => this.onDeleteConfirmed(event) },
    ])
  }

  onDeleteConfirmed = (event: TrackedEventModel) => {
    TrackedEvent.delete(event)
    this.setState((state) => ({ ...state, events: TrackedEvent.all() }))
  }

  editRequested = async (event: TrackedEventModel) => {
    const { action: dateAction, year, month, day } = await DatePickerAndroid.open({ date: event.timestamp })

    if (dateAction === 'dismissedAction') {
      return
    }

    const [eventHour, eventMinute] = format(event.timestamp, 'HH mm').split(' ')

    const { action: timeAction, hour, minute } = await TimePickerAndroid.open({
      hour: parseInt(eventHour, 10),
      minute: parseInt(eventMinute, 10),
    })

    if (timeAction === 'dismissedAction') {
      return
    }

    const newTimestamp = new Date(year as number, month as number, day, hour, minute)

    TrackedEvent.update(event.id, newTimestamp)
    this.loadEvents()
  }

  renderEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text h4>You haven't logged anything yet.</Text>
    </View>
  )

  loadEvents() {
    const events = TrackedEvent.all()
    this.setState((state) => ({ ...state, events, loading: false }))
  }

  componentDidMount() {
    this.loadEvents()
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }

    if (!this.state.events || !this.state.events.length) {
      return this.renderEmptyView()
    }

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

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(LogScreen)
