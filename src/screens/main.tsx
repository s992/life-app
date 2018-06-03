import React from 'react'
import { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Color } from '../colors'
import { SomethingHappenedButton } from '../components/something-happened-button'
import { Screen } from '../routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

export default class MainScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <SomethingHappenedButton
          onClick={() => this.props.navigation.navigate(Screen.List)}
        />
      </View>
    )
  }
}
