import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import { RootStackParamList } from '../types';
// import LinkingConfiguration from './LinkingConfiguration';
// import { AppContext } from '../context/AppContext'
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
import { Home } from './Home'
import { CourseSelect } from './CourseSelect'
import { PlayerAdd } from './PlayerAdd'

export default function NavigationPlay({ colorScheme }) {
  return (
    <NavigationContainer
    independent={true}
    >
      <PlayNavigator />
    </NavigationContainer>
  );
}

const PlayStack = createStackNavigator();

function PlayNavigator() {
  return (
    <PlayStack.Navigator screenOptions={{ headerShown: true, headerTransparent: true }}>
      <PlayStack.Screen name="Home" component={Home} />
      <PlayStack.Screen name="Course Select" component={CourseSelect} />
      <PlayStack.Screen name="Add Players" component={PlayerAdd} />
    </PlayStack.Navigator>
  );
}
