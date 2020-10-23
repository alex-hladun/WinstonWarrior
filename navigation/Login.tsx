import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { AppContext } from '../context/AppContext'

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={() => handlePress()}>Go to signup Screen</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={() => handleLogin()}>Click to login</Text>
      </View>
    </>
  );
}