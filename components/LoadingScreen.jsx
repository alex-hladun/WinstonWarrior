
import * as React from 'react';
import { StyleSheet, Dimensions, Alert, View, Text } from 'react-native';
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'
import { useLoadCourseInfoIntoState } from '../hooks/useLoadCourseInfoIntoState';

export function LoadingScreen() {
  const anything = useLoadCourseInfoIntoState()
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)

  return (
    <View>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
      <Text>Loading...</Text>
    </View>
  )

}