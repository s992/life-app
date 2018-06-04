import React from 'react'
import { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'
import { List, ListItem } from 'react-native-elements'

import { Color } from '../colors'
import { Screen } from '../routes'
import { allTrackedEventsDeleted } from '../redux/tracked-event'
import { RootState } from '../redux/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.White,
    width: '100%',
  },
  listContainer: {
    marginTop: 0,
    width: '100%',
  },
  listItemContainer: {
    backgroundColor: Color.White,
  },
  deleteContainer: {
    backgroundColor: Color.Red,
  },
  deleteTitle: {
    color: Color.White,
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
        <List containerStyle={styles.listContainer}>
          <ListItem
            containerStyle={styles.listItemContainer}
            title="Add a new event type"
            leftIcon={{ name: 'create' }}
            onPress={this.handleNavigation(Screen.AddEvent)}
          />
          <ListItem
            containerStyle={styles.listItemContainer}
            title="Manage event types"
            leftIcon={{ name: 'list' }}
            onPress={this.handleNavigation(Screen.ManageEvents)}
          />
        </List>
        <List containerStyle={{ width: '100%' }}>
          <ListItem
            containerStyle={styles.deleteContainer}
            titleStyle={styles.deleteTitle}
            underlayColor={Color.Red}
            title="Delete all logged events"
            leftIcon={{ name: 'delete', color: Color.White }}
            onPress={this.onDeleteClicked}
            hideChevron
          />
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(SettingsScreen)
