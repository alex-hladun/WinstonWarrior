import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList
} from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useTotalInfo } from "../../hooks/useTotalInfo";
import { useHandicap } from "../../hooks/useHandicap";
import { useHandicapHistory } from "../../hooks/useHandicapHistory";
import { useEffect } from "react";
import axios from "axios";
import { SocialItem } from "./SocialItem";



export function Home({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const statState = statContext.value.state;
  const appState = appContext.value.state;
  const hcpInfo = useHandicapHistory(1);
  const hcpHistory = hcpInfo.handicapHistory;
  const hcp = hcpHistory[hcpHistory.length - 1];
  const [socialFeed, setSocialFeed] = React.useState([]);

  const handlePress = () => {
    navigation.push("Course");
  };

  const fetchRounds = async () => {
    let user = "JerryGolf";

    try {
      const userRoundData = await axios.get(
        `https://sqo0yd8vbe.execute-api.us-west-2.amazonaws.com/Prod/rounds?user=${user}`
      );
      console.log(
        "🚀 ~ file: Home.jsx ~ line 42 ~ fetchRounds ~ userRoundData",
        userRoundData.data[0]
      );
      setSocialFeed(userRoundData.data);
    } catch {
      setSocialFeedError("Error Loading Data");
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        <View style={styles.homePageContainer}>
          <View style={styles.winstonLogoContainer}>
            <Image
              source={require("../../assets/images/winstonLogo.png")}
              style={styles.winnyImage}
            />
            {/* <Text style={[styles.winstonTxtLogin, styles.buttonText]}>
              Winston Warrior
              </Text> */}
          </View>
          <FlatList
            data={socialFeed}
            renderItem={SocialItem}
            keyExtractor={(item, index) => `itemsocial${index}`}
          />

          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Rounds</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.totalRounds
                  ? appState.statState?.totalRounds
                  : 0}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>HCP</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.hcp
                  ? appState.statState.hcp.toFixed(1)
                  : "NA"}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.avgScore
                  ? appState.statState?.avgScore.toFixed(1)
                  : "NA"}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.bestScore
                  ? appState.statState?.bestScore
                  : "NA"}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => handlePress()}>
            <View style={[styles.styledButton, styles.playButton]}>
              <Text style={styles.buttonText}>Play Golf</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
