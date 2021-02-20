import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import { AppContext } from "../context/AppContext";
import styles from "../assets/styles/PlayStyles";
import { createWinston, setUpDB, removeDB, createClubs } from "../db/dbSetup";
import { Auth } from "aws-amplify";

export const resetDatabase = async () => {
  console.log("RESETTING DB FROM SIGNUP");
  AsyncStorage.removeItem("authName");
  removeDB();
  setUpDB();
  await createClubs();
  createWinston();
};

export function SignUp({ navigation }) {
  const appContext = React.useContext(AppContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      console.log(err); // this means there is no currently authenticated user
    }
  };

  const handlePress = async () => {
    console.log("completing signnup");
    resetDatabase();

    // navigation.push('Login')
    // appContext.dispatch({
    //   type: "signed_up",
    //   data: username
    // });
    appContext.value.doneRound();

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log("signed up");
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <View style={styles.background}>
      <Image
        source={require("../assets/images/vectors/Asset52.png")}
        style={styles.bgImage}
      />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcomeTextSmall}>
          Login to continue
        </Text>
        <View style={styles.signUpText}>
          <TextInput
            style={styles.playerText}
            autoFocus={true}
            selectTextOnFocus={true}
            multiline={false}
            placeholder={"Email"}

            onChangeText={(t) => setUsername(t)}
          >
            {username}
          </TextInput>
        </View>
        <View style={styles.signUpText}>
          <TextInput
            style={styles.playerText}
            autoFocus={true}
            selectTextOnFocus={true}
            textContentType={"password"}
            // passwordRules={}
            multiline={false}
            placeholder={"Password"}
            onChangeText={(t) => setPassword(t)}
          >
            {password}
          </TextInput>
        </View>
      </View>

      <TouchableOpacity onPress={() => handlePress()}>
        <View style={[styles.styledWelcomeButton, styles.playButton]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
    // </View>
  );
}
