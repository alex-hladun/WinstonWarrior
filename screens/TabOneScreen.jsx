import * as React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import Hole from '../components/Hole'
import { Text, View } from '../components/Themed';
import { dbCall, existingGameAlert } from '../db/dbSetup'
import { AppContext } from '../context/AppContext'
import NavigationPlay from '../navigation/PlayHome'
import { PlayProvider } from '../context/PlayContext'
import { createWinston, setUpDB, removeDB, registerUser } from '../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';

export default function TabOneScreen() {
  const context = React.useContext(AppContext)
  const contextState = context.value.state
  // console.log('context in TabOneScreen', context)
  const [existingRound, setExistingRound] = React.useState(false)
  const [initialHole, setInitialHole] = React.useState(1)


  React.useEffect(() => {
    console.log('resetting DB SHOULD ONLY RUN ONCE')
    removeDB()
    setUpDB()
    createWinston()
    registerUser('Alex')


    let roundID

    const checkExisting = async () => {
      console.log('checking existing round')
      try {
        roundID = await AsyncStorage.getItem('roundID')
        if (roundID) {
          Alert.alert(
            "Existing Round",
            "Would you like to delete and start fresh?",
            [
              {
                text: "No",
                onPress: () => {
                  context.dispatch({
                    type: 'set_round_id',
                    data: JSON.parse(roundID) 
                  })

                  setHole()
                },
                style: "cancel"
              },
              { text: "Yes", onPress: () => console.log('NOT loading existing round') }
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        // No previus round
      }
    }

    checkExisting()
  }, [])

  const setHole = async() => {
    const holeID = await AsyncStorage.getItem('holeNum')
    console.log('Setting saved hole to ', holeID)
    setInitialHole(JSON.parse(holeID))
  }

  React.useEffect(() => {
    // Check for existing round
    if (contextState.round_id) {
      // dbCall()
      console.log('checking for existing round - round found')

      setExistingRound(true)
    } else {
      console.log('checking for existing round - no round found')
    }
  }, [contextState.round_id])

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
        <Hole location={state.location} initialHole={1} />
        :
        <NavigationPlay />}
    </PlayProvider>
  );
}

