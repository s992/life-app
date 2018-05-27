import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header, Icon, Text} from 'react-native-elements';

import {Color} from './colors';

import {SomethingHappenedButton} from './components/something-happened-button';
import {List} from './components/list';

interface State {
  page: Page;
}

enum Page {
  Button,
  List,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
  button: {
    backgroundColor: Color.Red,
    height: '60%',
  },
});

export default class App extends Component<{}, State> {
  state = {
    page: Page.Button,
  };

  setPage = (page: Page) => this.setState(state => ({...state, page}));

  renderButton() {
    return <SomethingHappenedButton onClick={() => this.setPage(Page.List)} />;
  }

  renderList() {
    const items = [
      {id: '' + Math.random(), name: 'woke up'},
      {id: '' + Math.random(), name: 'went to sleep'},
      {id: '' + Math.random(), name: 'ate a meal'},
      {id: '' + Math.random(), name: 'ate a snack'},
      {id: '' + Math.random(), name: 'exercised'},
    ];

    return <List onClick={() => this.setPage(Page.Button)} items={items} />;
  }

  whoops() {
    return <Text h1>this page shouldnt exist</Text>;
  }

  renderHome() {
    return (
      <Icon
        name={this.state.page === Page.Button ? 'help-outline' : 'home'}
        color={Color.White}
        underlayColor={Color.Black}
        onPress={() => this.setPage(Page.Button)}
      />
    );
  }

  render() {
    const {page} = this.state;
    let view;

    switch (page) {
      case Page.Button:
        view = this.renderButton();
        break;
      case Page.List:
        view = this.renderList();
        break;
      default:
        view = this.whoops();
    }

    return (
      <View style={{flex: 1, backgroundColor: Color.White}}>
        <Header
          leftComponent={{icon: 'menu', color: Color.White}}
          centerComponent={{
            text: 'LIFE',
            style: {color: Color.White, fontFamily: 'Roboto'},
          }}
          rightComponent={this.renderHome()}
          backgroundColor={Color.Black}
        />
        <View style={styles.container}>{view}</View>
      </View>
    );
  }
}
