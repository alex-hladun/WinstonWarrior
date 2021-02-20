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
import * as React from "react";
import styles from "../../assets/styles/SocialStyles";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Theme } from "../../assets/styles/Theme";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
export const SocialItem = (social) => {
  // console.log(
  //   "🚀 ~ file: SocialItem.tsx ~ line 20 ~ SocialItem ~ social",
  //   social.item
  // );

  // let [fontsLoaded] = useFonts({
  //   Inter_900Black
  // });
  console.log(Dimensions.get("window").width);
  // console.log("🚀 ~ file: Rounds.jsx ~ line 19 ~ RoundItem ~ round", nineHoleRound)
  return (
    <View style={styles.frame}>
      <View style={styles.upperFContainer}>
        <View style={styles.upperFImage}>
          <Text></Text>
        </View>
        <View style={styles.upperFTextContainer}>
          <Text style={styles.upperText}>{social.item.username}</Text>
          <Text style={styles.upperText}>
            2/14 - {social.item.stats.course}
          </Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text style={[styles.comment]}>
          This is a sample comment. What a great round of golf haha. Yes.{" "}
        </Text>
      </View>
      {/* <View style={styles.upperF2}>
        <Text>
          {social.item.stats.frontScore} / {social.item.stats.backScore}
        </Text>
      </View> */}
      <View style={styles.mediaContainer}>
        <Text style={styles.score}>
          {social.item.stats.frontScore + social.item.stats.backScore}
        </Text>
      </View>
      <View style={styles.commentBar}>
        <Text style={styles.buttonText}>Like</Text>
        <Text style={styles.buttonText}>Comment</Text>
      </View>
    </View>
  );
};
