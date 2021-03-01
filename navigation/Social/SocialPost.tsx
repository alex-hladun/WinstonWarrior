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
import Amplify, { Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";
import config from "../../settings.json";
import { Audio, Video } from "expo-av";

// const s3 = new aws.S3();

export default function SocialPost({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [postState, setPostState] = useState("WAIT");
  const [content, setContent] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [uri, setUri] = useState(null);

  const handlePost = () => {
    console.log("posting");
    pickImage();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      videoQuality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All
      // base64: true
    });
    if (!result.cancelled) {
      console.log(
        "🚀 ~ file: SocialPost.tsx ~ line 39 ~ pickImage ~ result",
        result
      );

      setContent(result);
      setPostState("PREVIEW");
    }
  };

  const postImage = async () => {
    setPostState("UPLOADING");

    const random = Math.round(Math.random() * 100000000000000000);
    const imagePath = content.uri;
    const imageExt = content.uri.split(".").pop();
    const imageMime = `image/${imageExt}`;

    let picture = await fetch(imagePath);
    let blob = await picture.blob();

    const imageData = new File([blob], `photo.${imageExt}`);
    const testUpload = await Storage.put(`/${random}.${imageExt}`, imageData, {
      contentType: "imageMime"
    });
    console.log(
      "🚀 ~ file: SocialPost.tsx ~ line 34 ~ pickImage ~ testUpload",
      testUpload.key
    );

    try {
      await axios.post(
        `${config.api2}rounds`,
        {
          uri: testUpload.key,
          contentType: content.type,
          text: text
        },
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
      picture = null;
      setContent(null);
      setPostState("WAIT");
      console.log("DONE POSTING");
    } catch (err) {
      console.log("error posting to dynamo", err);
      setError("Error posting to database");
      setContent(null);
      setPostState("WAIT");
    }
  };

  const handleTextPost = () => {
    setPostState("PREVIEW");
  };

  return (
    <>
      <View style={styles.socialFeed}>
        {error !== "" && (
          <View>
            <Text>Error! {error}</Text>
          </View>
        )}
        {postState === "WAIT" && (
          <>
            <TouchableOpacity onPress={handlePost}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Image/Video</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTextPost}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Text</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Share Round</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Tee Time</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {postState === "UPLOADING" && (
          <View>
            <Text>UPLOADING!</Text>
          </View>
        )}
        {postState === "PREVIEW" && (
          <>
            <View style={socStyles.textBox}>
              <TextInput
                style={socStyles.textBox}
                multiline={false}
                onChangeText={(text) => setText(text)}
              >
                {text}
              </TextInput>
            </View>
            <TouchableOpacity onPress={postImage}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Post</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {postState === "PREVIEW" && content?.type === "image" && (
          <View>
            <Image
              source={{ uri: content.uri }}
              style={socStyles.mediaPreview}
            />
          </View>
        )}
        {postState === "PREVIEW" && content?.type === "video" && (
          <View>
            <Video
              source={{ uri: content.uri }}
              style={socStyles.mediaPreview}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={true}
              isLooping
            />
          </View>
        )}
      </View>

      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        {/* <View style={styles.homePageContainer}> */}

        {/* </View> */}
      </View>
    </>
  );
}
