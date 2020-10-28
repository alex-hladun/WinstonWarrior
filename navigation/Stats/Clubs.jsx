import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'


export function Clubs({ navigation }) {

  const handlePress = () => {
    navigation.push('Hole')
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>

          <View style={styles.chartContainer}>
            <Text>Club stuff Here</Text>

          </View>


        </View>
      </View>
    </>
  );
}