import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';


export function SignUp({navigation}) {
  const handlePress= () => {
    console.log('going to Login')
    navigation.push('Login')
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => handlePress()}>Signup Screen</Text>
    </View>
  );
}
