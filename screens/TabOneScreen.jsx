import * as React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import Hole from '../components/Hole'
import { Text, View } from '../components/Themed';
import { AppContext } from '../context/AppContext'
import NavigationPlay from '../navigation/PlayHome'
import { PlayContext } from '../context/PlayContext'
import { createWinston, setUpDB, testDB, removeDB, registerUser, getClubs, createClubs, getScore } from '../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';

export default function TabOneScreen() {
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  const contextState = appContext.value.state
  // console.log('context in TabOneScreen', context)
  const [existingRound, setExistingRound] = React.useState(false)
  const [initialHole, setInitialHole] = React.useState(1)


  React.useEffect(() => {
    console.log('resetting DB SHOULD ONLY RUN ONCE')

    let reset = false;
    if (reset) {
      removeDB()
      setUpDB()
      createWinston()
      registerUser('Alex')
      createClubs()
      // testDB()
    // } else {

    }

    let roundID

    const checkExisting = async () => {
      console.log('checking existing round')
      try {
        roundID = await AsyncStorage.getItem('roundID')
        if (roundID) {
          Alert.alert(
            "Existing Round",
            "Would you like to return to your game?",
            [
              {
                text: "No",
                onPress: () => console.log('NOT loading existing round'),
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: () => {

                  appContext.dispatch({
                    type: 'set_round_id',
                    data: JSON.parse(roundID)
                  })

                  setHole()
                  checkAndRestoreScores()
                }
              }
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        // No previus round
      }
    }

    const getAllClubs = async () => {
      const clubs = await getClubs()
      appContext.dispatch({
        type: 'set_club_list',
        data: clubs
      })
      console.log('clubs set')
    }

    checkExisting()
    getAllClubs()
  }, [])

  const setHole = async () => {
    // Also put scores into state
    const holeNum = await AsyncStorage.getItem('holeNum')
    const holeNumDig = JSON.parse(holeNum)
    console.log('Setting SAVED hole to ', holeNumDig)
    setInitialHole(holeNumDig)
    appContext.value.setHole(holeNumDig)

    appContext.dispatch({
      type: 'set_view_mode',
      data: 'play'
    })
  }

  const checkAndRestoreScores = async () => {
    // console.log('playcontext', playContext)
    const p1roundID = await AsyncStorage.getItem('roundID')
    const p2roundID = await AsyncStorage.getItem('u2roundid')
    const p3roundID = await AsyncStorage.getItem('u3roundid')
    const p4roundID = await AsyncStorage.getItem('u4roundid')
    console.log('p2 round iD; ', p2roundID)
    const p1Score = await getScore(JSON.parse(p1roundID))

    console.log('p1 score returned should be array', p1Score)

    let scoreObj = {}
    for (const score of p1Score) {
      console.log(`p1 score ${score}`)
      scoreObj[score.hole_num] = score.total_shots
    }
    playContext.dispatch({
      type: 'restore_p1_score',
      data: scoreObj
    })

// TODO: this can be refactored in a loop
    if (p2roundID) {
      const p2name = await AsyncStorage.getItem('u2name')
      let scoreObj2 = {}
      const p2Score = await getScore(JSON.parse(p2roundID))
      for (const score of p2Score) {
        console.log(score)
        scoreObj2[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p2_score',
        data: scoreObj2,
        name: p2name
      })

      appContext.dispatch({
        type: 'set_user_2_name',
        data: p2name
      })
    }
    if (p3roundID) {
      const p3name = await AsyncStorage.getItem('u3name')
      let scoreObj3 = {}
      console.log('RESTORING P3 SCORE')
      const p3Score = await getScore(JSON.parse(p3roundID))
      for (const score of p3Score) {
        console.log(score)
        scoreObj3[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p3_score',
        data: scoreObj3,
        name: p3name
      })

      appContext.dispatch({
        type: 'set_user_3_name',
        data: p3name
      })
    }
    if (p4roundID) {
      const p4name = await AsyncStorage.getItem('u4name')
      let scoreObj4 = {}
      const p4Score = await getScore(JSON.parse(p4roundID))
      for (const score of p4Score) {
        console.log(score)
        scoreObj4[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p4_score',
        data: scoreObj4,
        name: p4name
      })

      appContext.dispatch({
        type: 'set_user_4_name',
        data: p4name
      })
    }
  }

  const [state, setState] = React.useState({
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    },
    geocode: null,
    errorMessage: "",
    hole: 1
  })

  let locationUpdate;

  let location;
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setState({
        ...state, errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1.0,
      timeInterval: 1000
    }, (loc) => {
      setState({ ...state, location: { latitudeDelta: 0.05, longitudeDelta: 0.05, latitude: loc.coords.latitude, longitude: loc.coords.longitude } });
    })
  };

  React.useEffect(() => {
    getLocationAsync()

  }, [locationUpdate])

  return (
    contextState.viewMode === 'play' ?
      <Hole location={state.location} initialHole={initialHole} />
      :
      <NavigationPlay />
  );
}

