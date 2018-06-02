import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

export default class ManageItemsScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>placeholder</Text>
      </View>
    )
  }
}
