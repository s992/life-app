import React from 'react';
import {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {Button, FormLabel, FormInput} from 'react-native-elements';

import {Color} from '../colors';
import {Item, realm} from '../model/realm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
});

interface State {
  value: string;
}

export default class AddItemScreen extends Component<
  NavigationScreenProps,
  State
> {
  state = {
    value: '',
  };

  onChangeText = (value: string) => this.setState(state => ({...state, value}));

  onClick = () => {
    Item.create(this.state.value);
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>What do you want to track?</FormLabel>
        <FormInput onChangeText={this.onChangeText} />
        <Button
          large
          title="Save"
          backgroundColor={Color.Blue}
          disabled={this.state.value.trim().length === 0}
          iconRight={{name: 'check'}}
          onPress={this.onClick}
        />
      </View>
    );
  }
}
