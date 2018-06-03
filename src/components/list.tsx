import React from 'react'
import { Component } from 'react'
import { StyleSheet, FlatList, ListRenderItemInfo, View } from 'react-native'
import { ListItem } from 'react-native-elements'

import { EventModel } from '../model/realm'

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
})

export class List extends Component<Props> {
  keyExtractor = (event: EventModel) => event.id

  renderItem = ({ item }: ListRenderItemInfo<EventModel>) => (
    <ListItem title={item.name} onPress={() => this.props.onClick(item)} hideChevron />
  )

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
