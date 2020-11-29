import { View, Text, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { AppContext } from '../context/AppContext'
import styles from '../assets/styles/PlayStyles'
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'

export const resetDatabase = async() => {
    console.log('RESETTING DB FROM SIGNUP')
    AsyncStorage.removeItem('authName')
    removeDB()
    setUpDB()
    await createClubs()
    createWinston()
}

export function SignUp({ navigation }) {
  const appContext = React.useContext(AppContext)
  const [name, setName] = React.useState('')


  const handlePress = () => {
    console.log('completing signnup')
    resetDatabase()
    // navigation.push('Login')
    appContext.dispatch({
      type: 'signed_up',
      data: name
    })
    appContext.value.doneRound()
  }

  return (
    <View style={styles.background}>
      <Image source={require('../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
      <View style={styles.welcomeContainer}>
      
        <Text style={styles.welcomeText}>
Welcome! 
        </Text>
        <Text style={styles.welcomeTextSmall}>
        Enter your name to continue
        </Text>
      <View style={styles.signUpText}>

        <TextInput style={styles.playerText}
          autoFocus={true}
          selectTextOnFocus={true}
          multiline={false}
          onChangeText={text => setName(text)}>
          {name}
        </TextInput>
        </View>

      <TouchableOpacity onPress={() => handlePress()}>
        <View style={[styles.styledWelcomeButton, styles.playButton]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}
