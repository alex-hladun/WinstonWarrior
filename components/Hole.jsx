import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../assets/styles/HoleStyles.js'
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import FlagSymbol from '../assets/svg/FlagSymbol'
import holeInfo from '../assets/holeInfo'


export default function Hole({ location }) {
  const [shotDiff, setShotDiff] = useState(3)
  const [holeNum, setHoleNum] = useState(1)
  const [camera, setCamera] = useState(holeInfo[holeNum].camera)
  const [distanceMarker, setDistanceMarker] = useState({
    latitude: undefined,
    longitude: undefined
  })
  const mapRef = useRef(null)
  const shotTargetRef = useRef(null)
  const holeTargetRef = useRef(null)

  

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

  const distanceToShotTarget = useCallback(
    () => {
      if (distanceMarker.latitude) {
        return measure(location.latitude, location.longitude, distanceMarker.latitude, distanceMarker.longitude).toFixed(0);
      } else {
        return null
      }
    },
    [location, distanceMarker],
  );
  const distanceToFlagTarget = useCallback(
    () => {
      if (distanceMarker.latitude) {
        return measure(holeInfo[holeNum].pinCoords.latitude, holeInfo[holeNum].pinCoords.longitude, distanceMarker.latitude, distanceMarker.longitude).toFixed(0);
      } else {
        return null
      }
    },
    [holeNum, distanceMarker],
  );

  const handleHoleChange = (delta) => {
    console.log('changing hole')
    if (holeNum !== 4) {
      setHoleNum(holeNum + delta)
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      })
      mapRef.current.animateCamera(holeInfo[holeNum + delta].camera)
    } else {
      setHoleNum(1)
      mapRef.current.animateCamera(holeInfo[1].camera)
    }
  }

  const handleHoleReset = () => {
    console.log('handle hole reset')
    mapRef.current.animateCamera(holeInfo[holeNum].camera)
  }
  const handleScoreEnter = () => {
    console.log('handle score enter')
    mapRef.current.animateCamera(holeInfo[holeNum].camera)
  }

  // The actual box of the map (NOT oc)
  const handleRegionChange = (reg) => {
    // setRegion(reg);
  }

  const handleShotDiff = (diff) => {
    setShotDiff(shotDiff + diff)
  }

  const handleMapLongPress = () => {
    console.log('map long press')
  }

  const handleMapShortPress = async(event) => {
    console.log('map short press', event.nativeEvent.coordinate)
    const coords = event.nativeEvent.coordinate
    await setDistanceMarker(coords)
    // console.log('shot target ref', shotTargetRef.current.showCallout())
    // shotTargetRef.title = "Test"
    shotTargetRef.current.showCallout()

    // shotTargetRef.showCallout()


  }

 

  return (
    <View style={styles.holeContainer}>
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => handleHoleChange(1)}>Hole {holeNum}</Text>
        <Text style={styles.title}>Par {holeInfo[holeNum].par}</Text>
        <Text style={styles.title}>{measure(holeInfo[holeNum].pinCoords.latitude, holeInfo[holeNum].pinCoords.longitude, location.latitude, location.longitude).toFixed(0)} yds</Text>
        {/* <Text>
          Sample{location ? `${location.latitude}, ${location.longitude}` : ""}
        </Text> */}
      </View>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}


      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        mapType={'satellite'}
        initialCamera={
          camera
        }
        onRegionChangeComplete={handleRegionChange}
        onLongPress={() => handleMapLongPress()}
        onPress={(event) => handleMapShortPress(event)}
      >
        <Marker
          coordinate={location}
          title={'Alex Loc'}
          description={'A full description'}
          pinColor={'white'}
        />
        <Marker
          coordinate={holeInfo[holeNum].pinCoords}
          pinColor={'#f8ff3b'}
        />

        {distanceMarker.latitude &&
          <Marker
            ref={shotTargetRef}
            coordinate={distanceMarker}
            title={`${distanceToShotTarget()} yd`}
            pinColor={'red'}

          />}
          
        
         {distanceMarker.latitude &&
          <Polyline
            coordinates={[location, distanceMarker]}
            strokeColor={'#FFFFFF'}
            strokeWidth={2}
            geodesic={true}
          />
          
        }
         {distanceMarker.latitude &&
          <Polyline
            coordinates={[holeInfo[holeNum].pinCoords, distanceMarker]}
            strokeColor={'#FFFFFF'}
            strokeWidth={2}
            lineDashPattern={[4, 3]}
          />

        }

      </MapView>

      <View style={styles.floating}>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
          onPress={() => handleScoreEnter()}>
          Enter Score
        </Text>

      </View>
      <View style={styles.floatingHoleMarker}>
        <Text onPress={() => handleHoleReset()}>
          <FlagSymbol />
        </Text>
      </View>
    </View>
  );
}


