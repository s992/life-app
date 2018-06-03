import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { List } from '../components/list'
import { Event, EventModel, TrackedEvent } from '../model/realm'
import { Screen } from '../routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export default class ListScreen extends Component<NavigationScreenProps> {
  onItemSelected = (event: EventModel) => {
    TrackedEvent.create(event)
    this.props.navigation.navigate(Screen.Home)
  }

  render() {
    const events = Event.all()

    return (
      <View style={styles.container}>
        <List events={events} onClick={this.onItemSelected} />
      </View>
    )
  }
}
