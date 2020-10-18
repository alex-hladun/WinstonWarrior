import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Image, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/HoleStyles.js'
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import FlagSymbol from '../assets/svg/FlagSymbol'
import CheckSymbol from '../assets/svg/CheckSymbol'
import LeftSymbol from '../assets/svg/LeftSymbol'
import RightSymbol from '../assets/svg/RightSymbol'
import TargetSymbol from '../assets/svg/TargetSymbol'
import LocationSymbol from '../assets/svg/LocationSymbol'
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

  const handleHoleInc = () => {
    if (holeNum !== 19) {
      setHoleNum(holeNum + 1)
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      })
      mapRef.current.animateCamera(holeInfo[holeNum + 1].camera)
    } else {
      setHoleNum(1)
      mapRef.current.animateCamera(holeInfo[1].camera)
    }
  }
  const handleHoleDec = () => {
    if (holeNum !== 1) {
      setHoleNum(holeNum - 1)
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      })
      mapRef.current.animateCamera(holeInfo[holeNum - 1].camera)
    } else {
      setHoleNum(6)
      mapRef.current.animateCamera(holeInfo[6].camera)
    }
  }

  const handleHoleReset = () => {
    console.log('handle hole reset')
    mapRef.current.animateCamera(holeInfo[holeNum].camera)
    setDistanceMarker({
      latitude: undefined,
      longitude: undefined
    })
    holeTargetRef.current.hideCallout()

  }
  const handleScoreEnter = () => {
    console.log('handle score enter')
    mapRef.current.animateCamera(holeInfo[holeNum].camera)
  }

  // The actual box of the map (NOT oc)
  const handleRegionChange = async(reg) => {
    // console.log('region change')
    const coords = await mapRef.current.getCamera()
    console.log(coords)
    // setRegion(reg);
  }

  const handleShotDiff = (diff) => {
    setShotDiff(shotDiff + diff)
  }

  const handleMapLongPress = () => {
    console.log('map long press')
  }

  const handleMapShortPress = async (event) => {
    console.log('map short press', event.nativeEvent.coordinate)
    const coords = event.nativeEvent.coordinate
    await setDistanceMarker(coords)
  }

  return (
    <View style={styles.holeContainer}>
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => handleHoleChange(1)}>Hole {holeNum}</Text>
        <Text style={styles.title}>Par {holeInfo[holeNum].par}</Text>
        <Text style={styles.title}>{measure(holeInfo[holeNum].pinCoords.latitude, holeInfo[holeNum].pinCoords.longitude, location.latitude, location.longitude).toFixed(0)} yds</Text>
      </View>


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
        onRegionChangeComplete={(event) => handleRegionChange(event)}
        onLongPress={() => handleMapLongPress()}
        onPress={(event) => handleMapShortPress(event)}
      >
        <Marker
          coordinate={location}
          title={'Alex Loc'}
          description={'A full description'}
          pinColor={'#FFFFFF'}
          style={styles.customMarker}>



          <Image style={styles.markerImage} source={require('../assets/images/circle.png')} />

        </Marker>

        <Marker
          style={styles.customMarker}
          ref={holeTargetRef}
          coordinate={holeInfo[holeNum].pinCoords}
        >
          {distanceMarker.latitude &&
            <View style={styles.distanceCallout} >
              <Text>
                {distanceToFlagTarget()} yds
             </Text>

            </View>
          }
          <Image style={styles.markerImage} source={require('../assets/images/pngegg.png')} />
        </Marker>
        {distanceMarker.latitude &&
          <Marker
            ref={shotTargetRef}
            coordinate={distanceMarker}
            style={styles.customMarker}>
            <View style={styles.distanceCallout} >
              <Text>
                {distanceToShotTarget()} yds
                </Text>
            </View>
          </Marker>
        }
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

      <View style={styles.floatingContainer}>
        <View style={[styles.floatingHoleMarker, styles.move]}>
          <TouchableHighlight onPress={() => handleHoleDec()}>
            <Text >
              <LeftSymbol />
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.floatingHoleMarker, styles.flag]} >
          <TouchableHighlight onPress={() => handleHoleReset()}>
            <Text >
              <FlagSymbol />
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.floatingHoleMarker, styles.check]}>
          <TouchableHighlight>
            <Text onPress={() => handleHoleReset()}>
              <CheckSymbol />
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.floatingHoleMarker, styles.target]}>
          <TouchableHighlight>
            <Text onPress={(event) => handleRegionChange(event)}>
              <TargetSymbol />
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.floatingHoleMarker, styles.move]}>
          <TouchableHighlight onPress={() => handleHoleInc()}>
            <Text >
              <RightSymbol />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}


