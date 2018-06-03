import React from 'react'
import { Component } from 'react'
import { View } from 'react-native'
import { Button, FormLabel, FormInput } from 'react-native-elements'

import { Color } from '../../colors'

interface Props {
  onSave: (eventText: string) => void
}

interface State {
  value: string
}

export class AddEventForm extends Component<Props, State> {
  state = {
    value: '',
  }

  onChangeText = (value: string) => this.setState((state) => ({ ...state, value }))

  onClick = () => this.props.onSave(this.state.value)

  isDisabled = () => this.state.value.trim().length === 0

  render() {
    return (
      <View>
        <FormLabel>What do you want to track?</FormLabel>
        <FormInput onChangeText={this.onChangeText} />
        <Button
          large
          title="Save"
          backgroundColor={Color.Blue}
          disabled={this.isDisabled()}
          iconRight={{ name: 'check' }}
          onPress={this.onClick}
        />
      </View>
    )
  }
}
