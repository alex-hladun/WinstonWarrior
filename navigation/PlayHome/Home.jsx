import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import styles from '../../assets/styles/PlayStyles'
export function Home({ navigation }) {

  const handlePress = () => {
    navigation.push('Course')
  }

  return (
    <>
      <View style={styles.homePageContainer}>
        <View style={styles.holeRow}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>Rounds</Text>
            <Text style={styles.boxContent}>87</Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>HCP</Text>
            <Text style={styles.boxContent}>10.2</Text>
          </View>
        </View>
        <View style={styles.holeRow}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>Birdies</Text>
            <Text style={styles.boxContent}>32</Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>Best Round</Text>
            <Text style={styles.boxContent}>74</Text>
          </View>
        </View>
        <View style={styles.holeRow}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>FWY</Text>
            <Text style={styles.boxContent}>32%</Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.boxHeader}>Avg Putts</Text>
            <Text style={styles.boxContent}>1.7</Text>
          </View>
        </View>
        <View style={[styles.styledButton, styles.playButton]}>
          <Text onPress={() => handlePress()} style={styles.buttonText}>Play Now</Text>
        </View>
      </View>
    </>
  );
}