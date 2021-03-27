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

export default function SocialHome({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState("");
  const [socialPosts, setSocialPosts] = React.useState([]);

  const [socialFeedError, setSocialFeedError] = React.useState<
    boolean | string
  >(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [likedPosts, setLikedPosts] = React.useState({ likedPosts: [] });

  const postLike = async (roundSK, userLiked) => {
    // appContext.dispatch({ type: "like_post", data: roundSK });
    try {
      let res;

      if (userLiked) {
        const likedPostsClone = { ...likedPosts };
        const itemIndex = likedPostsClone.likedPosts.indexOf(roundSK);
        if (itemIndex > -1) {
          likedPostsClone.likedPosts.splice(itemIndex, 1);
          setLikedPosts(likedPostsClone);
        }
        res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
          roundSK,
          reactionType: "unlike"
        });
        console.log("unliked", res.status);
      } else {
        setLikedPosts((prev) => ({
          likedPosts: [...prev.likedPosts, roundSK]
        }));
        res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
          roundSK,
          reactionType: "like"
        });
        console.log("🚀 ~ liked", res.status);
      }
    } catch (err) {
      console.log("error liking/unliking", err);
    }
  };

  class SocialItemHeader extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
    render() {
      const social = this.props.social;
      // const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;
      const textFont = { fontFamily: "nimbus", fontSize: 20 };
      return (
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
      );
    }
  }
  class SocialItemFooter extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
    render() {
      const social = this.props.social;
      const userLiked = this.props.userLiked;

      return (
        <View style={socStyles.commentBar}>
          <TouchableOpacity
            style={socStyles.commentLogo}
            onPress={() => {
              postLike(social.item["SK"], userLiked);
            }}
          >
            <HeartSymbol fill={userLiked} />
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
                      onPress: async () => {
                        try {
                          const res = await authenticatedAxios(
                            "DELETE",
                            `${config.api2}rounds?roundId=${social.item["SK"]}`
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

  class SocialItemClass extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
    render() {
      const social = this.props.social;
      const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;
      const textFont = { fontFamily: "nimbus", fontSize: 20 };
      const stats = social.item.stats;

      return (
        <>
          {social.item.text && social.item.ContentType !== "liveround" && (
            <View style={socStyles.commentContainer}>
              <Text style={[socStyles.comment, textFont]}>
                {social.item.text}
              </Text>
            </View>
          )}
          {social.item.ImageURI && social.item.ContentType === "image" && (
            <CachedImage
              source={{
                uri: `${config.cloudfrontDist}${social.item.ImageURI}`
              }}
              style={socStyles.mediaPicture}
              cacheKey={social.item.SK}
            />
            // <Image
            //   source={{
            //     uri: `${config.cloudfrontDist}${social.item.ImageURI}`
            //   }}
            //   defaultSource={{
            //     uri: `${config.cloudfrontDist}${social.item.ImageURI}`
            //   }}
            //   style={socStyles.mediaPicture}
            // />
          )}
          {social.item.ImageURI && social.item.ContentType === "video" && (
            <Video
              source={{
                uri: `${config.cloudfrontDist}${social.item.ImageURI}`
              }}
              style={socStyles.mediaPicture}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={this.props.index === visible}
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
                    data={social.item.pieChartData}
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
                    {stats?.holesPlayed
                      ? stats?.holesPlayed - stats?.gir - 1
                      : ""}
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
        </>
      );
    }
  }
  const TotalRoundItem = ({ item, index, isLiked }) => {
    return (
      <>
        <View style={socStyles.frame}>
          <SocialItemHeader social={item} index={index} />
          <SocialItemClass social={item} index={index} />
          <SocialItemFooter social={item} index={index} userLiked={isLiked} />
        </View>
      </>
    );
  };

  const areEqual = (prevProps, nextProps) => {
    // console.log(
    //   "🚀 ~ file: SocialHome.tsx ~ line 340 ~ areEqual ~ nextProps",
    //   nextProps
    // );

    console.log(
      "🚀 ~ file: SocialHome.tsx ~ line 361 ~ areEqual ~ prevProps.item.item.SK",
      prevProps.item.item.SK
    );
    console.log(
      "🚀 ~ file: SocialHome.tsx ~ line 363 ~ areEqual ~ likedPosts.likedPosts",
      likedPosts.likedPosts
    );

    const userLiked = likedPosts.likedPosts.includes(prevProps.item.item.SK);
    console.log(
      "🚀 ~ file: SocialHome.tsx ~ line 333 ~ areEqual ~ userLiked",
      userLiked
    );
    const userLikedNext = likedPosts.likedPosts.includes(
      nextProps.item.item.SK
    );
    console.log(
      "🚀 ~ file: SocialHome.tsx ~ line 336 ~ areEqual ~ userLikedNext",
      userLikedNext
    );

    return true;
  };

  const _renderItem = (item, index) => {
    const userLiked = likedPosts.likedPosts.includes(item.item.SK);
    return <TotalWithRender item={item} index={index} isLiked={userLiked} />;
  };

  const TotalWithRender = React.memo(TotalRoundItem, areEqual);

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

      for (const item of userRoundData.data) {
        for (const reaction of item.reactions.Items) {
          if (
            reaction.reactingUser === appState.appState["user_name"] &&
            reaction.reactionType === "like"
          ) {
            setLikedPosts((prev) => ({
              likedPosts: [...prev.likedPosts, item.SK]
            }));
          }
        }

        console.log("contenttype", item);
        // Stale post? If so, filter out
        const withinMinutes = (Date.now() - item.timestamp) / 60 / 1000;
        item.withinMinues = withinMinutes;
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
          optimizedData.push(item);
        } else if (item.ContentType === "text") {
          optimizedData.push(item);
        } else if (
          item.ContentType === "image" ||
          item.ContentType === "video"
        ) {
          optimizedData.push(item);
        }
      }
      console.log("Initial done opitimize");
      setSocialPosts(optimizedData);
      appContext.dispatch({
        type: "set_social_posts",
        data: optimizedData
      });
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

  return (
    <>
      <View style={styles.socialFeed}>
        {socialFeedError && <Text>{socialFeedError}</Text>}
        {appState.socialState.posts.length === 0 && !refreshing && (
          <Text>No posts to show! Are you following anyone?</Text>
        )}
        <FlatList
          data={socialPosts}
          // onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          renderItem={(item, index) => _renderItem(item, index)}
          extraData={likedPosts}
          // initialNumToRender={10}
          keyExtractor={(item, index) => `itemsocial${item.SK}`}
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
