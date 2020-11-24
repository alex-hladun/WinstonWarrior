import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { AppContext } from '../context/AppContext'
import styles from '../assets/styles/PlayStyles'


export function SignUp({ navigation }) {
  const appContext = React.useContext(AppContext)
  const [name, setName] = React.useState('')

  const handlePress = () => {
    console.log('going to Login')
    // navigation.push('Login')
    appContext.dispatch({
      type: 'authentication_done',
      data: name
    })
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
