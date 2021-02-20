import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { AppContext } from "../context/AppContext";
import { Auth } from "aws-amplify";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
    // linking={LinkingConfiguration}
    // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const context = React.useContext(AppContext);

  // const [loggedIn, setLoggedIn] = React.useState(false)
  // const context = React.useContext(AppContext)
  // console.log('Context in index.tsx', context)
  React.useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const authedUser = await Auth.currentAuthenticatedUser();
      console.log(authedUser); // this means that you've logged in before with valid user/pass.
      console.log("AUTHENTICATED WITH COGNITO");
      // this.setState({ isLoggedIn: true })
    } catch (err) {
      console.log("Err login check"); // this means there is no currently authenticated user
      console.log(err); // this means there is no currently authenticated user
    }
  };

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const loginAsync = async () => {
  //     let userToken;

  //     try {
  //       // console.log('running asyncstorage')
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //   };

  //   loginAsync();
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
    >
      {!context.value.state.appState.logged_in ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
