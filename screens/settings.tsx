import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Button } from 'react-native-elements'

import { Color } from '../colors'
import { TrackedItem, realm } from '../model/realm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.White,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 8,
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

  render() {
    return (
      <View style={styles.container}>
        <Button
          containerViewStyle={styles.buttonContainer}
          buttonStyle={{
            backgroundColor: Color.Red,
            padding: 12,
            justifyContent: 'space-between',
          }}
          iconRight={{ name: 'trash', type: 'font-awesome' }}
          title="Delete all entries"
          onPress={this.onDeleteClicked}
        />
      </View>
    )
  }
}
