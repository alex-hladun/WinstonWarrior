import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import { Login } from "./Login";
import { resetDatabase, SignUp } from "./SignUp";
import { AppContext } from "../context/AppContext";
import { Auth } from "aws-amplify";
import { checkExistingDb } from "../db/checkExistingDb";
import { registerUser } from "../db/dbSetup";
import {
  addVersionColumn,
  checkIfVersionPatchApplied
} from "../db/addVersionColumn";
import { testSqlStatement } from "../db/testSqlStatement";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function SocialNavigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const context = React.useContext(AppContext);

  const checkLogin = async () => {
    try {
      const authedUser = await Auth.currentAuthenticatedUser();
      // console.log(authedUser.signInUserSession.idToken.jwtToken); // this means that you've logged in before with valid user/pass.
      const existingDb = await checkExistingDb();
      if (!existingDb) {
        await resetDatabase();
        registerUser(authedUser.username);
      }
      // testSqlStatement();

      const versionPatchApplied = await checkIfVersionPatchApplied();
      if (!versionPatchApplied) {
        await addVersionColumn();
      }

      context.dispatch({
        type: "authentication_done",
        data: authedUser.username,
        token: authedUser.signInUserSession.idToken.jwtToken
      });
    } catch (err) {
      console.log("err signing in");
      console.log(err); // this means there is no currently authenticated user
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, [Auth]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTransparent: true }}
    >
      {!context.value.state.appState.logged_in ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitle: "",
              headerTransparent: true
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerTitle: "" }}
          />
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
