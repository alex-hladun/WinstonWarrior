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
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import config from "../../settings.json";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";
import { generatePieData } from "../../helpers/generatePieData";
import SocialBody from "./SocialComponents/SocialBody";
import SocialHeader from "./SocialComponents/SocialHeader";
import SocialFooter from "./SocialComponents/SocialFooter";
import generateScoreArray from "./generateScoreArray";
import Auth from "@aws-amplify/auth";

const TotalRoundItem = React.memo(
  ({ item, index, onPress, navigation, visible }) => {
    return (
      <>
        <View style={socStyles.frame}>
          <SocialHeader social={item} index={index} />
          <SocialBody social={item} index={index} visible={visible} />
          <SocialFooter
            social={item}
            index={index}
            onPress={onPress}
            navigation={navigation}
          />
        </View>
      </>
    );
  }
);

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

  const callRenderItem = React.useCallback(
    ({ item, index }) => {
      return (
        <TotalRoundItem
          onPress={() => postLike(item.SK)}
          item={item}
          index={index}
          navigation={navigation}
          visible={visible}
        />
      );
    },
    [postLike, visible]
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
          if (
            reaction.reactingUser === appState.appState["user_name"] &&
            reaction.reactionType === "like"
          ) {
            item.userLiked = true;
          } else {
          }
        }

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
          item.ContentType === "liveround" &&
          item.stats?.player1?.name
        ) {
          item.scoreArray = generateScoreArray(item.stats);
          opitimizedObj[item.SK] = item;
        } else if (
          item.ContentType === "image" ||
          item.ContentType === "video"
        ) {
          opitimizedObj[item.SK] = item;
        }
      }

      setSocialPosts(opitimizedObj);
      setRefreshing(false);
    } catch (err) {
      console.log("error loading", err);
      setSocialFeedError(`Error Loading Data ${err}`);
      await Auth.currentAuthenticatedUser();
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const _onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      setVisible(changed[0].index);
    },
    []
  );

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 70
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
          onViewableItemsChanged={_onViewableItemsChanged}
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
