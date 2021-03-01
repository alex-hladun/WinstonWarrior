import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { SocialItem } from "./SocialItem";
import config from "../../settings.json";

export default function SocialHome({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  // console.log(
  //   "🚀 ~ file: SocialHome.tsx ~ line 17 ~ SocialHome ~ appState",
  //   appState.appState.auth_data
  // );
  const [socialFeed, setSocialFeed] = React.useState([]);
  const [socialFeedError, setSocialFeedError] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchRounds = async () => {
    setRefreshing(true);
    let user = appState.appState["user_name"];

    try {
      const userRoundData = await axios.get(
        `${config.api2}rounds?user=${user}`,
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
      console.log(
        "🚀 ~ file: Home.jsx ~ line 42 ~ fetchRounds ~ userRoundData",
        userRoundData.data.length
      );
      setSocialFeedError(false);

      setSocialFeed(userRoundData.data);
    } catch (err) {
      console.log("error loading", err);
      setSocialFeedError("Error Loading Data");
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return (
    <>
      <View style={styles.socialFeed}>
        {socialFeedError && <Text>Error loading data</Text>}
        <FlatList
          data={socialFeed}
          renderItem={SocialItem}
          keyExtractor={(item, index) => `itemsocial${index}`}
          refreshing={refreshing}
          onRefresh={fetchRounds}
        />
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
