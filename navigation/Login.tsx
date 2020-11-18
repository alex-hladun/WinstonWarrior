import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { AppContext } from '../context/AppContext'
import { Video } from 'expo-av';
import styles from '../assets/styles/PlayStyles'

export function Login({ navigation }) {
  const context = React.useContext(AppContext)
  console.log('context in Login.tsx', context.dispatch)

  const handlePress = () => {
    console.log('going to root')
    navigation.push('SignUp')
  }

  const handleLogin = () => {
    context.dispatch({
      type: 'authentication_done',
      data: 'Alex'
    })
  }

  return (
    <>
        <View>
      {/* <ImageBackground source={require('../assets/images/cross-stripes.png')} imageStyle={{ resizeMode: 'repeat' }} style={styles.bgImage}> */}
          <Video
            source={require('../assets/golf.m4v')}
            rate={1.0}
            volume={0.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
      {/* </ImageBackground> */}
        </View>
        <View style={styles.modalContainer}>
          <View style={styles.winstonText}>
            <Text style={styles.txt}>W/W</Text>
          </View>
          {/* <View style={styles.styledButton}>
            <Text onPress={() => handlePress()} style={styles.buttonText}>Create Account</Text>
          </View> */}
          <View style={styles.styledButton}>
            <Text onPress={() => handleLogin()} style={styles.buttonText}>Create Profile</Text>
          </View>
        </View>
    </>
  );
}