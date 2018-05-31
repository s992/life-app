import React from 'react'
import { Component } from 'react'
import { Icon } from 'react-native-elements'

import { Color } from '../colors'

export interface Props {
  name: string
  onClick: () => void
}

export default class HeaderIcon extends Component<Props> {
  render() {
    return (
      <Icon
        name={this.props.name}
        color={Color.White}
        underlayColor={Color.Black}
        onPress={() => this.props.onClick()}
      />
    )
  }
}
