import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator
} from "react-native";
import * as React from "react";
import { AppContext } from "../context/AppContext";
import { Video } from "expo-av";
import styles from "../assets/styles/PlayStyles";
import { registerUser } from "../db/dbSetup";
import { Auth } from "aws-amplify";
import { checkExistingDb } from "../db/checkExistingDb";
import { resetDatabase } from "./SignUp";

const width = Dimensions.get("window").width;

export function Login({ navigation }) {
  const appContext = React.useContext(AppContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const checkLogin = async () => {
    try {
      setLoading(true);
      const authedUser = await Auth.currentAuthenticatedUser();
      const existingDb = await checkExistingDb();
      if (!existingDb) {
        await resetDatabase();
        registerUser(authedUser.username);
      }
      appContext.dispatch({
        type: "authentication_done",
        data: authedUser.username,
        token: authedUser.signInUserSession.idToken.jwtToken
      });
    } catch (err) {
      setLoading(false);
      console.log("err signing in");
      console.log(err); // this means there is no currently authenticated user
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      await Auth.signIn(username, password);
      checkLogin();
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log("error signing in", err);
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
            placeholder={"Username"}
            autoCapitalize={"none"}
            placeholderTextColor={"black"}
            onChangeText={(t) => setUsername(t)}
          >
            {username}
          </TextInput>
        </View>
        <View style={[styles.signUpText, { zIndex: 20 }]}>
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
        {error ? (
          <Text style={{ textAlign: "center" }}>{error}</Text>
        ) : (
          <View />
        )}
        <View style={[styles.styledButton, { zIndex: 20 }]}>
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text
              onPress={() => handleLogin()}
              style={[styles.buttonText, { zIndex: 30 }]}
            >
              Login
            </Text>
          )}
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
