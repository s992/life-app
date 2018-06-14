import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { Color } from '../colors'
import { Event, EventModel } from '../model/realm'
import { AddEventForm } from '../components/settings/add-form'
import { RootState } from '../redux/store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
})

interface State {
  event?: EventModel
}

class AddEventScreen extends Component<NavigationScreenProps & DispatchProp, State> {
  state: State = {}

  onSave = (eventText: string, calendarSync: boolean) => {
    if (this.state.event) {
      Event.update(this.state.event.id, eventText, calendarSync)
    } else {
      Event.create(eventText, calendarSync)
    }

    this.props.navigation.pop()
  }

  componentDidMount() {
    const eventId = this.props.navigation.getParam('eventId')

    if (!eventId) {
      return
    }

    const event = Event.getById(eventId)

    this.setState((state) => ({ ...state, event }))
  }

  render() {
    return (
      <View style={styles.container}>
        <AddEventForm onSave={this.onSave} event={this.state.event} />
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav })
export default connect(mapStateToProps)(AddEventScreen)
