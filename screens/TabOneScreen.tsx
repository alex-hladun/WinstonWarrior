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
  errorMessage: string
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
    errorMessage: ""
  })

  // const getGeocodeAsync= async (location) => {
  //   let geocode = await Location.reverseGeocodeAsync(location)
  //   setState({...state, geocode})
  // }
  let locationUpdate;


  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setState({...state, errorMessage:'Permission to access location was denied'
      });
    }

    let location = await Location.watchPositionAsync({
      accuracy:Location.Accuracy.Highest, 
      distanceInterval: 0.1
    }, (loc) => {

      setState({ ...state, location: {latitudeDelta: 0.05, longitudeDelta: 0.05, latitude: loc.coords.latitude, longitude: loc.coords.longitude}});

    })
    
    // const { latitude , longitude } = location.coords
    // getGeocodeAsync({latitude, longitude})

  };

  React.useEffect(() => {
    getLocationAsync()
  }, [])

  return (
    <View style={styles.container}>
      <Hole holeNum={1} location={state.location} />
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    // height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
