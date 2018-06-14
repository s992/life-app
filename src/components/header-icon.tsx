import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'react-native-elements'

import { Color } from '../colors'

export interface Props {
  name: string
  onClick: () => void
}

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
}

export const HeaderIcon = (props: Props) => (
  <TouchableWithoutFeedback onPress={() => props.onClick()} hitSlop={hitSlop}>
    <Icon name={props.name} color={Color.White} underlayColor={Color.Black} />
  </TouchableWithoutFeedback>
)
