
import * as React from 'react';
import { StyleSheet, Dimensions, Alert, View, Text, Image } from 'react-native';
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'
import { useHandicap } from '../hooks/useHandicap';
import { useLoadCourseInfoIntoState } from '../hooks/useLoadCourseInfoIntoState';
import styles from '../assets/styles/PlayStyles'

export function LoadingScreen() {
  const hcp = useHandicap()
  console.log("🚀 ~ file: LoadingScreen.jsx ~ line 11 ~ LoadingScreen ~ hcp", hcp)
  // This loads all the components into state.
  const anything = useLoadCourseInfoIntoState(hcp)
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)

  return (
    <View style={styles.background}>
    <Image source={require('../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
    <View style={styles.welcomeContainer}>
  
      <Text style={styles.welcomeText}>
Loading...
      </Text>
    </View>
  </View>
  )

}