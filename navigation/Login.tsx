import { View, Text, Alert, TouchableOpacity, Dimensions ,TextInput, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { AppContext } from '../context/AppContext'
import { Video } from 'expo-av';
import styles from '../assets/styles/PlayStyles'
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadGirPct, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct, loadFwHistory } from '../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';
// import * as Updates from 'expo-updates' // Updates*
const width =  Dimensions.get('window').width
console.log(width)
export function Login({ navigation }) {
  const appContext = React.useContext(AppContext)
  // console.log('context in Login.tsx', appContext.dispatch)

  React.useEffect(() => {
    let reset = false;
    let seed = false;
    if (reset) {
      console.log('resetting DB SHOULD ONLY RUN ONCE')
      AsyncStorage.removeItem('authName')
      removeDB()
      setUpDB()
      createClubs()
      createWinston()
      // registerUser('Alex')      
      appContext.value.doneRound()

    }

    if (seed) {
      seedData()
    }

    // const updateProcess = async () => {
    //   // NOT CURRENTLY IN USE
    //   try {
    //     const update = await Updates.checkForUpdateAsync()
    //     if (update.isAvailable) {
    //       Alert.alert('Update Available. Downloading...')
    //       await Updates.fetchUpdateAsync()
    //       // NOTIFY USER HERE


    //       Updates.reloadAsync()
    //     }
    //   } catch (e) {
    //     console.log('error', e)
    //       // HANDLE ERROR HERE
    //   }
    // }
    const authProcess = async () => {
      const authName = await AsyncStorage.getItem('authName')
      if (authName) {
        appContext.dispatch({
          type: 'authentication_done',
          data: authName
        })
      }
    }

    // updateProcess()
    authProcess()
  }, [])

  const handlePress = () => {
    console.log('going to root')
    navigation.push('SignUp')
  }

  const handleLogin = () => {
    navigation.push('SignUp')
    // appContext.dispatch({
    //   type: 'authentication_done',
    //   data: 'Alex'
    // })
  }

  return (
    <>
      <View>
        {/* <ImageBackground source={require('../assets/images/cross-stripes.png')} imageStyle={{ resizeMode: 'repeat' }} style={styles.bgImage}> */}
        {width < 1284 && <Video
          source={require('../assets/golf.m4v')}
          rate={1.0}
          volume={0.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />}
        {/* </ImageBackground> */}
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.winstonLogoContainer}>
          <Image source={require('../assets/images/winstonLogo.png')} style={styles.winnyImage} />
          {/* <Text style={[styles.buttonText, styles.winstonTxtLogin]}>
              Winston Warrior
              </Text> */}
        </View>
        {/* <View style={styles.winstonText}>
            <Text style={styles.txt}>W/W</Text>
          </View> */}
        {/* <View style={styles.styledButton}>
            <Text onPress={() => handlePress()} style={styles.buttonText}>Create Account</Text>
          </View> */}

        <View style={styles.styledButton}>
          <Text onPress={() => handleLogin()} style={styles.buttonText}>Create Account</Text>
        </View>
      </View>
    </>
  );
}