import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';

export function Home({ navigation }) {

  const handlePress = () => {
    console.log('going to course')
    navigation.push('Course Select')
  }

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={() => handlePress()}>Play Now</Text>
      </View>
    </>
  );
}