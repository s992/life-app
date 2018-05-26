import React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, View, FlatList} from 'react-native';
import {Button, Header, Icon, ListItem, Text} from 'react-native-elements';

import {Color} from './colors';

interface Props {}
interface State {
  page: Page;
}

enum Page {
  Button,
  List,
}

export default class App extends Component<Props, State> {
  state = {
    page: Page.Button,
  };

  setPage = (page: Page) => this.setState(state => ({...state, page}));

  renderButton() {
    return (
      <Button
        buttonStyle={styles.button}
        color={Color.White}
        title="Something Happened."
        large
        onPress={() => this.setPage(Page.List)}
      />
    );
  }

  renderList() {
    const items = [
      {name: 'woke up'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'woke up'},
      {name: 'woke up'},
      {name: 'woke up'},
      {name: 'woke up'},
      {name: 'woke up'},
      {name: 'woke up'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
      {name: 'went to sleep'},
      {name: 'ryan sucks'},
    ];
    const keyExtractor = (item, index) => item.name;
    const renderItem = ({ item }) => <ListItem title={item.name} onPress={() => this.setPage(Page.Button)} hideChevron />;

    return (
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <FlatList style={{width: '100%'}} keyExtractor={keyExtractor} data={items} renderItem={renderItem} />
      </View>
    );
  }

  whoops() {
    return <Text h1>you done fukt up</Text>;
  }

  renderHome() {
    return (
      <Icon
        name="home"
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
      <View style={{flex: 1}}>
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
