import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'

import { Color } from '../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.White,
  },
  header: {
    height: '30%',
    justifyContent: 'center',
  },
  button: {
    height: '70%',
  },
})

interface Props {
  onExportClicked: () => void
}

export const Exporter = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text>Export your tracked events in a simple CSV format.</Text>
    </View>
    <View style={styles.button}>
      <Button
        large
        title="Tap here to export"
        iconRight={{ name: 'import-export', color: Color.White }}
        backgroundColor={Color.Blue}
        color={Color.White}
        onPress={props.onExportClicked}
      />
    </View>
  </View>
)
