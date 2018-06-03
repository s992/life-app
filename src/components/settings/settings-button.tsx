import React from 'react'
import { Button } from 'react-native-elements'

import { Color } from '../../colors'

export interface Props {
  title: string
  icon: { name: string; type?: string }
  onClick: () => void
}

export const SettingsButton = (props: Props) => (
  <Button
    containerViewStyle={{
      width: '100%',
      marginBottom: 8,
    }}
    backgroundColor={Color.Black}
    color={Color.White}
    buttonStyle={{ padding: 12, justifyContent: 'space-between' }}
    iconRight={props.icon}
    title={props.title}
    onPress={() => props.onClick()}
  />
)
