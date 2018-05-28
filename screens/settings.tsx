import React from 'react';
import {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

import {Color} from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
});

export default class SettingsScreen extends Component<NavigationScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>testing</Text>
      </View>
    );
  }
}
