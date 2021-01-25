import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  ImageBackground
} from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import { AppContext } from "../context/AppContext";
import { Video } from "expo-av";
import styles from "../assets/styles/PlayStyles";
import {
  createWinston,
  seedData,
  setUpDB,
  removeDB,
  createClubs,
} from "../db/dbSetup";
import AsyncStorage from "@react-native-community/async-storage";
// import * as Updates from 'expo-updates' // Updates*
const width = Dimensions.get("window").width;
console.log(width);
export function Login({ navigation }) {
  const appContext = React.useContext(AppContext);
  // console.log('context in Login.tsx', appContext.dispatch)

  React.useEffect(() => {
    // should always be false, as you reset in signup
    let reset = false;
    let seed = false;
    if (reset) {
      console.log("resetting DB SHOULD ONLY RUN ONCE");
      AsyncStorage.removeItem("authName");
      removeDB();
      setUpDB();
      createClubs();
      createWinston();
      // registerUser('Alex')
      appContext.value.doneRound();
    }

    if (seed) {
      seedData();
    }

    const authProcess = async () => {
      const authName = await AsyncStorage.getItem("authName");
      if (authName) {
        appContext.dispatch({
          type: "authentication_done",
          data: authName
        });
      }
    };

    // updateProcess()
    authProcess();
  }, []);

  const handlePress = () => {
    console.log("going to root");
    navigation.push("SignUp");
  };

  const handleLogin = () => {
    navigation.push("SignUp");
  };

  return (
    <>
      <View>
        {width < 400 && (
          <Video
            source={require("../assets/golf.m4v")}
            rate={1.0}
            volume={0.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
        )}
      </View>
      <View
        style={[styles.loginContainer, width > 399 && styles.loginBackground]}
      >
        <View style={styles.winstonLogoContainer}>
          <Image
            source={require("../assets/images/winstonLogo.png")}
            style={styles.winnyImage}
          />
          {/* <Text style={[styles.buttonText, styles.winstonTxtLogin]}>
              Winston Warrior
              </Text> */}
        </View>
        <View style={styles.styledButton}>
          <Text onPress={() => handleLogin()} style={styles.buttonText}>
            Create Account
          </Text>
        </View>
      </View>
    </>
  );
}
