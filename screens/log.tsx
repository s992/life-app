import React from 'react'
import { Component } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  ListRenderItemInfo,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ListItem, Text } from 'react-native-elements'
import { format } from 'date-fns'

import { Color } from '../colors'
import { TrackedItem, TrackedItemModel } from '../model/realm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  header: {
    backgroundColor: Color.Yellow,
    flex: 1,
    borderBottomColor: Color.Black,
    borderBottomWidth: 1,
    padding: 12,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default class LogScreen extends Component<NavigationScreenProps> {
  render() {
    const items = TrackedItem.all()
    const keyExtractor = (item: TrackedItemModel) => item.id
    const renderHeader = ({ section: { title } }: any) => (
      <View style={styles.header}>
        <Text style={styles.headerText} h4>
          {title}
        </Text>
      </View>
    )
    const renderItem = ({ item }: ListRenderItemInfo<TrackedItemModel>) => (
      <ListItem
        title={item.item.name}
        subtitle={format(item.timestamp, 'h:mm:ss a')}
        hideChevron
      />
    )

    const byDay: { [key: string]: TrackedItemModel[] } = items.reduce(
      (accum: { [key: string]: TrackedItemModel[] }, item) => {
        const date = format(item.timestamp, 'MM/DD/YY')

        if (!accum[date]) {
          accum[date] = []
        }

        accum[date].push(item)

        return accum
      },
      {},
    )

    const sections = Object.keys(byDay).map((key) => ({
      title: key,
      data: byDay[key],
    }))

    return (
      <View style={styles.container}>
        <SectionList
          style={styles.flatList}
          keyExtractor={keyExtractor}
          sections={sections}
          renderSectionHeader={renderHeader}
          renderItem={renderItem}
        />
      </View>
    )
  }
}
