import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, SectionList, ListRenderItemInfo, SectionListData, Alert, ToastAndroid } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { format } from 'date-fns'

import { Color } from '../colors'
import { realm, TrackedItem, TrackedItemModel } from '../model/realm'
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

interface TrackedItemsByDate {
  [key: string]: TrackedItemModel[]
}

const keyExtractor = (item: TrackedItemModel) => item.id
const renderHeader = ({ section: { title } }: { section: SectionListData<TrackedItemModel> }) => (
  <LogHeader title={title} />
)
const groupItemsByDay = (items: ReadonlyArray<TrackedItemModel>) =>
  items.reduce((accum: TrackedItemsByDate, item) => {
    const date = format(item.timestamp, 'MM/DD/YY')

    if (!accum[date]) {
      accum[date] = []
    }

    accum[date].push(item)

    return accum
  }, {})
const createSections = (groupedItems: TrackedItemsByDate) =>
  Object.keys(groupedItems).map((key) => ({ title: key, data: groupedItems[key] }))

interface State {
  items: ReadonlyArray<TrackedItemModel>
}

export default class LogScreen extends Component<NavigationScreenProps, State> {
  state = {
    items: [],
  }

  componentWillMount() {
    this.loadItems()
  }

  loadItems() {
    this.setState((state) => ({ ...state, items: TrackedItem.all() }))
  }

  renderItem = ({ item }: ListRenderItemInfo<TrackedItemModel>) => (
    <ListItem
      title={item.item.name}
      subtitle={format(item.timestamp, 'h:mm:ss a')}
      hideChevron
      onPress={() => ToastAndroid.show('Long press an item to delete it.', ToastAndroid.SHORT)}
      onLongPress={() => this.onItemLongPressed(item)}
    />
  )

  onItemLongPressed = (item: TrackedItemModel) => {
    Alert.alert('Are you sure?', 'Once you delete this item, it cannot be recovered.', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => this.onDeleteConfirmed(item) },
    ])
  }

  onDeleteConfirmed = (item: TrackedItemModel) => {
    realm.write(() => realm.delete(item))
    this.loadItems()
  }

  render() {
    const sections = createSections(groupItemsByDay(this.state.items))

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
