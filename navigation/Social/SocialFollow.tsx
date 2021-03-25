import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import * as React from "react";
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";
import { StatContext } from "../../context/StatContext";
import { AppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import config from "../../settings.json";
import { Audio, Video } from "expo-av";
import FollowLogo from "../../assets/svg/FollowLogo";
import FollowCheck from "../../assets/svg/FollowCheck";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";

export default function SocialFollow({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  const [followFeed, setFollowFeed] = React.useState([]);
  const [followFeedError, setFollowFeedError] = React.useState<
    boolean | string
  >(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const followUser = (followedUser) => {
    console.log("following", followedUser);
    authenticatedAxios("PUT", `${config.api2}users`, {
      followedUser,
      followType: "follow"
    });
    appContext.dispatch({
      type: "follow_user",
      data: followedUser
    });
  };
  const unfollowUser = (followedUser) => {
    console.log("unfollowing", followedUser);
    authenticatedAxios("PUT", `${config.api2}users`, {
      followedUser,
      followType: "unfollow"
    });
    appContext.dispatch({
      type: "unfollow_user",
      data: followedUser
    });
  };
  const FollowItem = (item) => {
    // console.log(
    //   "🚀 ~ file: SocialFollow.tsx ~ line 15 ~ FollowItem ~ item",
    //   item
    // );

    return (
      <View style={socStyles.roundItem}>
        <View style={socStyles.roundLeft}>
          <Text style={socStyles.roundCourseName}>{item.item.username}</Text>
        </View>
        <View style={socStyles.roundRight}>
          {!appState.socialState.followingUsers.includes(
            item.item.username
          ) && (
            <TouchableOpacity onPress={() => followUser(item.item.username)}>
              <FollowLogo />
            </TouchableOpacity>
          )}
          {appState.socialState.followingUsers.includes(item.item.username) && (
            <TouchableOpacity onPress={() => unfollowUser(item.item.username)}>
              <FollowCheck />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const fetchUsers = async () => {
    setRefreshing(true);

    try {
      const userFollowData = await authenticatedAxios(
        "GET",
        `${config.api2}users?user=${appState.appState["user_name"]}`
      );
      console.log("🚀 ", userFollowData.data);
      setFollowFeedError(false);

      const followingUsernames = [];

      userFollowData.data.forEach((item) => {
        if (item.following) {
          followingUsernames.push(item.username);
        }
      });
      console.log(
        "🚀 ~ file: SocialFollow.tsx ~ line 102 ~ fetchUsers ~ followingUsernames",
        followingUsernames
      );

      appContext.dispatch({
        type: "set_social_users",
        data: userFollowData.data
      });
      appContext.dispatch({
        type: "set_social_following",
        data: followingUsernames
      });

      setFollowFeed(userFollowData.data);
    } catch (err) {
      console.log("error loading", err);
      setFollowFeedError(`Error Loading Data ${err}`);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <View style={styles.socialFeed}>
        {followFeedError && <Text>Error loading data {followFeedError}</Text>}
        <FlatList
          data={followFeed}
          renderItem={FollowItem}
          keyExtractor={(item, index) => `itemsocial${index}`}
          refreshing={refreshing}
          extraData={refreshing}
          onRefresh={fetchUsers}
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
