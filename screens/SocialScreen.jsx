import * as React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import EditScreenInfo from "../components/EditScreenInfo";
import { AppContext } from "../context/AppContext";
import SocialHome from "../navigation/Social/SocialHome";
import AsyncStorage from "@react-native-community/async-storage";
import { LoadingScreen } from "../components/LoadingScreen";
import { Theme } from "../assets/styles/Theme";
import { useFonts } from "expo-font";

// Social Header
export default function SocialScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    instaFont: require("../assets/fonts/instaFont.ttf")
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 100,
        backgroundColor: "#white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3
      },
      headerTitle: () => {
        return fontsLoaded ? (
          <Text
            style={{
              right: "90%",
              fontSize: 30,
              fontFamily: "instaFont"
            }}
          >
            Winstagram
          </Text>
        ) : (
          <Text></Text>
        );
      },
      headerRight: () => {
        return (
          <>
            <Text
              onPress={() => navigation.push("Post")}
              style={{ paddingRight: 20 }}
            >
              Post
            </Text>
          </>
        );
      }
    });
  }, [navigation, fontsLoaded]);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  return appState.appState?.initialLoading ? <LoadingScreen /> : <SocialHome />;
}
