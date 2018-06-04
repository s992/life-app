import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { Screen } from '../routes'
import { DeleteButton } from '../components/settings/delete-button'
import { SettingsButton } from '../components/settings/settings-button'
import { allTrackedEventsDeleted } from '../redux/tracked-event'
import { AppState } from '../redux/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.White,
    marginTop: 8,
  },
})

class SettingsScreen extends Component<NavigationScreenProps & DispatchProp> {
  onDeleteClicked = () => {
    Alert.alert('Are you sure?', 'Once you delete your tracked events, they cannot be recovered.', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: this.onDeleteConfirmed },
    ])
  }

  onDeleteConfirmed = () => {
    this.props.dispatch(allTrackedEventsDeleted())
  }

  handleNavigation = (screen: Screen) => () => this.props.navigation.navigate(screen)

  render() {
    return (
      <View style={styles.container}>
        <SettingsButton
          title="Add a new event type"
          icon={{ name: 'plus', type: 'font-awesome' }}
          onClick={this.handleNavigation(Screen.AddEvent)}
        />
        <SettingsButton
          title="Manage event types"
          icon={{ name: 'list', type: 'font-awesome' }}
          onClick={this.handleNavigation(Screen.ManageEvents)}
        />
        <DeleteButton onClick={this.onDeleteClicked} />
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({ nav: state.nav })
export default connect(mapStateToProps)(SettingsScreen)
