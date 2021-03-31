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
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { Theme } from "../../assets/styles/Theme";
import { PieChart } from "react-native-chart-kit";
import HeartSymbol from "../../assets/svg/HeartSymbol";
import MessageSymbol from "../../assets/svg/MessageSymbol";
import DeleteIcon from "../../assets/svg/DeleteIcon";
import { Audio, Video } from "expo-av";
var dayjs = require("dayjs");
import config from "../../settings.json";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";
import { generatePieData, pieChartConfig } from "../../helpers/generatePieData";
import CachedImage from "./CachedImage";
import { SafeAreaView } from "react-native-safe-area-context";
const textFont = { fontFamily: "nimbus", fontSize: 20 };

class SocialItemHeader extends React.PureComponent {
  render() {
    console.log("THIS PROPS", this.props);
    const { social } = this.props;

    return (
      <View style={socStyles.upperFContainer}>
        <View style={socStyles.upperFImage}>
          <Text></Text>
        </View>
        <View style={socStyles.upperFTextContainer}>
          <Text style={[socStyles.upperText, textFont]}>{social.username}</Text>
          <Text style={[socStyles.upperText, textFont]}>
            {dayjs(social.timestamp).format("M/D")}
            {social?.stats?.course && "- " + social?.stats?.course}
          </Text>
        </View>
      </View>
    );
  }
}

const SocialBody = React.memo(({ social, index }) => {
  console.log(
    "🚀 ~ file: SocialHome.tsx ~ line 168 ~ SocialBody ~ social",
    social
  );
  const content = social;
  const stats = content.stats;

  return (
    <>
      {content?.text !== "" &&
        content.text !== null &&
        content.ContentType !== "liveround" && (
          <View style={socStyles.commentContainer}>
            <Text style={[socStyles.comment, textFont]}>{content.text}</Text>
          </View>
        )}
      {content.ImageURI && content.ContentType === "image" && (
        <CachedImage
          source={{
            uri: `${config.cloudfrontDist}${content.ImageURI}`
          }}
          style={socStyles.mediaPicture}
          cacheKey={content.SK}
        />
      )}
      {content.ImageURI && content.ContentType === "video" && (
        <Video
          source={{
            uri: `${config.cloudfrontDist}${content.ImageURI}`
          }}
          style={socStyles.mediaPicture}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={social.social.index === visible}
          isLooping
        />
      )}
      {content.ContentType === "round" && (
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
                data={content.pieChartData}
                chartConfig={pieChartConfig}
                height={200}
                width={Dimensions.get("window").width}
                style={socStyles.pieChartStyle}
                center={[3, 0]}
                hasLegend={true}
                accessor={"count"}
                backgroundColor={"transparent"}
              />
            )}
          </View>
          <View style={socStyles.roundCardRow}>
            <View style={socStyles.roundCardInnerContainer}>
              <Text style={socStyles.roundCardHeader}>FWY</Text>
              <Text style={socStyles.roundCardSubText}>
                {stats?.fairways ? stats.fairways : ""} /{" "}
                {stats?.holesPlayed ? stats.holesPlayed - 1 : ""}
              </Text>
            </View>
            <View style={socStyles.roundCardInnerContainer}>
              <Text style={socStyles.roundCardHeader}>GIR</Text>
              <Text style={socStyles.roundCardSubText}>
                {stats?.gir ? stats.gir : 0} /{" "}
                {stats?.holesPlayed ? stats?.holesPlayed - 1 : ""}
              </Text>
            </View>
            <View style={socStyles.roundCardInnerContainer}>
              <Text style={socStyles.roundCardHeader}>SCR</Text>
              <Text style={socStyles.roundCardSubText}>
                {stats?.gir ? stats?.scrambles : 18} /{" "}
                {stats?.holesPlayed ? stats?.holesPlayed - stats?.gir - 1 : ""}
              </Text>
            </View>
          </View>
        </View>
      )}
      {content.ContentType === "liveround" && (
        <View style={socStyles.commentContainer}>
          <Text style={[socStyles.comment, textFont]}>
            Thru {content.stats?.thruHoles}
          </Text>
          <Text style={[socStyles.comment, textFont]}>
            {content.stats?.player1?.name}
            {" - "}
            {content.stats?.player1?.score}{" "}
          </Text>
          {content.stats?.player2?.name && (
            <Text style={[socStyles.comment, textFont]}>
              {content.stats?.player2?.name}
              {" - "}
              {content.stats?.player2?.score}{" "}
            </Text>
          )}
          {content.stats?.player3?.name && (
            <Text style={[socStyles.comment, textFont]}>
              {content.stats?.player3?.name}
              {" - "}
              {content.stats?.player3?.score}{" "}
            </Text>
          )}
          {content.stats?.player4?.name && (
            <Text style={[socStyles.comment, textFont]}>
              {content.stats?.player4?.name}
              {" - "}
              {content.stats?.player4?.score}{" "}
            </Text>
          )}
        </View>
      )}
    </>
  );
});
class SocialItemFooter extends React.PureComponent {
  render() {
    const { social, navigation } = this.props;
    console.log(
      "🚀 ~ file: SocialHome.tsx ~ line 113 ~ SocialItemFooter ~ render ~ userLiked",
      social
    );

    return (
      <View style={socStyles.commentBar}>
        <TouchableOpacity
          style={socStyles.commentLogo}
          onPress={this.props.onPress}
        >
          <HeartSymbol fill={social.userLiked} />
        </TouchableOpacity>
        <TouchableOpacity
          style={socStyles.commentLogo}
          onPress={() => {
            navigation.navigate("Comment", {
              reactions: social.reactions,
              roundId: social["SK"]
            });
          }}
        >
          <MessageSymbol />
        </TouchableOpacity>
        {social.isOwnPost && (
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
                    onPress: async () => {
                      try {
                        const res = await authenticatedAxios(
                          "DELETE",
                          `${config.api2}rounds?roundId=${social["SK"]}`
                        );
                        console.log("DELETE ITEM", res);
                      } catch (err) {
                        console.log("ERROR DELETING", err);
                      }
                    }
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
    );
  }
}
const TotalRoundItem = React.memo(({ item, index, onPress, navigation }) => {
  return (
    <>
      <View style={socStyles.frame}>
        <SocialItemHeader social={item} index={index} />
        <SocialBody social={item} index={index} />
        <SocialItemFooter
          social={item}
          index={index}
          onPress={onPress}
          navigation={navigation}
        />
      </View>
    </>
  );
});

const SocialHome = ({ navigation }) => {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState("");
  const [socialPosts, setSocialPosts] = React.useState({});
  const [socialFeedError, setSocialFeedError] = React.useState<
    boolean | string
  >(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const postLike = React.useCallback(
    async (roundSK) => {
      console.log("🚀 ~ file: SocialHome.tsx ~ line 290 ~ roundSK", roundSK);
      let post = socialPosts[roundSK];
      let userLiked = false;
      if (post.userLiked) {
        userLiked = true;
      }

      const newPost = {
        ...post,
        userLiked: !userLiked
      };
      setSocialPosts({ ...socialPosts, [roundSK]: newPost });
      try {
        let res;
        if (userLiked) {
          res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
            roundId: roundSK,
            reactionType: "unlike"
          });
          console.log("unliked", res.status);
        } else {
          res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
            roundId: roundSK,
            reactionType: "like"
          });
          console.log("🚀 ~ liked", res.status);
        }
      } catch (err) {
        console.log("error liking/unliking", err);
      }
    },
    [socialPosts]
  );

  const areEqual = (prevProps, nextProps) => {
    if (nextProps.item.item.userLiked === prevProps.item.userLiked) {
      console.log("Re-rendering");
      return true;
    }
    return true;
  };

  const callRenderItem = React.useCallback(
    ({ item, index }) => {
      return (
        <TotalRoundItem
          onPress={() => postLike(item.SK)}
          item={item}
          index={index}
          navigation={navigation}
        />
      );
    },
    [postLike]
  );

  const fetchRounds = async () => {
    setRefreshing(true);

    let user = appState.appState["user_name"];
    try {
      const userRoundData = await authenticatedAxios(
        "GET",
        `${config.api2}rounds?user=${user}`
      );
      console.log("Round fetch complete");
      setSocialFeedError(false);

      const optimizedData = [];
      const opitimizedObj = {};

      for (const item of userRoundData.data) {
        for (const reaction of item.reactions.Items) {
          console.log(
            "🚀 ~ file: SocialHome.tsx ~ line 358 ~ fetchRounds ~ reaction",
            reaction
          );
          if (
            reaction.reactingUser === appState.appState["user_name"] &&
            reaction.reactionType === "like"
          ) {
            item.userLiked = true;
          } else {
          }
        }

        console.log("contenttype", item);
        // Stale post? If so, filter out
        const withinMinutes = (Date.now() - item.timestamp) / 60 / 1000;
        item.withinMinues = withinMinutes;

        if (item.username === appState.appState["user_name"]) {
          item.isOwnPost = true;
        }

        if (
          item.ContentType === "liveround" &&
          withinMinutes > 30 &&
          item.stats?.thruHoles !== 18
        ) {
          // console.log("skip");
        } else if (
          // Attach pie chart data to rounds, only for 18 holes

          item.ContentType === "round" &&
          item.stats.frontScore &&
          item.stats.backScore
        ) {
          item.pieChartData = generatePieData(item.stats);
          opitimizedObj[item.SK] = item;
          // optimizedData.push(item);
        } else if (item.ContentType === "text") {
          opitimizedObj[item.SK] = item;

          optimizedData.push(item);
        } else if (
          item.ContentType === "image" ||
          item.ContentType === "video" ||
          item.ContentType === "liveround"
        ) {
          opitimizedObj[item.SK] = item;
        }
      }
      console.log("Initial done opitimize");
      console.log(
        "🚀 ~ file: SocialHome.tsx ~ line 430 ~ fetchRounds ~ optimizedData",
        optimizedData
      );
      setSocialPosts(opitimizedObj);
      console.log("Dispatched optimized items");
      setRefreshing(false);
    } catch (err) {
      console.log("error loading", err);
      setSocialFeedError(`Error Loading Data ${err}`);
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const _onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      // console.log("Visible items are", viewableItems);
      console.log("Setting visible in this iteration", changed[0].index);
      setVisible(changed[0].index);
    },
    []
  );

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const _keyExtractor = (item) => `${item.timestamp}`;
  const formatted = React.useMemo(() => Object.values(socialPosts), [
    socialPosts
  ]);
  return (
    <>
      {/* <SafeAreaView flex={1}> */}
      <View style={styles.socialFeed}>
        {socialFeedError && <Text>{socialFeedError}</Text>}
        {Object.keys(socialPosts).length === 0 && !refreshing && (
          <Text>No posts to show! Are you following anyone?</Text>
        )}
        <FlatList
          data={formatted}
          // onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          renderItem={callRenderItem}
          // initialNumToRender={2}
          keyExtractor={_keyExtractor}
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
      {/* </SafeAreaView> */}
    </>
  );
};

export default SocialHome;
