import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import styles from '../../assets/styles/PlayStyles'

export function Home({ navigation }) {

  const handlePress = () => {
    navigation.push('Course Select')
  }

  return (
    <>
    <View style={styles.container}>
      <View style={styles.holeRow}>
        <View style={styles.boxContainer}>
        <Text style={styles.boxHeader}>Total Rounds</Text>
        <Text style={styles.boxContent}>0</Text>
      </View>
      </View>
    </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={() => handlePress()}>Play Now</Text>
      </View>
    </>
  );
}