
import * as React from 'react';
import { StyleSheet, Dimensions, Alert, View, Text } from 'react-native';
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'
import { useHandicap } from '../hooks/useHandicap';
import { useLoadCourseInfoIntoState } from '../hooks/useLoadCourseInfoIntoState';

export function LoadingScreen() {
  const hcp = useHandicap()
  console.log("🚀 ~ file: LoadingScreen.jsx ~ line 11 ~ LoadingScreen ~ hcp", hcp)
  const anything = useLoadCourseInfoIntoState(hcp)
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