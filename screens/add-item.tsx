import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { Item } from '../model/realm'
import AddItemForm from '../components/settings/add-form'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

export default class AddItemScreen extends Component<NavigationScreenProps> {
  onSave = (itemText: string) => {
    Item.create(itemText)
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <AddItemForm onSave={this.onSave} />
      </View>
    )
  }
}
