import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { TrackedItem, realm } from '../model/realm'
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
      'Once you delete your tracked items, they cannot be recovered.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: this.onDeleteConfirmed }],
    )
  }

  onDeleteConfirmed = () => {
    const items = TrackedItem.all()
    realm.write(() => realm.delete(items))
  }

  onAddClicked = () => this.props.navigation.navigate(Screen.AddItem)

  render() {
    return (
      <View style={styles.container}>
        <SettingsButton
          title="Add a new item to track"
          icon={{ name: 'plus', type: 'font-awesome' }}
          onClick={this.onAddClicked}
        />
        <SettingsButton
          title="Manage items"
          icon={{ name: 'list', type: 'font-awesome' }}
          onClick={this.onAddClicked}
        />
        <DeleteButton onClick={this.onDeleteClicked} />
      </View>
    )
  }
}
