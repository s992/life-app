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
    justifyContent: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  header: {
    marginBottom: 35,
  },
  filename: {
    color: Color.Red,
  },
})

interface Props {
  filename: string
}

export const ExportComplete = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.innerWrapper}>
      <Text h3 style={[styles.centered, styles.header]}>
        Export Successful
      </Text>
    </View>
    <View style={styles.innerWrapper}>
      <Text style={styles.centered}>Your export is in your Downloads folder as</Text>
      <Text style={styles.filename}>{props.filename}</Text>
    </View>
  </View>
)
