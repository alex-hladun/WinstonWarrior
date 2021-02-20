import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// import { RootStackParamList } from '../types';
// import LinkingConfiguration from './LinkingConfiguration';
// import { AppContext } from '../context/AppContext'
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
import { Home } from "./Home";
import SocialPost from "./SocialPost";
import SocialHome from "./SocialHome";

export default function NavigationSocial({ colorScheme }) {
  return (
    <NavigationContainer independent={true}>
      <SocialNavigator />
    </NavigationContainer>
  );
}

// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR

const SocialStack = createStackNavigator();

function SocialNavigator() {
  return (
    <SocialStack.Navigator
      screenOptions={{ headerShown: true, headerTransparent: true }}
    >
      <SocialStack.Screen name="Winstagram" component={SocialHome} />
      <SocialStack.Screen name="Post" component={SocialPost} />
    </SocialStack.Navigator>
  );
}
