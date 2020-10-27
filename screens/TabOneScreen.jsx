import * as React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import Hole from '../components/Hole'
import { Text, View } from '../components/Themed';
import { AppContext } from '../context/AppContext'
import NavigationPlay from '../navigation/PlayHome'
import { PlayProvider } from '../context/PlayContext'
import { createWinston, setUpDB, removeDB, registerUser, getClubs, createClubs, getScore } from '../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';

export default function TabOneScreen() {
  const appContext = React.useContext(AppContext)
  const contextState = appContext.value.state
  // console.log('context in TabOneScreen', context)
  const [existingRound, setExistingRound] = React.useState(false)
  const [initialHole, setInitialHole] = React.useState(1)


  React.useEffect(() => {
    console.log('resetting DB SHOULD ONLY RUN ONCE')
    removeDB()
    setUpDB()
    createWinston()
    registerUser('Alex')
    createClubs()

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
              { text: "Yes", 
              onPress: () => {
                appContext.dispatch({
                  type: 'set_round_id',
                  data: JSON.parse(roundID) 
                })

                setHole()
              } }
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        // No previus round
      }
    }

    const getAllClubs = async() => {
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

  const setHole = async() => {
    // Also put scores into state
    const holeNum = await AsyncStorage.getItem('holeNum')
    const holeNumDig = JSON.parse(holeNum)
    console.log('Setting SAVED hole to ', holeNumDig)
    setInitialHole(holeNumDig)
    appContext.value.setHole(holeNumDig)

    const p2roundID = await AsyncStorage.getItem('u2roundid')
    if(p2roundID) {
      const p2Score = await getScore(p2roundID)
      console.log(`p2 score: ${JSON.stringify(p2Score.rows._array)}`)
    }


  }

  React.useEffect(() => {
    // Check for existing round
    // console.log('contextstate', contextState)
    if (contextState.round_id && contextState.hole_num) {
      setExistingRound(true)
    } else {
    }
  }, [contextState])

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

    // const { latitude , longitude } = location.coords
    // getGeocodeAsync({latitude, longitude})

  };

  React.useEffect(() => {
    getLocationAsync()

  }, [locationUpdate])

  return (
    <PlayProvider>
      {existingRound ?
        <Hole location={state.location} initialHole={initialHole} />
        :
        <NavigationPlay />}
    </PlayProvider>
  );
}

