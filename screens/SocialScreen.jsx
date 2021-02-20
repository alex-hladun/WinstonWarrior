import * as React from "react";
import { StyleSheet, Dimensions, Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import EditScreenInfo from "../components/EditScreenInfo";
import { AppContext } from "../context/AppContext";
import SocialHome from "../navigation/Social/SocialHome";
import AsyncStorage from "@react-native-community/async-storage";
import { LoadingScreen } from "../components/LoadingScreen";

export default function SocialScreen() {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  return appState.appState?.initialLoading ? <LoadingScreen /> : <SocialHome />;
}
