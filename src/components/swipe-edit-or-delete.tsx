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
  onEdit: () => void
  onDelete: () => void
}

export const SwipeEditOrDelete = (props: Props) => (
  <Swipeout
    {...props}
    autoClose
    backgroundColor={Color.White}
    left={[
      {
        component: <Icon name="edit" color={Color.White} containerStyle={styles.container} />,
        backgroundColor: Color.Blue,
        onPress: props.onEdit,
      },
    ]}
    right={[
      {
        component: <Icon name="delete" color={Color.White} containerStyle={styles.container} />,
        backgroundColor: Color.Red,
        onPress: props.onDelete,
      },
    ]}
  >
    {props.children}
  </Swipeout>
)
