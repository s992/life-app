import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, ListRenderItemInfo, Alert, ToastAndroid, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { EventModel } from '../model/realm'
import { AppState } from '../redux/store'
import { eventDeleted } from '../redux/event'

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

interface Props {
  events: ReadonlyArray<EventModel>
}

class ManageEventsScreen extends Component<NavigationScreenProps & Props & DispatchProp> {
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
    this.props.dispatch(eventDeleted(event))
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.props.events}
          keyExtractor={keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({ nav: state.nav, events: state.event.events })
export default connect(mapStateToProps)(ManageEventsScreen)
