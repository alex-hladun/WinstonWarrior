import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
import * as React from "react";
import * as Linking from "expo-linking";
import GolfLogo from "../../assets/svg/GolfLogo";
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";

import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { Theme } from "../../assets/styles/Theme";
import { PieChart } from "react-native-chart-kit";
import HeartSymbol from "../../assets/svg/HeartSymbol";
import MessageSymbol from "../../assets/svg/MessageSymbol";
import DeleteIcon from "../../assets/svg/DeleteIcon";
import { Audio, Video } from "expo-av";
var dayjs = require("dayjs");
import config from "../../settings.json";
const mockRound = [
  {
    stats: {
      albatrosses: 0,
      holesPlayed: 18,
      triples: 3,
      pars: 14,
      scrambles: 0,
      totalPutts: 37,
      totalScore: 80,
      eagles: 0,
      backScore: 48,
      gir: 14,
      doubles: 0,
      fairways: 17,
      frontScore: 32,
      bogies: 0,
      birdies: 0
    },
    SK: "ROUND#ahladun#1615510110703",
    username: "ahladun",
    ContentType: "round",
    PK: "USER#ahladun",
    timestamp: 1615510110703
  }
];
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
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [socialFeedError, setSocialFeedError] = React.useState<
    boolean | string
  >(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const postLike = async (roundId) => {
    try {
      const res = await axios.put(
        `${config.api2}put-reaction`,
        {
          roundId,
          reactionType: "like"
        },
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
      console.log(
        "🚀 ~ file: SocialHome.tsx ~ line 279 ~ postLike ~ res",
        res.status
      );
    } catch (err) {
      console.log("error liking", err);
    }
  };

  const SocialItem = (social) => {
    const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;

    const textFont = { fontFamily: "nimbus", fontSize: 20 };
    const stats = social.item.stats;
    // console.log("🚀 ~ file: Rounds.jsx ~ line 19 ", social.item["SK"]);

    const pieChartConfig = {
      backgroundColor: Theme.chartBackgroundColor,
      backgroundGradientFrom: Theme.chartBGGradientFrom,
      backgroundGradientTo: Theme.chartBGGradientTo,
      propsForVerticalLabels: {
        rotation: -90
      },
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    };
    const pieChartData = [
      {
        name: "Eagles",
        count: stats?.eagles,
        color: Theme.piePalette[0],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Birdies",
        count: stats?.birdies,
        color: Theme.piePalette[1],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Pars",
        count: stats?.pars,
        color: Theme.piePalette[2],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Bogeys",
        count: stats?.bogies,
        color: Theme.piePalette[3],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Doubles",
        count: stats?.doubles,
        color: Theme.piePalette[4],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Triples +",
        count: stats?.triples,
        color: Theme.piePalette[5],
        legendFontColor: "#666464",
        legendFontSize: 15
      }
    ];
    if (social.item.ContentType === "round") {
    }
    if (social.item.ContentType === "liveround" && withinMinutes > 30) {
      return;
    }
    return (
      <View style={socStyles.frame}>
        <View style={socStyles.upperFContainer}>
          <View style={socStyles.upperFImage}>
            <Text></Text>
          </View>
          <View style={socStyles.upperFTextContainer}>
            <Text style={[socStyles.upperText, textFont]}>
              {social.item.username}
            </Text>
            <Text style={[socStyles.upperText, textFont]}>
              {dayjs(social.item.timestamp).format("M/D")}
              {social?.item?.stats?.course &&
                "- " + social?.item?.stats?.course}
            </Text>
          </View>
        </View>
        {social.item.text && social.item.ContentType !== "liveround" && (
          <View style={socStyles.commentContainer}>
            <Text style={[socStyles.comment, textFont]}>
              {social.item.text}
            </Text>
          </View>
        )}
        {social.item.ImageURI && social.item.ContentType === "image" && (
          <Image
            source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
            style={socStyles.mediaPicture}
          />
        )}
        {social.item.ImageURI && social.item.ContentType === "video" && (
          <Video
            source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
            style={socStyles.mediaPicture}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            isLooping
          />
        )}
        {social.item.ContentType === "round" && (
          <View style={[socStyles.roundCardContainer]}>
            <View style={socStyles.clubCardHeader}>
              <Text style={socStyles.clubAvgText}>
                {stats?.frontScore + stats?.backScore}
              </Text>
            </View>
            <View style={socStyles.roundCardInnerContainer}>
              <Text style={socStyles.courseText}>
                {stats?.course ? stats?.course : "Sample Course"}
              </Text>
              <View style={socStyles.roundCardRow}>
                <View style={socStyles.roundCardInnerContainer}>
                  <Text style={socStyles.roundCardHeader}>Front</Text>
                  <Text style={socStyles.roundCardScore}>
                    {stats?.frontScore ? stats?.frontScore : ""}
                  </Text>
                </View>
                {stats?.backScore && (
                  <View style={socStyles.roundCardRow}>
                    <View style={socStyles.roundCardInnerContainer}>
                      <Text style={socStyles.roundCardHeader}>Back</Text>
                      <Text style={socStyles.roundCardScore}>
                        {stats?.backScore ? stats.backScore : ""}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              {stats?.frontScore && (
                <PieChart
                  data={pieChartData}
                  chartConfig={pieChartConfig}
                  height={200}
                  width={Dimensions.get("window").width}
                  style={socStyles.pieChartStyle}
                  center={[3, 0]}
                  hasLegend={true}
                  accessor={"count"}
                  backgroundColor={"transparent"}
                  absolute="false"
                />
              )}
            </View>
            <View style={socStyles.roundCardRow}>
              <View style={socStyles.roundCardInnerContainer}>
                <Text style={socStyles.roundCardHeader}>FWY</Text>
                <Text style={socStyles.roundCardSubText}>
                  {stats?.fairways ? stats.fairways : ""} /{" "}
                  {stats?.holesPlayed ? stats.holesPlayed : ""}
                </Text>
              </View>
              <View style={socStyles.roundCardInnerContainer}>
                <Text style={socStyles.roundCardHeader}>GIR</Text>
                <Text style={socStyles.roundCardSubText}>
                  {stats?.gir ? stats.gir : 0} /{" "}
                  {stats?.holesPlayed ? stats?.holesPlayed : ""}
                </Text>
              </View>
              <View style={socStyles.roundCardInnerContainer}>
                <Text style={socStyles.roundCardHeader}>SCR</Text>
                <Text style={socStyles.roundCardSubText}>
                  {stats?.gir ? stats?.scrambles : 18} /{" "}
                  {stats?.holesPlayed ? stats?.holesPlayed - stats?.gir : ""}
                </Text>
              </View>
            </View>
          </View>
        )}
        {social.item.ContentType === "liveround" && (
          <View style={socStyles.commentContainer}>
            <Text style={[socStyles.comment, textFont]}>
              Thru {social.item.stats?.thruHoles}
            </Text>
            <Text style={[socStyles.comment, textFont]}>
              {social.item.stats?.player1?.name}
              {" - "}
              {social.item.stats?.player1?.score}{" "}
            </Text>
            {social.item.stats?.player2?.name && (
              <Text style={[socStyles.comment, textFont]}>
                {social.item.stats?.player2?.name}
                {" - "}
                {social.item.stats?.player2?.score}{" "}
              </Text>
            )}
            {social.item.stats?.player3?.name && (
              <Text style={[socStyles.comment, textFont]}>
                {social.item.stats?.player3?.name}
                {" - "}
                {social.item.stats?.player3?.score}{" "}
              </Text>
            )}
            {social.item.stats?.player4?.name && (
              <Text style={[socStyles.comment, textFont]}>
                {social.item.stats?.player4?.name}
                {" - "}
                {social.item.stats?.player4?.score}{" "}
              </Text>
            )}
          </View>
        )}
        <View style={socStyles.commentBar}>
          <TouchableOpacity
            style={socStyles.commentLogo}
            onPress={() => {
              postLike(social.item["SK"]);
            }}
          >
            <HeartSymbol fill={true} />
          </TouchableOpacity>
          <TouchableOpacity
            style={socStyles.commentLogo}
            onPress={() => {
              navigation.navigate("Comment", {
                reactions: social.item?.reactions,
                roundId: social.item["SK"]
              });
            }}
          >
            <MessageSymbol />
          </TouchableOpacity>
          {social.item.username === appState.appState["user_name"] && (
            <TouchableOpacity
              style={socStyles.commentLogo}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete?",
                  [
                    {
                      text: "No",
                      style: "cancel"
                    },
                    {
                      text: "Yes",
                      onPress: () => console.log("Delete text goes here")
                    }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <DeleteIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const fetchRounds = async () => {
    // return;
    setRefreshing(true);

    let user = appState.appState["user_name"];
    console.log("FETCHING WITH TOKEN ", appState.appState.auth_data);
    try {
      const userRoundData = await axios.get(
        `${config.api2}rounds?user=${user}`,
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
      console.log("🚀 ", userRoundData);
      setSocialFeedError(false);

      appContext.dispatch({
        type: "set_social_posts",
        data: userRoundData.data
      });
    } catch (err) {
      console.log("error loading", err);
      setSocialFeedError(`Error Loading Data ${err}`);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return (
    <>
      <View style={styles.socialFeed}>
        {socialFeedError && <Text>{socialFeedError}</Text>}
        <FlatList
          data={appState.socialState.posts}
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
