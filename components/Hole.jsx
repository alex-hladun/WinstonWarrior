import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../assets/styles/HoleStyles.js'
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import MapView, { Marker } from 'react-native-maps';
// interface Location {
//   latitude: number,
//   longitude: number
// }

// interface myState {
//   location: Location
// }

export default function Hole({ holeNum, location }) {

  const [region, setRegion] = useState({
    latitude: 51.040053,
    longitude: -114.072797,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  })

  // The actual box of the map (NOT location)
  const handleRegionChange = (reg) => {
    setRegion(reg);
  }

  return (
    <View style={styles.holeContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>  Hole {holeNum}</Text>
        <Text style={styles.title}>269 Yards</Text>
        <Text>
          Sample{location ? `${location.latitude}, ${location.longitude}` : ""}
        </Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        This is hole {1}
      </Text>

      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        mapType={'satellite'}
        initialRegion={
        region
        }
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker
          coordinate={location}
          title={'Alex Loc'}
          description={'A full description'}
        />
      </MapView>
      <View style={styles.floating}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Shots: {1}
        </Text>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

