import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/HoleStyles.js'
import holeListStyles from '../assets/styles/HoleSummaryStyles'
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import FlagSymbol from '../assets/svg/FlagSymbol'
import CheckSymbol from '../assets/svg/CheckSymbol'
import LeftSymbol from '../assets/svg/LeftSymbol'
import RightSymbol from '../assets/svg/RightSymbol'
import TargetSymbol from '../assets/svg/TargetSymbol'
import LocationSymbol from '../assets/svg/LocationSymbol'
import holeInfo from '../assets/holeInfo'
import HoleList from './HoleList'
import Score from './Score.jsx';
import ScoreCard from './ScoreCard'
import ShotTrack from './ShotTrack'
import { AppContext } from '../context/AppContext'


const { width } = Dimensions.get('window');

export default function Hole({ location, initialHole = 1 }) {
  const appContext = React.useContext(AppContext)
  const [shotDiff, setShotDiff] = useState(3)
  const [holeNum, setHoleNum] = useState(initialHole)

  // const holeNum = appContext.value.state.hole_num
  const [camera, setCamera] = useState(holeInfo[holeNum].camera)
  const [distanceMarker, setDistanceMarker] = useState({
    latitude: undefined,
    longitude: undefined
  })
  const [holeView, setHoleView] = useState(false)
  const [scoreView, setScoreView] = useState(false)
  const [shotTrackView, setShotTrackView] = useState(false)
  const [scoreCardView, setScoreCardView] = useState(false)
  const [startTrack, setStartTrack] = useState({
    latitude: undefined,
    longitude: undefined
  })
  const [tracking, setTracking] = useState(false)
  const [trackDistance, setTrackDistance] = useState(null)
  const mapRef = useRef(null)
  const shotTargetRef = useRef(null)
  const holeTargetRef = useRef(null)
  const trackAnim = useRef(new Animated.Value(0.85)).current


  useEffect(() => {
  console.log('appcontext', appContext)
  })
  const measure = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000 * 1.09361; // yards
  }

  const handleTracking = () => {
    if (!tracking) {
      setStartTrack(location)
      setTracking(true)
      console.log('Starting tracking')
      Animated.loop(
        Animated.sequence([
          Animated.timing(trackAnim, {
            toValue: 0.1,
            duration: 550,
            useNativeDriver: true
          }),
          Animated.timing(trackAnim, {
            toValue: 0.85,
            duration: 550,
            useNativeDriver: true


          })
        ])).start()
    } else {
      const distance = measure(startTrack.latitude, startTrack.longitude, location.latitude, location.longitude).toFixed(1);
      console.log('Measured a distance of ', distance, 'yds')
      setTrackDistance(distance)
      setShotTrackView(true)
      trackAnim.stopAnimation()
      Animated.timing(trackAnim, {
        toValue: 0.85,
        duration: 1,
        useNativeDriver: true
      }).start()

      setTracking(false)
    }
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
    setHoleView(!holeView)
  }

  const handleTrackViewClose = () => {
    setShotTrackView(!shotTrackView)
  }

  const handleScoreEnter = () => {
    setScoreView(!scoreView)
  }

  const handleScoreCardEnter = () => {
    console.log('handle score enter')
    setScoreCardView(!scoreCardView)
  }

  const setHole = async (num) => {
    mapRef.current.animateCamera(holeInfo[num].camera)
    console.log(`Setting hole to ${num}`)
    await setHoleNum(num)
    setDistanceMarker({
      latitude: undefined,
      longitude: undefined
    })

    if (holeView) {
      setHoleView(false)
    }

    if (scoreView) {
      setScoreView(false)
    }
    // CHANGE LATER

    appContext.value.setHole(num)
    
    // //////
    appContext.dispatch({
      type: 'set_hole_id',
      data: num
    })
  }

  const handleHoleInc = () => {
    if (holeNum !== 19) {
      appContext.dispatch({
        type: 'set_hole_id',
        data: holeNum + 1
      })
      appContext.value.setHole(holeNum + 1)
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
      appContext.dispatch({
        type: 'set_hole_id',
        data: holeNum - 1
      })
      appContext.value.setHole(holeNum - 1)
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
  }

  const handleRegionChange = async (reg) => {
    // const coords = await mapRef.current.getCamera()
    // console.log(coords)
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
      <Modal animationType="slide" transparent={true} visible={holeView}>
        <View style={holeListStyles.container}>
          <Text style={holeListStyles.header} onPress={() => handleHoleChange()}>
            X
      </Text>
          <HoleList setHole={setHole} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={shotTrackView}>
        <View style={holeListStyles.scoreContainer}>
          <Text style={holeListStyles.header} onPress={() => handleTrackViewClose()}>
            X
      </Text>
          <ShotTrack distance={trackDistance} handleTrackViewClose={() => handleTrackViewClose()} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={scoreView}>
        <View style={holeListStyles.scoreContainer}>
          <Text style={holeListStyles.header} onPress={() => handleScoreEnter()}>
            X
      </Text>
          <Score holeNum={holeNum} setHole={setHole} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={scoreCardView}>
        <View style={holeListStyles.scoreContainer}>
          <Text style={holeListStyles.header} onPress={() => handleScoreCardEnter()}>
            X
      </Text>
          <ScoreCard holeNum={holeNum} />
        </View>
      </Modal>


      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleHoleChange(1)}>
          <Text style={styles.title} >Hole {holeNum}</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleScoreCardEnter()}>
          <Text style={styles.title} >Par {holeInfo[holeNum].par}</Text>
        </TouchableOpacity>
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
        onMarkerDrag={(event) => handleMapShortPress(event)}

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
        <TouchableOpacity onPress={() => handleHoleDec()}>
          <View style={[styles.floatingHoleMarker, styles.move]}>
            <Text >
              <LeftSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHoleReset()}>
          <View style={[styles.floatingHoleMarker, styles.flag]} >
            <Text >
              <FlagSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleScoreEnter()}>
          <View style={[styles.floatingHoleMarker, styles.check]}>
            <Text >
              <CheckSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={(event) => handleTracking()}>
          <Animated.View style={[styles.floatingHoleMarker, styles.target, { opacity: trackAnim }]} >
            {/* <View > */}
            <Text >
              <TargetSymbol />
            </Text>
          </Animated.View>
        </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity onPress={() => handleHoleInc()}>
          <View style={[styles.floatingHoleMarker, styles.move]}>
            <Text >
              <RightSymbol />
            </Text>
          </View>
        </TouchableOpacity >
      </View>
    </View>
  );
}


