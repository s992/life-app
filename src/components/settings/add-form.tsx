import React from 'react'
import { Component } from 'react'
import { Alert, NativeModules, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Button, FormLabel, FormInput, CheckBox } from 'react-native-elements'
import RNCalendarEvents from 'react-native-calendar-events'

import { Color } from '../../colors'
import { EventModel } from '../../model/realm'

const styles = StyleSheet.create({
  checkboxText: {
    color: '#86939e',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  checkboxContainer: {
    backgroundColor: Color.White,
    borderWidth: 0,
  },
})

interface Props {
  event?: EventModel
  onSave: (eventText: string, calendarSync: boolean) => void
}

interface State {
  value: string
  calendarSync: boolean
}

export class AddEventForm extends Component<Props, State> {
  state = {
    value: '',
    calendarSync: false,
  }

  private input = React.createRef<FormInput>()

  onChangeText = (value: string) => this.setState((state) => ({ ...state, value }))

  onCalendarSyncToggled = async () => {
    const enabled = !this.state.calendarSync

    this.blurInput()
    this.setState((state) => ({ ...state, calendarSync: enabled }))

    if (!enabled) {
      return
    }

    const permitted = await RNCalendarEvents.authorizeEventStore()

    if (!permitted) {
      Alert.alert(
        'Unable to sync with calendar',
        'You must grant calendar permissions to Life in order to sync events.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => NativeModules.SettingsOpener.openSettings() },
        ],
      )

      this.setState((state) => ({ ...state, calendarSync: false }))
    }
  }

  onClick = () => this.props.onSave(this.state.value, this.state.calendarSync)

  isDisabled = () => this.state.value.trim().length === 0

  blurInput = () => this.input.current && this.input.current.blur()

  componentDidMount() {
    setTimeout(() => {
      if (!this.props.event && this.input.current) {
        this.input.current.focus()
      }
    }, 100)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { event } = nextProps

    if (!event) {
      return
    }

    this.setState((state) => ({ ...state, value: event.name, calendarSync: event.calendarSync }))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.blurInput}>
        <View>
          <FormLabel>What do you want to track?</FormLabel>
          <FormInput
            ref={this.input}
            defaultValue={this.state.value}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onClick}
          />
          <CheckBox
            title="Sync with calendar?"
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor={Color.Blue}
            checked={this.state.calendarSync}
            onPress={this.onCalendarSyncToggled}
          />
          <Button
            large
            title="Save"
            backgroundColor={Color.Blue}
            disabled={this.isDisabled()}
            iconRight={{ name: 'check' }}
            onPress={this.onClick}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
