import React from 'react'
import { Component } from 'react'
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { format } from 'date-fns'
import RNFetchBlob from 'react-native-fetch-blob'

import { Color } from '../colors'
import { TrackedEvent } from '../model/realm'
import { Exporter } from '../components/export/exporter'
import { ExportComplete } from '../components/export/export-complete'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.White,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

interface State {
  exporting: boolean
  filename: string
}

export default class ExportScreen extends Component<NavigationScreenProps, State> {
  state = {
    exporting: false,
    filename: '',
  }

  onExportClicked = async () => {
    const filename = `life-${format(new Date(), 'YYYYMMDDHHmmss')}.csv`
    this.setState((state) => ({ ...state, exporting: true }))

    const events = TrackedEvent.all()
    const header = 'name,timestamp\n'
    const data = events.map((event) => `"${event.event.name}",${format(event.timestamp)}`).join('\n')

    try {
      await RNFetchBlob.fs.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`, `${header}${data}`, 'utf8')
    } catch (err) {
      ToastAndroid.show('Failed to export your events.', ToastAndroid.SHORT)
    }

    this.setState((state) => ({ ...state, exporting: false, filename }))
  }

  render() {
    if (this.state.exporting) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={Color.Blue} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {!this.state.filename.length ? (
          <Exporter onExportClicked={this.onExportClicked} />
        ) : (
          <ExportComplete filename={this.state.filename} />
        )}
      </View>
    )
  }
}
