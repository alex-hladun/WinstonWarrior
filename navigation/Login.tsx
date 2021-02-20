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
  createClubs
} from "../db/dbSetup";
import AsyncStorage from "@react-native-community/async-storage";
import { Auth } from "aws-amplify";

const width = Dimensions.get("window").width;

export function Login({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state.appState;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const checkLogin = async () => {
    // if (!appState.app)
    try {
      const authedUser = await Auth.currentAuthenticatedUser();
      console.log(authedUser.username); // this means that you've logged in before with valid user/pass.
      console.log("AUTHENTICATED WITH COGNITO");
      appContext.dispatch({
        type: "authentication_done",
        data: authedUser.username,
        token: authedUser.signInUserSession.accessToken.jwtToken
      });
      // console.log("🚀 ~ file: Login.tsx ~ line 31 ~ Login ~ appState", appState)
    } catch (err) {
      console.log("err signing in");
      console.log(err); // this means there is no currently authenticated user
    }
  };

  React.useEffect(() => {
    // should always be false, as you reset in signup
    checkLogin();

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

    // updateProcess()
    // authProcess();
  }, []);

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  const handleSignup = () => {
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
        </View>
        <View style={styles.signUpText}>
          <TextInput
            style={styles.playerText}
            multiline={false}
            placeholder={"Email"}
            autoCapitalize={"none"}
            placeholderTextColor={"black"}
            onChangeText={(t) => setUsername(t)}
          >
            {username}
          </TextInput>
        </View>
        <View style={styles.signUpText}>
          <TextInput
            style={styles.playerText}
            secureTextEntry
            autoCapitalize={"none"}
            multiline={false}
            placeholder={"Password"}
            placeholderTextColor={"black"}
            onChangeText={(t) => setPassword(t)}
          >
            {password}
          </TextInput>
        </View>
        <View style={styles.styledButton}>
          <Text onPress={() => handleLogin()} style={styles.buttonText}>
            Login
          </Text>
        </View>
        <View
          style={[styles.styledWelcomeButton, { backgroundColor: "black" }]}
        >
          <Text
            onPress={() => handleSignup()}
            style={[styles.buttonText, { color: "white" }]}
          >
            Create Account
          </Text>
        </View>
      </View>
    </>
  );
}
