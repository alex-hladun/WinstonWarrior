import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, ColorSchemeName, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import LogoutSymbol from "../../assets/svg/LogoutSymbol";
// import { RootStackParamList } from '../types';
// import LinkingConfiguration from './LinkingConfiguration';
// import { AppContext } from '../context/AppContext'
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
import { Home } from "./Home";
import SocialPost from "../Social/SocialPost";
import { Auth } from "aws-amplify";
import { CourseSelect } from "./CourseSelect";
import { PlayerAdd } from "./PlayerAdd";
import { SignUp } from "../SignUp";
import { Login } from "../Login";
import { AppContext } from "../../context/AppContext";
export default function NavigationPlay({ colorScheme }) {
  return (
    <NavigationContainer independent={true}>
      <PlayNavigator />
    </NavigationContainer>
  );
}

const PlayStack = createStackNavigator();

function PlayNavigator() {
  const appContext = React.useContext(AppContext);
  return (
    <PlayStack.Navigator
      screenOptions={{ headerShown: true, headerTransparent: false }}
    >
      <PlayStack.Screen
        name="Winston Warrior"
        component={Home}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerRight: () => {
            return (
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Logout",
                        "Are you sure you want to logout??",
                        [
                          {
                            text: "No",
                            style: "cancel"
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              appContext.dispatch({
                                type: "log_out"
                              });
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                    style={{ marginRight: 10 }}
                  >
                    <LogoutSymbol
                      style={{ paddingRight: 30, height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          }
        }}
      />
      <PlayStack.Screen
        name="Course"
        component={CourseSelect}
        options={{ headerTransparent: true }}
      />
      <PlayStack.Screen
        name="Add Players"
        component={PlayerAdd}
        options={{ headerTransparent: true }}
      />
      <PlayStack.Screen name="Login" component={Login} />
      <PlayStack.Screen name="SignUp" component={SignUp} />
      <PlayStack.Screen name="Post" component={SocialPost} />
    </PlayStack.Navigator>
  );
}
