import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { Event } from '../model/realm'
import { AddEventForm } from '../components/settings/add-form'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

export default class AddEVentScreen extends Component<NavigationScreenProps> {
  onSave = (eventText: string) => {
    Event.create(eventText)
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <AddEventForm onSave={this.onSave} />
      </View>
    )
  }
}
