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

const mockData = [
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614914782184",
    timestamp: 1614914782184,
    username: "ahladun"
  },
  {
    ContentType: "text",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614914290485",
    text: "Sample text brah!",
    timestamp: 1614914290485,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614911794409",
    timestamp: 1614911794409,
    username: "ahladun"
  },
  {
    ContentType: "image",
    ImageURI: "/92313318391833650.jpg",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614911642761",
    text: "Sick meme",
    timestamp: 1614911642761,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614911120571",
    timestamp: 1614911120571,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614910685910",
    timestamp: 1614910685910,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614909852325",
    timestamp: 1614909852325,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614909586440",
    timestamp: 1614909586440,
    username: "ahladun"
  },
  {
    ContentType: "round",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614909576751",
    timestamp: 1614909576751,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun#1614909366789",
    timestamp: 1614909366789,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614835518484",
    timestamp: 1614835518484,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614834837793",
    timestamp: 1614834837794,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614834737843",
    timestamp: 1614834737843,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614833550354",
    timestamp: 1614833550354,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614832409906",
    timestamp: 1614832409906,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614831619786",
    timestamp: 1614831619787,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614831595152",
    timestamp: 1614831595152,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614831540571",
    timestamp: 1614831540571,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614831513300",
    timestamp: 1614831513300,
    username: "ahladun"
  },
  {
    ContentType: "liveround",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614830792666",
    timestamp: 1614830792666,
    username: "ahladun"
  },
  {
    ContentType: "text",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614567273331",
    text: "Sample post why a gear day",
    timestamp: 1614567273331,
    username: "ahladun"
  },
  {
    ContentType: "text",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614567233685",
    text: "Sample post why a gear day",
    timestamp: 1614567233685,
    username: "ahladun"
  },
  {
    ContentType: "image",
    ImageURI: "/43673240075635110.jpg",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614566827408",
    text: "Forest",
    timestamp: 1614566827409,
    username: "ahladun"
  },
  {
    ContentType: "image",
    ImageURI: "/86070492295258910.jpg",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614556591485",
    text: "What a cutie!",
    timestamp: 1614556591485,
    username: "ahladun"
  },
  {
    ContentType: "video",
    ImageURI: "/83740312530058140.mov",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614556447187",
    text: "Sick bro",
    timestamp: 1614556447187,
    username: "ahladun"
  },
  {
    ContentType: "image",
    ImageURI: "/92246815933396200.jpg",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614556243048",
    text: "Olly is funny!",
    timestamp: 1614556243048,
    username: "ahladun"
  },
  {
    ContentType: "image",
    ImageURI: "/30177181759744100.jpg",
    PK: "USER#ahladun",
    SK: "ROUND#ahladun1614555161017",
    text: "Hiya",
    timestamp: 1614555161017,
    username: "ahladun"
  }
];
export default function SocialHome({ navigation }) {
  const statContext = React.useContext(StatContext);
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  // console.log(
  //   "🚀 ~ file: SocialHome.tsx ~ line 17 ~ SocialHome ~ appState",
  //   appState.appState.auth_data
  // );
  const [socialFeed, setSocialFeed] = React.useState(mockData);
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
      console.log("🚀 ", userRoundData.data);
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
          extraData={refreshing}
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
