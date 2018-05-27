import React from 'react';
import {Component} from 'react';
import {StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import {ListItem} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import {Color} from '../colors';
import {Item} from '../model/item';

export interface Props {
  items: Item[];
  onClick: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
});

export class List extends React.Component<Props> {
  render() {
    const {items, onClick} = this.props;
    const keyExtractor = (item: Item) => item.id;
    const renderItem = ({item}: ListRenderItemInfo<Item>) => (
      <ListItem title={item.name} onPress={() => onClick()} hideChevron />
    );

    return (
      <Animatable.View style={styles.container} animation="fadeIn">
        <FlatList
          style={styles.flatList}
          keyExtractor={keyExtractor}
          data={items}
          renderItem={renderItem}
        />
      </Animatable.View>
    );
  }
}
