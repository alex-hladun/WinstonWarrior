import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { SocialItem } from "./SocialItem";

export default function SocialHome({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [socialFeed, setSocialFeed] = React.useState([]);
  const [socialFeedError, setSocialFeedError] = React.useState<string>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchRounds = async () => {
    setRefreshing(true);
    let user = "JerryGolf";

    try {
      const userRoundData = await axios.get(
        `https://sqo0yd8vbe.execute-api.us-west-2.amazonaws.com/Prod/rounds?user=${user}`
      );
      console.log(
        "🚀 ~ file: Home.jsx ~ line 42 ~ fetchRounds ~ userRoundData",
        userRoundData.data.length
      );
      setSocialFeed(userRoundData.data);
    } catch {
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
        <FlatList
          data={socialFeed}
          renderItem={SocialItem}
          keyExtractor={(item, index) => `itemsocial${index}`}
          refreshing={refreshing}
          onRefresh={fetchRounds}
        />
      </View>

      {/* <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
      </View> */}
    </>
  );
}
