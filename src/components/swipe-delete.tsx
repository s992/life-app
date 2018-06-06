import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import Swipeout from 'react-native-swipeout'

import { Color } from '../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface Props {
  children: any
  onClick: () => void
}

export const SwipeDelete = (props: Props) => (
  <Swipeout
    {...props}
    backgroundColor={Color.White}
    right={[
      {
        component: <Icon name="delete" color={Color.White} containerStyle={styles.container} />,
        backgroundColor: Color.Red,
        onPress: props.onClick,
      },
    ]}
  >
    {props.children}
  </Swipeout>
)
