import React from 'react';
import {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

import {Color} from '../colors';
import {List} from '../components/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
});

export default class ListScreen extends Component<NavigationScreenProps> {
  render() {
    const items = [
      {id: '' + Math.random(), name: 'woke up'},
      {id: '' + Math.random(), name: 'went to sleep'},
      {id: '' + Math.random(), name: 'ate a meal'},
      {id: '' + Math.random(), name: 'ate a snack'},
      {id: '' + Math.random(), name: 'exercised'},
    ];
    return (
      <View style={styles.container}>
        <List
          items={items}
          onClick={() => this.props.navigation.navigate('Main')}
        />
      </View>
    );
  }
}
