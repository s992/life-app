import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import { Color } from '../../colors'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.Yellow,
    flex: 1,
    borderBottomColor: Color.Black,
    borderBottomWidth: 1,
    padding: 12,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export interface Props {
  title: string
}

export const LogHeader = (props: Props) => (
  <View style={styles.header}>
    <Text style={styles.headerText} h4>
      {props.title}
    </Text>
  </View>
)
