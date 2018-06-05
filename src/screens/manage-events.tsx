import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, ListRenderItemInfo, Alert, ToastAndroid, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { Event, EventModel } from '../model/realm'
import { RootState } from '../redux/store'

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

const keyExtractor = (event: EventModel) => event.id

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
      hideChevron
      onPress={() => ToastAndroid.show('Long press an event to delete it.', ToastAndroid.SHORT)}
      onLongPress={() => this.onEventLongPressed(item)}
    />
  )

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
        <FlatList
          style={styles.flatList}
          data={this.state.events}
          keyExtractor={keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(ManageEventsScreen)
