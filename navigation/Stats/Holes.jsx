import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'

export function Holes({ navigation }) {

  const handlePress = () => {
    navigation.push('Hole')
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage}/>
          <View style={styles.homePageContainer}>

<View style={styles.chartContainer}>
            <Text>Chart Here</Text>

</View>
            <View style={styles.holeRow}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Score Avg</Text>
                <Text style={styles.boxContent}>3.4</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Avg Putts</Text>
                <Text style={styles.boxContent}>3.2</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Best Score</Text>
                <Text style={styles.boxContent}>2</Text>
              </View>
            </View>
            <View style={styles.holeRow}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Eagles</Text>
                <Text style={styles.boxContent}>12</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Birds</Text>
                <Text style={styles.boxContent}>12</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>Pars</Text>
                <Text style={styles.boxContent}>3</Text>
              </View>
            </View>
            <View style={styles.holeRow}>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>FWY</Text>
                <Text style={styles.boxContent}>32%</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>GIR</Text>
                <Text style={styles.boxContent}>22%</Text>
              </View>
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeader}>U&D</Text>
                <Text style={styles.boxContent}>22%</Text>
              </View>
            </View>
          </View>
      </View>
    </>
  );
}