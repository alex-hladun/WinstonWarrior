import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import Amplify, { Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";

// const s3 = new aws.S3();

export default function SocialPost({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  const handlePost = () => {
    console.log("posting");
    pickImage();
  };

  const pickImage = async () => {
    const random = Math.round(Math.random() * 1000000000);
    console.log(
      "🚀 ~ file: SocialPost.tsx ~ line 27 ~ pickImage ~ random",
      random
    );

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      videoQuality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All
      // base64: true
    });
    if (!result.cancelled) {
      const imagePath = result.uri;
      const imageExt = result.uri.split(".").pop();
      const imageMime = `image/${imageExt}`;

      let picture = await fetch(imagePath);
      picture = await picture.blob();

      const imageData = new File([picture], `photo.${imageExt}`);
      const testUpload = await Storage.put(
        `/${random}.${imageExt}`,
        imageData,
        {
          contentType: "imageMime"
        }
      );
      console.log(
        "🚀 ~ file: SocialPost.tsx ~ line 34 ~ pickImage ~ testUpload",
        testUpload
      );
    }
  };

  async function pathToImageFile() {
    try {
      // const response = await fetch(pathToImageFile);
      const blob = await response.blob();
      await Storage.put("yourKeyHere", blob, {
        contentType: "image/jpeg" // contentType is optional
      });
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  return (
    <>
      <View style={styles.socialFeed}>
        <TouchableOpacity onPress={handlePost}>
          <View style={[styles.styledButton, styles.playButon]}>
            <Text style={styles.buttonText}>Image/Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
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
