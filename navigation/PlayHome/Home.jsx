import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/PlayStyles'
import { StatContext } from '../../context/StatContext'

export function Home({ navigation }) {
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state

  const handlePress = () => {
    navigation.push('Course')
  }

  console.log("Home -> statState.totalInfo", statState.roundHistory)

  return (
    <>
      <View style={styles.background}>
     
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage}/>
          <View style={styles.homePageContainer}>
            <View style={styles.holeRow}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Rounds</Text>
                <Text style={styles.boxContent}>{statState.totalInfo.totalRounds}</Text>

              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>HCP</Text>
                <Text style={styles.boxContent}>10.2</Text>
              </View>
            </View>
            <View style={styles.holeRow}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Avg Score</Text>
                <Text style={styles.boxContent}>{statState.totalInfo.avgScore}</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Best Round</Text>
                <Text style={styles.boxContent}>{statState.totalInfo.bestScore}</Text>
              </View>
            </View>
          
            <View style={[styles.styledButton, styles.playButton]}>
              <Text onPress={() => handlePress()} style={styles.buttonText}>Play Now</Text>
            </View>
          </View>
      </View>
    </>
  );
}