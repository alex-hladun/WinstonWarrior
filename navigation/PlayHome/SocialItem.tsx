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
import styles from "../../assets/styles/StatStyles";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Theme } from "../../assets/styles/Theme";
import Carousel from "react-native-snap-carousel";

export const SocialItem = (social) => {
  console.log(
    "🚀 ~ file: SocialItem.tsx ~ line 20 ~ SocialItem ~ social",
    social
  );
  // console.log("🚀 ~ file: Rounds.jsx ~ line 19 ~ RoundItem ~ round", nineHoleRound)
  return (
    <View>
      <Text>
        {social.item.username} -{" "}
        {social.item.stats.frontScore + social.item.stats.backScore}
      </Text>
    </View>
    // <TouchableOpacity onPress={() => handleRoundSelect(round.index)}>
    //   <View style={nineHoleRound ? styles.nineHoleRoundItem : styles.roundItem}>
    //     <View style={styles.roundLeft}>
    //       <Text style={styles.roundCourseName}>
    //         {round.item.course_name}
    //         {includedInHandicap && <Text> ✅</Text>}
    //       </Text>
    //       <Text style={styles.roundDate}>
    //         {round.item.end_date && round.item.end_date.slice(0, 10)}
    //       </Text>
    //     </View>
    //     <View style={styles.roundRight}>
    //       <Text style={styles.roundScoreText}>{round.item.total_score}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
};
