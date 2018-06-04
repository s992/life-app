import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { Event } from '../model/realm'
import { AddEventForm } from '../components/settings/add-form'
import { AppState } from '../redux/store'
import { eventCreated } from '../redux/event'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

class AddEventScreen extends Component<NavigationScreenProps & DispatchProp> {
  onSave = (eventText: string) => {
    this.props.dispatch(eventCreated(Event.create(eventText)))
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

const mapStateToProps = (state: AppState) => ({ nav: state.nav })
export default connect(mapStateToProps)(AddEventScreen)
