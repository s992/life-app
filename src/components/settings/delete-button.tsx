import React from 'react'
import { Button } from 'react-native-elements'

import { Color } from '../../colors'

export interface Props {
  onClick: () => void
}

export const DeleteButton = (props: Props) => (
  <Button
    containerViewStyle={{
      width: '100%',
      position: 'absolute',
      bottom: 0,
    }}
    buttonStyle={{
      backgroundColor: Color.Red,
      padding: 12,
      justifyContent: 'space-between',
    }}
    iconRight={{ name: 'trash', type: 'font-awesome' }}
    title="Delete all entries"
    onPress={() => props.onClick()}
  />
)
