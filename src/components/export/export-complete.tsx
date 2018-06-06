import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import { Color } from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.White,
    padding: 15,
  },
  innerWrapper: {
    alignItems: 'center',
  },
  header: {
    height: '30%',
    justifyContent: 'center',
  },
  body: {
    height: '70%',
  },
  centered: {
    textAlign: 'center',
  },
  filename: {
    color: Color.Red,
    marginTop: 4,
  },
})

interface Props {
  filename: string
}

export const ExportComplete = (props: Props) => (
  <View style={styles.container}>
    <View style={[styles.innerWrapper, styles.header]}>
      <Text h3 style={[styles.centered, styles.header]}>
        Export Successful
      </Text>
    </View>
    <View style={[styles.innerWrapper, styles.body]}>
      <Text style={styles.centered}>Your export is in your Downloads folder as</Text>
      <Text style={styles.filename}>{props.filename}</Text>
    </View>
  </View>
)
