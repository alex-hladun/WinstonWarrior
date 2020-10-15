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


const holeInfo = {
  1: {
    par: 4,
    distance: 420,
    pinCoords: {
      latitude: 51.043448,
      longitude: -114.072521
    },
    region: {
      latitude: 51.040053,
      longitude: -114.072797,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
  },
  2: {
    par: 4,
    distance: 420,
    pinCoords: {
      latitude: 51.078795,
      longitude: -114.046645
    },
    region: {
      latitude: 51.077372,
      longitude: -114.045964,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
  }
}
export default function Hole({ location }) {
  const [shotDiff, setShotDiff] = useState(3)
  const [holeNum, setHoleNum] = useState(1)
  const [region, setRegion] = useState(holeInfo[holeNum].region)

  const handleHoleChange = (delta) => {
    if (holeNum === 1) {
      setHoleNum(holeNum + delta)
    } else {
      setHoleNum(1)
    }
  }

  // The actual box of the map (NOT oc)
  const handleRegionChange = (reg) => {
    setRegion(reg);
  }

  const handleShotDiff = (diff) => {
    setShotDiff(shotDiff + diff)
  }

  const measure = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000 * 1.09361; // meters
  }

  return (
    <View style={styles.holeContainer}>
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => handleHoleChange(1)}>Hole {holeNum}</Text>
        <Text style={styles.title}>Par {holeInfo[holeNum].par}</Text>
        <Text style={styles.title}>{measure(holeInfo[holeNum].pinCoords.latitude, holeInfo[holeNum].pinCoords.longitude, location.latitude, location.longitude).toFixed(1)} yds</Text>
        {/* <Text>
          Sample{location ? `${location.latitude}, ${location.longitude}` : ""}
        </Text> */}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


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
          pinColor={'white'}
        />
        <Marker
          coordinate={holeInfo[holeNum].pinCoords}
          pinColor={'yellow'}
        />
      </MapView>
      <View style={styles.floating}>
        <Text style={styles.shotDiff}
          onPress={() => handleShotDiff(-1)}>
          -
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Shots: {shotDiff}
        </Text>
        <Text style={styles.shotDiff}
          onPress={() => handleShotDiff(1)}>
          +
        </Text>
      </View>
    </View>
  );
}


