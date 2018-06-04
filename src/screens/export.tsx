import React from 'react'
import { Component } from 'react'
import { Button, StyleSheet, ToastAndroid, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { format } from 'date-fns'
import { Text } from 'react-native-elements'
import RNFetchBlob from 'react-native-fetch-blob'

import { Color } from '../colors'
import { TrackedEvent } from '../model/realm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
})

interface State {
  exporting: boolean
  fileName: string
}

export default class ExportScreen extends Component<NavigationScreenProps, State> {
  state = {
    exporting: false,
    fileName: '',
  }

  onShareClicked = async () => {
    const fileName = `life-${format(new Date(), 'YYYYMMDDHHmmss')}.csv`
    this.setState((state) => ({ ...state, exporting: true, fileName }))

    const events = TrackedEvent.all()
    const header = 'name,timestamp\n'
    const data = events.map((event) => `"${event.event.name}",${format(event.timestamp)}`).join('\n')

    try {
      await RNFetchBlob.fs.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`, `${header}${data}`, 'utf8')
    } catch (err) {
      ToastAndroid.show('Failed to export your events.', ToastAndroid.SHORT)
    }

    this.setState((state) => ({ ...state, exporting: false }))
  }

  renderExporting = () => <Text>Exporting..</Text>
  renderDone = () => <Text>Your events have been exported to your download directory as {this.state.fileName}</Text>

  render() {
    let view

    if (this.state.exporting) {
      view = this.renderExporting()
    } else if (this.state.fileName) {
      view = this.renderDone()
    } else {
      view = <Button title="testing" onPress={this.onShareClicked} />
    }

    return <View style={styles.container}>{view}</View>
  }
}
