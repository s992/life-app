import React from 'react'
import { Icon } from 'react-native-elements'

import { Color } from '../colors'

export interface Props {
  name: string
  onClick: () => void
}

export const HeaderIcon = (props: Props) => (
  <Icon name={props.name} color={Color.White} underlayColor={Color.Black} onPress={() => props.onClick()} />
)
