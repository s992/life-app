import React from 'react'
import { Component } from 'react'
import { StyleSheet, FlatList, ListRenderItemInfo, View } from 'react-native'
import { ListItem } from 'react-native-elements'

import { ItemModel } from '../model/realm'

export interface Props {
  items: ReadonlyArray<ItemModel>
  onClick: (item: ItemModel) => void
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
  render() {
    const { items, onClick } = this.props
    const keyExtractor = (item: ItemModel) => item.id
    const renderItem = ({ item }: ListRenderItemInfo<ItemModel>) => (
      <ListItem title={item.name} onPress={() => onClick(item)} hideChevron />
    )

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          keyExtractor={keyExtractor}
          data={items}
          renderItem={renderItem}
        />
      </View>
    )
  }
}
