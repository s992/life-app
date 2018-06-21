import React from 'react'
import { Component } from 'react'
import { Alert, Keyboard, NativeModules, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Button, FormLabel, FormInput, CheckBox, Text } from 'react-native-elements'

import { Color } from '../colors'
import { EventModel } from '../model/realm'

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
  onSave: (note: string) => void
}

interface State {
  value: string
}

export class TrackWithDetail extends Component<Props, State> {
  state = {
    value: '',
  }

  private input = React.createRef<FormInput>()

  onChangeText = (value: string) => this.setState((state) => ({ ...state, value }))

  onClick = () => {
    Keyboard.dismiss()
    this.props.onSave(this.state.value)
  }

  blurInput = () => this.input.current && this.input.current.blur()

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.blurInput}>
        <View style={{ height: '100%' }}>
          <FormLabel>Do you want to add a note?</FormLabel>
          <FormInput
            ref={this.input}
            defaultValue={this.state.value}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onClick}
          />
          <Button
            large
            title="Track It"
            backgroundColor={Color.Blue}
            iconRight={{ name: 'check' }}
            onPress={this.onClick}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
