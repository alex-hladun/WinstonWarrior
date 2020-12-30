import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Holes } from '../navigation/Stats/Holes'
import { Trends } from '../navigation/Stats/Trends'
import { Clubs } from '../navigation/Stats/Clubs'
import { Rounds } from '../navigation/Stats/Rounds'
import { AppContext } from '../context/AppContext'

const Tab = createMaterialTopTabNavigator();

export default function TabTwoScreen() {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const holeNum = appState.playState.hole_num

  return (
    <Tab.Navigator tabBarOptions={{
      scrollEnabled: true,
      tabStyle: { width: 100 },
    }}>
      {holeNum && <Tab.Screen name="Hole" component={Holes} />}
      <Tab.Screen name="Trends" component={Trends} />
      <Tab.Screen name="Rounds" component={Rounds} />
      <Tab.Screen name="Distances" component={Clubs} />
    </Tab.Navigator>
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
