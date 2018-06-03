import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, ListRenderItemInfo, Alert, ToastAndroid, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'

import { Color } from '../colors'
import { Item, ItemModel, realm, TrackedItem } from '../model/realm'

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

const keyExtractor = (item: ItemModel) => item.id

interface State {
  items: ReadonlyArray<ItemModel>
}

export default class ManageItemsScreen extends Component<NavigationScreenProps, State> {
  state = {
    items: [],
  }

  componentWillMount() {
    this.loadItems()
  }

  loadItems() {
    this.setState((state) => ({ ...state, items: Item.all() }))
  }

  renderItem = ({ item }: ListRenderItemInfo<ItemModel>) => (
    <ListItem
      title={item.name}
      hideChevron
      onPress={() => ToastAndroid.show('Long press an item to delete it.', ToastAndroid.SHORT)}
      onLongPress={() => this.onItemLongPressed(item)}
    />
  )

  onItemLongPressed = (item: ItemModel) => {
    Alert.alert(
      'Are you sure?',
      'Once you delete this item, all log entries associated with this item will be deleted as well.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => this.onDeleteConfirmed(item) }],
    )
  }

  onDeleteConfirmed = (item: ItemModel) => {
    // make sure we dont have orphaned tracked items
    const trackedItems = TrackedItem.all().filtered(`item.id = "${item.id}"`)

    realm.write(() => {
      realm.delete(trackedItems)
      realm.delete(item)
    })

    this.loadItems()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.state.items}
          keyExtractor={keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
