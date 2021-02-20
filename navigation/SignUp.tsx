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
  const [email, setEmail] = React.useState("");

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
      console.log("Err login check"); // this means there is no currently authenticated user
      console.log(err); // this means there is no currently authenticated user
    }
  };

  const handlePress = async () => {
    console.log("completing signnup");
    // resetDatabase();

    // navigation.push('Login')
    // appContext.value.doneRound();

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log("signed up");
      appContext.dispatch({
        type: "signed_up",
        data: username
      });
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <View style={styles.signupBackground}>
      <Image
        source={require("../assets/images/vectors/Asset52.png")}
        style={styles.bgImage}
      />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcomeTextSmall}>
          Sign up or login to continue
        </Text>
        <View style={styles.signUpText}>
          <TextInput
            style={styles.playerText}
            textContentType={"emailAddress"}
            placeholderTextColor={"black"}
            placeholder={"Email"}
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

            textContentType={"password"}
            secureTextEntry
            // passwordRules={}
            multiline={false}
            onChangeText={(t) => setPassword(t)}
          >
            {password}
          </TextInput>
        </View>
        {/* </View> */}

        <TouchableOpacity onPress={() => handlePress()}>
          <View style={[styles.styledWelcomeButton, styles.playButton]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
