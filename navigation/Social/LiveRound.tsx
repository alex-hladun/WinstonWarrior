import { View, Text, Image } from "react-native";
import config from "../../settings.json";
import * as React from "react";
import styles from "../../assets/styles/SocialStyles";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Audio, Video } from "expo-av";
var dayjs = require("dayjs");
// var relativeTime = require("dayjs/plugin/relativeTime");

export const LiveRound = (social) => {
  const withinMinutes = (Date.now() - social.item?.timestamp) / 60 / 1000;

  const textFont = { fontFamily: "nimbus", fontSize: 20 };
  console.log("🚀 ~ file: Rounds.jsx ~ line 19 ", JSON.stringify(social));
  console.log("🚀🚀🚀🚀 ~ file: Rounds.jsx ~ line 19 ", withinMinutes);

  if (withinMinutes > 30) {
    return <View></View>;
  }
  return (
    <>
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
              {dayjs(social.item?.timestamp).format("M/D")}
              {social?.item?.stats?.course &&
                "- " + social?.item?.stats?.course}
            </Text>
          </View>
        </View>
        {social.item.ContentType === "liveround" && (
          <View style={styles.commentContainer}>
            <Text style={[styles.comment, textFont]}>
              {social.item?.stats?.player1?.name}
              {social.item?.stats?.player1?.score}{" "}
            </Text>
            <Text style={[styles.comment, textFont]}>
              {social.item?.stats?.player2?.name}
              {social.item?.stats?.player2?.score}{" "}
            </Text>
            <Text style={[styles.comment, textFont]}>
              {social.item?.stats?.player3?.name}
              {social.item?.stats?.player3?.score}{" "}
            </Text>
            <Text style={[styles.comment, textFont]}>
              {social.item?.stats?.player4?.name}
              {social.item.stats?.player4?.score}{" "}
            </Text>
          </View>
        )}
        <View style={styles.commentBar}>
          <Text style={styles.buttonText}>Like</Text>
          <Text style={styles.buttonText}>Comment</Text>
        </View>
      </View>
    </>
  );
};
