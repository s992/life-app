import React from 'react'
import { Component } from 'react'
import { Alert, NativeModules, TouchableWithoutFeedback, View } from 'react-native'
import { Button, FormLabel, FormInput, CheckBox } from 'react-native-elements'
import RNCalendarEvents from 'react-native-calendar-events'

import { Color } from '../../colors'

interface Props {
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
      if (this.input.current) {
        this.input.current.focus()
      }
    }, 100)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.blurInput}>
        <View>
          <FormLabel>What do you want to track?</FormLabel>
          <FormInput ref={this.input} onChangeText={this.onChangeText} />
          <FormLabel>Sync with calendar?</FormLabel>
          <CheckBox
            center
            containerStyle={{ backgroundColor: Color.White }}
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
