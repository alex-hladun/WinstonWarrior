import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import Hole from '../components/Hole'
import { Text, View } from '../components/Themed';

interface Location {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}
interface myState {
  location: Location,
  geocode: any,
  errorMessage: string,
  hole: number
}

export default function TabOneScreen() {

  const [state, setState] = React.useState<myState>({
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

  // const getGeocodeAsync= async (location) => {
  //   let geocode = await Location.reverseGeocodeAsync(location)
  //   setState({...state, geocode})
  // }
  let locationUpdate;

  let location;
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setState({...state, errorMessage:'Permission to access location was denied'
      });
    }

    let location = await Location.watchPositionAsync({
      accuracy:Location.Accuracy.Highest, 
      distanceInterval: 1.0,
      timeInterval: 1000
    }, (loc) => {

      setState({ ...state, location: {latitudeDelta: 0.05, longitudeDelta: 0.05, latitude: loc.coords.latitude, longitude: loc.coords.longitude}});

    })
    
    // const { latitude , longitude } = location.coords
    // getGeocodeAsync({latitude, longitude})

  };

 

  React.useEffect(() => {
    getLocationAsync()

  }, [locationUpdate])

  return (
      <Hole location={state.location}/>
  );
}

