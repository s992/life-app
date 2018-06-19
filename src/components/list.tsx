import React from 'react'
import { Component } from 'react'
import { StyleSheet, FlatList, ListRenderItemInfo, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { format } from 'date-fns'

import { EventModel, TrackedEvent } from '../model/realm'

export interface Props {
  events: ReadonlyArray<EventModel>
  onClick: (event: EventModel) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  bigPadding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export class List extends Component<Props> {
  keyExtractor = (event: EventModel) => event.id

  renderItem = ({ item }: ListRenderItemInfo<EventModel>) => {
    const tracked = TrackedEvent.getByEventId(item.id).sorted('timestamp', true)
    const mostRecent = tracked[0] ? format(tracked[0].timestamp, 'MM/DD/YY h:mm a') : 'never'

    return (
      <ListItem
        containerStyle={styles.bigPadding}
        title={item.name}
        subtitle={`Last tracked: ${mostRecent}`}
        onPress={() => this.props.onClick(item)}
        hideChevron
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          keyExtractor={this.keyExtractor}
          data={this.props.events}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
