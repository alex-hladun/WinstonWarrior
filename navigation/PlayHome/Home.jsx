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
      <View style={[styles.styledButton, styles.playButton]}>
        <Text onPress={() => handlePress()} style={styles.buttonText}>Play Now</Text>
      </View>
    </View>
    </>
  );
}