import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { List } from '../components/list'
import { Item, TrackedItem } from '../model/realm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export default class ListScreen extends Component<NavigationScreenProps> {
  onItemSelected = (item: Item) => {
    TrackedItem.create(item)
    this.props.navigation.navigate('Main')
  }

  render() {
    const items = Item.all()

    return (
      <View style={styles.container}>
        <List items={items} onClick={this.onItemSelected} />
      </View>
    )
  }
}
