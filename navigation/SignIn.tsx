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



export function SignUp({ navigation }) {
  const appContext = React.useContext(AppContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    // checkLogin();
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



  return (
    <View style={styles.background}>
    </View>
    // </View>
  );
}
