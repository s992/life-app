import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, SectionList, ListRenderItemInfo, SectionListData, Alert, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem, Text } from 'react-native-elements'
import { format } from 'date-fns'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { TrackedEvent, TrackedEventModel } from '../model/realm'
import { LogHeader } from '../components/log/log-header'
import { RootState } from '../redux/store'
import { SwipeDelete } from '../components/swipe-delete'
import { Loader } from '../components/export/loader'

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

interface State {
  events?: ReadonlyArray<TrackedEventModel>
  loading: boolean
}

class LogScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state: State = {
    loading: true,
  }

  renderItem = ({ item }: ListRenderItemInfo<TrackedEventModel>) => (
    <SwipeDelete onClick={() => this.onDeleteRequested(item)}>
      <ListItem
        title={item.event.name}
        subtitle={format(item.timestamp, 'h:mm:ss a')}
        hideChevron
        onPress={() => ToastAndroid.show('Long press an event to delete it.', ToastAndroid.SHORT)}
        onLongPress={() => this.onDeleteRequested(item)}
      />
    </SwipeDelete>
  )

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

  renderEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text h4>You haven't logged anything yet.</Text>
    </View>
  )

  componentDidMount() {
    const events = TrackedEvent.all()

    this.setState((state) => ({ ...state, events, loading: false }))
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
