import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import { Color } from '../../colors'

const styles = StyleSheet.create({
  header: {
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomColor: Color.Yellow,
    borderBottomWidth: 2,
  },
  headerText: {
    // textAlign: 'center',
    // fontWeight: 'bold',
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
