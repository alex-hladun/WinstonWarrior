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
import { authenticatedAxios } from "../../helpers/authenticatedAxios";

export default function SocialPost({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [postState, setPostState] = useState("WAIT");
  const [content, setContent] = useState(null);
  const [text, setText] = useState("");
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [error, setError] = useState("");

  const handlePost = () => {
    pickImage();
  };

  const pickCamera = async () => {
    setError("");
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.1,
      videoQuality: 0.1,
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
    if (!result.cancelled) {
      setContent(result);
      setPostState("PREVIEW");
    }
  };
  const pickImage = async () => {
    setError("");
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.1,
      videoQuality: 0.1,
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });
    if (!result.cancelled) {
      setContent(result);
      setPostState("PREVIEW");
    }
  };

  const postImage = async () => {
    setPostState("UPLOADING");

    const random = Math.round(Math.random() * 100000000000000000);
    const imageExt = content.uri.split(".").pop();
    console.log(
      "🚀 ~ file: SocialPost.tsx ~ line 58 ~ postImage ~ content",
      content
    );

    let picture = await fetch(content.uri);
    let blob = await picture.blob();
    console.log("🚀 ~ file: SocialPost.tsx ~ line 54 ~ postImage ~ blob", blob);
    Storage.put(`/${random}.${imageExt}`, blob, {
      contentType: "imageMime",
      progressCallback(progress) {
        setUploadingProgress(progress.loaded / progress.total);
      }
    })
      .then(async (result) => {
        try {
          await authenticatedAxios("POST", `${config.api2}rounds`, {
            uri: result.key,
            contentType: content.type,
            text: text
          });
          // picture = null;
          setContent(null);
          setPostState("WAIT");
          setError("");
          console.log("DONE POSTING");
        } catch (axiosError) {
          console.log("AXIOS ERROR", axiosError);
          setError(axiosError);
        }
      })
      .catch((err) => {
        console.log("error posting to dynamo", err);
        setError(`Error posting to database ${err}`);
        setContent(null);
        setPostState("WAIT");
      });
  };

  const handleTextPost = () => {
    setPostState("PREVIEWTEXT");
  };

  const postText = async () => {
    try {
      await authenticatedAxios("POST", `${config.api2}rounds`, {
        contentType: "text",
        text: text
      });
      setPostState("WAIT");
    } catch (err) {
      setError(`Error posting to database ${err}`);

      console.log("error posting text", err);
      setPostState("WAIT");
    }
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
            <TouchableOpacity onPress={pickCamera}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Image/Video</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTextPost}>
              <View style={[styles.styledButton, styles.playButon]}>
                <Text style={styles.buttonText}>Text</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {postState === "UPLOADING" && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, textTransform: "uppercase" }}>
              UPLOADING {(100 * uploadingProgress).toFixed(1)}%
            </Text>
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
        {postState === "PREVIEWTEXT" && (
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
            <TouchableOpacity onPress={postText}>
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
      </View>
    </>
  );
}
