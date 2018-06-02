import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { TrackedItem, realm } from '../model/realm'
import { Screen } from '../routes'
import { AddButton } from '../components/settings/add-button'
import { DeleteButton } from '../components/settings/delete-button'

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
        <AddButton onClick={this.onAddClicked} />
        <DeleteButton onClick={this.onDeleteClicked} />
      </View>
    )
  }
}
