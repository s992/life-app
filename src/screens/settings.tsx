import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { TrackedEvent, realm } from '../model/realm'
import { Screen } from '../routes'
import { DeleteButton } from '../components/settings/delete-button'
import { SettingsButton } from '../components/settings/settings-button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.White,
    marginTop: 2,
  },
})

export default class SettingsScreen extends Component<NavigationScreenProps> {
  onDeleteClicked = () => {
    Alert.alert(
      'Are you sure?',
      'Once you delete your tracked events, they cannot be recovered.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: this.onDeleteConfirmed }],
    )
  }

  onDeleteConfirmed = () => {
    const events = TrackedEvent.all()
    realm.write(() => realm.delete(events))
  }

  handleNavigation = (screen: Screen) => () => this.props.navigation.navigate(screen)

  render() {
    return (
      <View style={styles.container}>
        <SettingsButton
          title="Add a new event to track"
          icon={{ name: 'plus', type: 'font-awesome' }}
          onClick={this.handleNavigation(Screen.AddEvent)}
        />
        <SettingsButton
          title="Manage events"
          icon={{ name: 'list', type: 'font-awesome' }}
          onClick={this.handleNavigation(Screen.ManageEvents)}
        />
        <DeleteButton onClick={this.onDeleteClicked} />
      </View>
    )
  }
}
