import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Modal
} from "react-native";
import config from "../../settings.json";
import * as React from "react";
import styles from "../../assets/styles/SocialStyles";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Theme } from "../../assets/styles/Theme";
import { Audio, Video } from "expo-av";

export const SocialItem = (social) => {
  console.log("🚀 ~ file: Rounds.jsx ~ line 19 ", JSON.stringify(social));
  return (
    <View style={styles.frame}>
      <View style={styles.upperFContainer}>
        <View style={styles.upperFImage}>
          <Text></Text>
        </View>
        <View style={styles.upperFTextContainer}>
          <Text style={styles.upperText}>{social.item.username}</Text>
          <Text style={styles.upperText}>
            2/14 - {social?.item?.stats?.course}
          </Text>
        </View>
      </View>
      {social.item.text && (
        <View style={styles.commentContainer}>
          <Text style={[styles.comment]}>{social.item.text}</Text>
        </View>
      )}
      {social.item.ImageURI && social.item.ContentType === "image" && (
        <Image
          source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
          style={styles.mediaPicture}
        />
      )}
      {social.item.ImageURI && social.item.ContentType === "video" && (
        <Video
          source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
          style={styles.mediaPicture}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
        />
      )}
      {social.item.ImageURI && social.item.ContentType === "round" && (
        <View style={styles.mediaContainer}>
          <Text style={styles.score}>
            {social.item.stats?.frontScore + social.item.stats?.backScore}
          </Text>
        </View>
      )}
      <View style={styles.commentBar}>
        <Text style={styles.buttonText}>Like</Text>
        <Text style={styles.buttonText}>Comment</Text>
      </View>
    </View>
  );
};
