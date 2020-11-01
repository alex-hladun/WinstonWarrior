import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Holes } from '../navigation/Stats/Holes'
import { Trends } from '../navigation/Stats/Trends'
import { Clubs } from '../navigation/Stats/Clubs'
import { Rounds } from '../navigation/Stats/Rounds'
import { CourseSelect } from '../navigation/PlayHome/CourseSelect'
import { AppContext } from '../context/AppContext'

const Tab = createMaterialTopTabNavigator();

export default function TabTwoScreen() {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const holeNum = appState.hole_num

  return (
    <Tab.Navigator>
    {holeNum && <Tab.Screen name="Hole" component={Holes} />}
    <Tab.Screen name="Trends" component={Trends} />

    <Tab.Screen name="Clubs" component={Clubs} />
    <Tab.Screen name="Rounds" component={Rounds} />
  </Tab.Navigator>

    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab Two</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="/screens/TabTwoScreen.js" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
