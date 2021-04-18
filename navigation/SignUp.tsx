import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { Video } from "expo-av";

import * as React from "react";
import { AppContext } from "../context/AppContext";
import styles from "../assets/styles/PlayStyles";
import {
  createCourses,
  setUpDB,
  removeDB,
  createClubs,
  registerUser
} from "../db/dbSetup";
import { Auth } from "aws-amplify";
import { checkExistingDb } from "../db/checkExistingDb";
const width = Dimensions.get("window").width;

export const resetDatabase = async (registerBool: boolean = false) => {
  console.log("RESETTING DB FROM SIGNUP");
  AsyncStorage.removeItem("authName");
  await removeDB();
  console.log("dropped all tables");
  await setUpDB();
  console.log("setup db");
  await createClubs();
  await createCourses();
  if (registerBool) {
    registerUser("Sample");
  }
};

export function SignUp({ navigation }) {
  const appContext = React.useContext(AppContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRegister = async () => {
    console.log("completing signnup");
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log("signed up");
      const existingDb = checkExistingDb();
      if (!existingDb) {
        await resetDatabase();
        registerUser(username);
      }
      appContext.dispatch({
        type: "signed_up",
        data: username
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <View>
        {width < 400 && (
          <Video
            source={require("../assets/golf.m4v")}
            rate={1}
            volume={0.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
        )}
      </View>
      <View style={styles.signupBackground}>
        <Image
          source={require("../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.welcomeTextSmall}>Sign up to continue!</Text>
          <View style={styles.signUpText}>
            <TextInput
              style={styles.playerText}
              textContentType={"emailAddress"}
              placeholderTextColor={"black"}
              placeholder={"Email"}
              autoCorrect={false}
              autoCapitalize={"none"}
              multiline={false}
              onChangeText={(t) => setEmail(t)}
            >
              {email}
            </TextInput>
          </View>
          <View style={styles.signUpText}>
            <TextInput
              style={styles.playerText}
              placeholder={"Username"}
              placeholderTextColor={"black"}
              selectTextOnFocus={true}
              multiline={false}
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={(t) => setUsername(t)}
            >
              {username}
            </TextInput>
          </View>
          <View style={styles.signUpText}>
            <TextInput
              style={styles.playerText}
              placeholder={"Password"}
              placeholderTextColor={"black"}
              autoCorrect={false}
              autoCapitalize={"none"}
              textContentType={"password"}
              secureTextEntry
              // passwordRules={}
              multiline={false}
              onChangeText={(t) => setPassword(t)}
            >
              {password}
            </TextInput>
          </View>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>

          <TouchableOpacity onPress={() => handleRegister()}>
            <View style={[styles.styledWelcomeButton, styles.playButton]}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
