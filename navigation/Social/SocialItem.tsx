import { View, Text, Image } from "react-native";
import config from "../../settings.json";
import * as React from "react";
import styles from "../../assets/styles/SocialStyles";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Audio, Video } from "expo-av";

export const SocialItem = (social) => {
  var date = new Date().setHours(-1);
  var itemDate = social.datetime
  console.log("🚀 ~ file: SocialItem.tsx ~ line 12 ~ SocialItem ~ itemDate", itemDate)


  const textFont = { fontFamily: "nimbus", fontSize: 20 };
  // console.log("🚀 ~ file: Rounds.jsx ~ line 19 ", JSON.stringify(social));
  return (
    <View style={styles.frame}>
      <View style={styles.upperFContainer}>
        <View style={styles.upperFImage}>
          <Text></Text>
        </View>
        <View style={styles.upperFTextContainer}>
          <Text style={[styles.upperText, textFont]}>
            {social.item.username}
          </Text>
          <Text style={[styles.upperText, textFont]}>
            2/14
            {social?.item?.stats?.course && "- " + social?.item?.stats?.course}
          </Text>
        </View>
      </View>
      {social.item.text && social.item.ContentType !== "liveround" && (
        <View style={styles.commentContainer}>
          <Text style={[styles.comment, textFont]}>{social.item.text}</Text>
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
      {social.item.ContentType === "liveround" && (
        <View style={styles.commentContainer}>
          <Text style={[styles.comment, textFont]}>
            {social.item.stats?.player1?.name}
            {social.item.stats?.player1?.score}{" "}
          </Text>
          <Text style={[styles.comment, textFont]}>
            {social.item.stats?.player2?.name} 
            {social.item.stats?.player2?.score}{" "}
          </Text>
          <Text style={[styles.comment, textFont]}>
            {social.item.stats?.player3?.name} 
            {social.item.stats?.player3?.score}{" "}
          </Text>
          <Text style={[styles.comment, textFont]}>
            {social.item.stats?.player4?.name} 
            {social.item.stats?.player4?.score}{" "}
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
