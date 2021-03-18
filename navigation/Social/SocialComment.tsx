import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import config from "../../settings.json";
import { Audio, Video } from "expo-av";

export default function SocialComment({ navigation, route }) {
  const reactions = route.params.reactions.Items.map((item, index) => {
    if (item.reactionType !== "like") {
      return (
        <Text key={item.PK}>
          {item.reactingUser} - {item.reactionType}
        </Text>
      );
    }
  });
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const postText = async () => {
    try {
      await axios.put(
        `${config.api2}put-reaction`,
        {
          roundId: route.params.roundId,
          reactionType: "comment",
          reactionComment: text
        },
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
      navigation.goBack();
    } catch (err) {
      setError("Error posting to database");
      console.log("error posting text", err);
    }
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
      </View>
      <View style={styles.socialFeed}>
        {error !== "" && (
          <View>
            <Text>Error! {error}</Text>
          </View>
        )}
        {reactions}
        <View style={socStyles.textBox}>
          <TextInput
            style={socStyles.textBox}
            multiline={false}
            onChangeText={(text) => setText(text)}
            autoFocus
          >
            {text}
          </TextInput>
        </View>
        <TouchableOpacity onPress={postText}>
          <View style={styles.styledButton}>
            <Text style={styles.buttonText}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
