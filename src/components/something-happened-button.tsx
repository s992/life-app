import React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { Color } from '../colors'

export interface Props {
  onClick: () => void
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.Red,
    height: '60%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export class SomethingHappenedButton extends Component<Props> {
  render() {
    return (
      <Animatable.View style={styles.container} animation="fadeIn">
        <Button
          buttonStyle={styles.button}
          color={Color.White}
          title="Something Happened."
          large
          onPress={() => this.props.onClick()}
        />
      </Animatable.View>
    )
  }
}
