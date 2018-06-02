import React from 'react'
import { Button } from 'react-native-elements'

import { Color } from '../../colors'

export interface Props {
  onClick: () => void
}

export const AddButton = (props: Props) => (
  <Button
    containerViewStyle={{
      width: '100%',
      marginBottom: 8,
    }}
    backgroundColor={Color.Black}
    color={Color.White}
    buttonStyle={{ padding: 12, justifyContent: 'space-between' }}
    iconRight={{ name: 'plus', type: 'font-awesome' }}
    title="Add a new item to track"
    onPress={() => props.onClick()}
  />
)
