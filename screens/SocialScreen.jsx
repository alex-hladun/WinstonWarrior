import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppContext } from "../context/AppContext";
import SocialHome from "../navigation/Social/SocialHome";
import { LoadingScreen } from "../components/LoadingScreen";
import { useFonts } from "expo-font";
import FollowLogo from "../assets/svg/FollowLogo";
import PenLogo from "../assets/svg/PenLogo";

// Social Header
export default function SocialScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    instaFont: require("../assets/fonts/instaFont.ttf"),
    nimbus: require("../assets/fonts/nimbus.ttf")
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.push("Follow")}
                style={{ marginRight: 10 }}
              >
                <FollowLogo
                  style={{ paddingRight: 20, height: 15, width: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push("Post")}
                style={{ marginRight: 10 }}
              >
                <PenLogo style={{ paddingRight: 30, height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
          </>
        );
      }
    });
  }, [navigation, fontsLoaded]);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  return appState.appState?.initialLoading ? (
    <LoadingScreen />
  ) : (
    <SocialHome navigation={navigation} />
  );
}
