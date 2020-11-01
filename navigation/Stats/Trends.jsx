import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { StatContext } from '../../context/StatContext'

export function Trends({ navigation }) {

  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const roundHistory = statState.roundHistory


  React.useEffect(() => {
    console.log('roundhistory', roundHistory)
  }, [statContext])
  const handlePress = () => {
    navigation.push('Hole')
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>

          <View style={styles.chartContainer}>
            <Text>Chart Here</Text>

          </View>

          <View style={styles.chartContainer}>
            <Text>Chart Here</Text>

          </View>

          <View style={styles.chartContainer}>
            <Text>Chart Here</Text>

          </View>

        </View>
      </View>
    </>
  );
}