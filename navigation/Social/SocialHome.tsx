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
import { authenticatedAxios } from "../../helpers/authenticatedAxios";

export default function SocialHome({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState("");

  const [socialFeedError, setSocialFeedError] = React.useState<
    boolean | string
  >(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const postLike = async (roundId, userLiked) => {
    appContext.dispatch({ type: "like_post", data: roundId });
    try {
      let res;

      if (userLiked) {
        res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
          roundId,
          reactionType: "unlike"
        });
        console.log("unliked", res.status);
      } else {
        res = await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
          roundId,
          reactionType: "like"
        });
        console.log("🚀 ~ liked", res.status);
      }
    } catch (err) {
      console.log("error liking/unliking", err);
    }
  };
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

  class SocialItemHeader extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
    render() {
      const social = this.props.social;
      const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;
      const textFont = { fontFamily: "nimbus", fontSize: 20 };
      const stats = social.item.stats;
      const userLiked = appState.socialState.likedPosts.includes(
        social.item.SK
      );
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
      const isItemChanged =
        this.props.social.item.timestamp != nextProps.social.item.timestamp;

      const originalLike = appState.socialState.likedPosts.includes(
        this.props.social.item.SK
      );

      const newLike = appState.socialState.likedPosts.includes(
        nextProps.social.item.SK
      );

      const likeChanged = originalLike != newLike;
      return isItemChanged || likeChanged;
    }
    render() {
      const social = this.props.social;
      const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;
      const textFont = { fontFamily: "nimbus", fontSize: 20 };
      const stats = social.item.stats;
      const userLiked = appState.socialState.likedPosts.includes(
        social.item.SK
      );
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
      const userLiked = appState.socialState.likedPosts.includes(
        social.item.SK
      );

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

      if (
        social.item.ContentType === "liveround" &&
        withinMinutes > 30 &&
        social.item.stats?.thruHoles !== 18
      ) {
        return null;
      }

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
            <Image
              source={{
                uri: `${config.cloudfrontDist}${social.item.ImageURI}`
              }}
              style={socStyles.mediaPicture}
            />
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

  const _renderItem = (item, index) => {
    const withinMinutes = (Date.now() - item.item.timestamp) / 60 / 1000;

    if (
      item.item.ContentType === "liveround" &&
      withinMinutes > 30 &&
      item.item.stats?.thruHoles !== 18
    ) {
      return null;
    }
    return (
      <>
        <View style={socStyles.frame}>
          <SocialItemHeader social={item} index={index} />
          <SocialItemClass social={item} index={index} />
          <SocialItemFooter social={item} index={index} />
        </View>
      </>
    );
  };
  // const SocialItem = new React.Component((social) => {});

  const fetchRounds = async () => {
    setRefreshing(true);

    let user = appState.appState["user_name"];
    console.log("FETCHING WITH TOKEN ", appState.appState.auth_data);
    try {
      const userRoundData = await authenticatedAxios(
        "GET",
        `${config.api2}rounds?user=${user}`
      );
      console.log("🚀 ", userRoundData.data);
      setSocialFeedError(false);

      let userLiked = false;
      for (const item of userRoundData.data) {
        for (const reaction of item.reactions.Items) {
          if (
            reaction.reactingUser === appState.appState["user_name"] &&
            reaction.reactionType === "like"
          ) {
            appContext.dispatch({
              type: "like_post_initial",
              data: item.SK
            });
          }
        }
      }

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

  const _onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      // console.log("Visible items are", viewableItems);
      // console.log("Changed in this iteration", changed);
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
          data={appState.socialState.posts}
          // onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          renderItem={(item, index) => _renderItem(item, index)}
          // initialNumToRender={10}
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
