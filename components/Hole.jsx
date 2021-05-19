import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Modal
} from "react-native";
import styles from "../assets/styles/HoleStyles.js";
import holeListStyles from "../assets/styles/HoleSummaryStyles";
import { Text, View } from "./Themed";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import FlagSymbol from "../assets/svg/FlagSymbol";
import CheckSymbol from "../assets/svg/CheckSymbol";
import XSymbol from "../assets/svg/XSymbol";
import LeftSymbol from "../assets/svg/LeftSymbol";
import RightSymbol from "../assets/svg/RightSymbol";
import TargetSymbol from "../assets/svg/TargetSymbol";
import HoleList from "./HoleList";
import Score from "./Score.jsx";
import ScoreCard from "./ScoreCard";
import RoundSummary from "./RoundSummary";
import ShotTrack from "./ShotTrack";
import { AppContext } from "../context/AppContext";
import { Theme } from "../assets/styles/Theme.js";
import GameIndicator from "../components/GameIndicator";

export default function Hole({ location, initialHole = 1 }) {
  // Loads all courseInfo into AppContext
  const appContext = React.useContext(AppContext);
  const holeInfo = appContext.value.state.playState.holeInfo;
  const holeNum = appContext.value.state.playState.hole_num;
  const [camera, setCamera] = useState(holeInfo[holeNum].camera);
  const [distanceMarker, setDistanceMarker] = useState({
    latitude: undefined,
    longitude: undefined
  });
  const [holeView, setHoleView] = useState(false);
  const [scoreView, setScoreView] = useState(false);
  const [endRoundView, setEndRouondView] = useState(false);
  const [shotTrackView, setShotTrackView] = useState(false);
  const [scoreCardView, setScoreCardView] = useState(false);
  const [startTrack, setStartTrack] = useState({
    latitude: undefined,
    longitude: undefined
  });
  const [tracking, setTracking] = useState(false);
  const [trackDistance, setTrackDistance] = useState(null);
  const mapRef = useRef(null);
  const shotTargetRef = useRef(null);
  const holeTargetRef = useRef(null);
  const trackAnim = useRef(new Animated.Value(0.85)).current;

  const measure = (lat1, lon1, lat2, lon2) => {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000 * 1.09361; // yards
  };

  const handleTracking = () => {
    if (!tracking) {
      setStartTrack(location);
      setTracking(true);
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
        ])
      ).start();
    } else {
      const distance = measure(
        startTrack.latitude,
        startTrack.longitude,
        location.latitude,
        location.longitude
      ).toFixed(1);
      setTrackDistance(distance);
      setShotTrackView(true);
      trackAnim.stopAnimation();
      Animated.timing(trackAnim, {
        toValue: 0.85,
        duration: 1,
        useNativeDriver: true
      }).start();

      setTracking(false);
    }
  };

  const distanceToShotTarget = useCallback(() => {
    if (distanceMarker.latitude) {
      return measure(
        location.latitude,
        location.longitude,
        distanceMarker.latitude,
        distanceMarker.longitude
      ).toFixed(0);
    } else {
      return null;
    }
  }, [location, distanceMarker]);

  const distanceToFlagTarget = useCallback(() => {
    if (distanceMarker.latitude) {
      return measure(
        holeInfo[holeNum].pinCoords.latitude,
        holeInfo[holeNum].pinCoords.longitude,
        distanceMarker.latitude,
        distanceMarker.longitude
      ).toFixed(0);
    } else {
      return null;
    }
  }, [holeNum, distanceMarker]);

  const handleHoleChange = (delta) => {
    setHoleView(!holeView);
  };

  const handleTrackViewClose = () => {
    setShotTrackView(!shotTrackView);
  };

  const handleScoreEnter = () => {
    setScoreView(!scoreView);
  };

  const handleScoreCardEnter = () => {
    setScoreCardView(!scoreCardView);
  };

  const handleRoundSummary = () => {
    if (holeView) {
      setHoleView(false);
    }
    setEndRouondView(!endRoundView);
  };

  const setHole = async (num, hideModal = true) => {
    if (holeView) {
      setHoleView(false);
    }

    if (scoreView && hideModal) {
      setScoreView(false);
    }
    if (num !== 19) {
      mapRef.current.animateCamera(holeInfo[num].camera);
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      });

      appContext.value.setHole(num, holeInfo[num].id);
    } else {
      handleRoundSummary();
    }
  };

  const handleHoleInc = () => {
    if (holeNum !== 18) {
      appContext.value.setHole(holeNum + 1, holeInfo[holeNum + 1].id);
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      });
      mapRef.current.animateCamera(holeInfo[holeNum + 1].camera);
    } else {
      handleRoundSummary();
    }
  };
  const handleHoleDec = () => {
    if (holeNum !== 1) {
      appContext.value.setHole(holeNum - 1, holeInfo[holeNum - 1].id);
      setDistanceMarker({
        latitude: undefined,
        longitude: undefined
      });
      mapRef.current.animateCamera(holeInfo[holeNum - 1].camera);
    } else {
      appContext.value.setHole(1, holeInfo[1].id);
      mapRef.current.animateCamera(holeInfo[1].camera);
    }
  };

  const handleHoleReset = () => {
    mapRef.current.animateCamera(holeInfo[holeNum].camera);
    setDistanceMarker({
      latitude: undefined,
      longitude: undefined
    });
  };

  const handleRegionChange = async (reg) => {
    let coords = await mapRef.current.getCamera();
    // console.log(
    //   "🚀 ~ file: Hole.jsx ~ line 217 ~ handleRegionChange ~ coords",
    //   coords
    // );
    coords = { ...coords, altitude: 1400 };
  };

  const handleMapShortPress = async (event) => {
    const coords = event.nativeEvent.coordinate;
    // console.log(
    //   "🚀 ~ file: Hole.jsx ~ line 226 ~ handleMapShortPress ~ coords",
    //   coords
    // );

    await setDistanceMarker(coords);
  };

  const distanceToFlag = measure(
    holeInfo[holeNum].pinCoords.latitude,
    holeInfo[holeNum].pinCoords.longitude,
    location.latitude,
    location.longitude
  );
  return (
    <>
      <View style={styles.holeContainer}>
        <Modal animationType="slide" transparent={true} visible={holeView}>
          <View style={holeListStyles.container}>
            <TouchableOpacity onPress={() => handleHoleChange()}>
              <View style={holeListStyles.headerContainer}>
                <Text
                  style={holeListStyles.header}
                  onPress={() => handleHoleChange()}
                >
                  <XSymbol />
                </Text>
              </View>
            </TouchableOpacity>
            <HoleList
              setHole={setHole}
              handleRoundSummary={handleRoundSummary}
              currentHole={holeNum}
            />
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={shotTrackView}>
          <ShotTrack
            distance={trackDistance}
            handleTrackViewClose={() => handleTrackViewClose()}
          />
        </Modal>

        <Modal animationType="slide" transparent={true} visible={scoreView}>
          <Score
            holeNum={holeNum}
            setHole={setHole}
            handleScoreEnter={handleScoreEnter}
            handleHoleInc={handleHoleInc}
            handleHoleDec={handleHoleDec}
          />
        </Modal>

        <Modal animationType="slide" transparent={true} visible={scoreCardView}>
          <ScoreCard
            holeNum={holeNum}
            handleScoreCardEnter={handleScoreCardEnter}
          />
        </Modal>

        <Modal animationType="slide" transparent={true} visible={endRoundView}>
          <RoundSummary handleRoundSummary={handleRoundSummary} />
        </Modal>

        <View style={styles.header}>
          <View style={styles.scoreBox}>
            <TouchableOpacity onPress={() => handleHoleChange(1)}>
              <Text style={styles.holeTitle}>{holeNum}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {distanceToFlag > 999 ? "999" : distanceToFlag.toFixed(0)} yds
            </Text>
            <TouchableOpacity onPress={() => handleScoreCardEnter()}>
              <Text style={styles.parTitle}>Par {holeInfo[holeNum].par}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {camera.altitude && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
            mapType={"satellite"}
            initialCamera={camera ? camera : null}
            onRegionChangeComplete={(event) => handleRegionChange(event)}
            onPress={(event) => handleMapShortPress(event)}
            onMarkerDrag={(event) => handleMapShortPress(event)}
          >
            <Marker
              coordinate={location}
              title={"User Loc"}
              description={"A full description"}
              pinColor={"#FFFFFF"}
              style={styles.customMarker}
            >
              <Image
                style={styles.markerImage}
                source={require("../assets/images/circle.png")}
              />
            </Marker>

            <Marker
              style={styles.customMarker}
              ref={holeTargetRef}
              coordinate={holeInfo[holeNum].pinCoords}
            >
              {distanceMarker.latitude && (
                <View style={styles.distanceCallout}>
                  <Text>{distanceToFlagTarget()} yds</Text>
                </View>
              )}
              <Image
                style={styles.markerImage}
                source={require("../assets/images/pngegg.png")}
              />
            </Marker>
            {distanceMarker.latitude && (
              <Marker
                ref={shotTargetRef}
                coordinate={distanceMarker}
                style={styles.customMarker}
              >
                <View style={styles.distanceCallout}>
                  <Text>{distanceToShotTarget()} yds</Text>
                </View>
              </Marker>
            )}
            {distanceMarker.latitude && (
              <Polyline
                coordinates={[location, distanceMarker]}
                strokeColor={"#FFFFFF"}
                strokeWidth={2}
                geodesic={true}
              />
            )}
            {distanceMarker.latitude && (
              <Polyline
                coordinates={[holeInfo[holeNum].pinCoords, distanceMarker]}
                strokeColor={"#FFFFFF"}
                strokeWidth={2}
                lineDashPattern={[4, 3]}
              />
            )}
          </MapView>
        )}
        <View style={styles.floatingContainer}>
          <TouchableOpacity onPress={() => handleHoleDec()}>
            <View style={[styles.floatingHoleMarker, styles.move]}>
              <Text>
                <LeftSymbol />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleHoleReset()}>
            <View style={[styles.floatingHoleMarker, styles.flag]}>
              <Text>
                <FlagSymbol />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleScoreEnter()}>
            <View style={[styles.floatingHoleMarker, styles.check]}>
              <Text>
                <CheckSymbol style={styles.icon} color={Theme.iconStroke} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => handleTracking()}>
            <Animated.View
              style={[
                styles.floatingHoleMarker,
                styles.target,
                { opacity: trackAnim }
              ]}
            >
              <Text>
                <TargetSymbol />
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleHoleInc()}>
            <View style={[styles.floatingHoleMarker, styles.move]}>
              <Text>
                <RightSymbol />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <GameIndicator mode="Match Play" timeout={2000} />
    </>
  );
}
