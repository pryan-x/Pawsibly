import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Secondary } from '../../colors'

export const Spinner = ({ size }) => (
  <ActivityIndicator
    style={styles.spinner}
    size={'large' || size}
    color={Secondary}
  />
)

const styles = StyleSheet.create({
  spinner: {
    alignSelf: 'center',
    position: 'absolute',
    top: '40%'
  }
})
