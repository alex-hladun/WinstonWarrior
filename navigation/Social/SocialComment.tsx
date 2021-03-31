import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from "react-native";
import * as React from "react";
import styles from "../../assets/styles/PlayStyles";
import socStyles from "../../assets/styles/SocialStyles";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import config from "../../settings.json";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";

const postText = async ({ navigation, route }) => {
  try {
    await authenticatedAxios("PUT", `${config.api2}put-reaction`, {
      roundId: route.params.roundId,
      reactionType: "comment",
      reactionComment: text
    });
    navigation.goBack();
  } catch (err) {
    setError("Error posting to database");
    console.log("error posting text", err);
  }
};

const Comment = ({ item, index }) => {
  console.log(
    "🚀 ~ file: SocialComment.tsx ~ line 33 ~ renderItem ~ item",
    item
  );
  if (item.reactionType !== "like") {
    return (
      <>
        <View style={socStyles.upperFContainer}>
          <View style={socStyles.upperFImage}></View>
          <View style={socStyles.upperFTextContainer}>
            <Text style={socStyles.usernameText} key={item.PK}>
              {item.reactingUser}
            </Text>
            <Text key={item.SK}> {item.reactionType}</Text>
          </View>
        </View>
      </>
    );
  }
  return null;
};

export default function SocialComment({ navigation, route }) {
  const reactions = route.params.reactions.Items.map((item, index) => {});
  const appContext = React.useContext(AppContext);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const renderItem = ({ item }) => {
    return <Comment item={item} />;
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
      </View>
      <View style={styles.socialFeed}>
        {error !== "" && (
          <View>
            <Text>Error! {error}</Text>
          </View>
        )}
        <FlatList data={route.params.reactions.Items} renderItem={renderItem} />

        {/* {reactions} */}
        <View style={socStyles.textBox}>
          <TextInput
            style={socStyles.textBox}
            multiline={false}
            onChangeText={(text) => setText(text)}
            autoFocus
          >
            {text}
          </TextInput>
        </View>
        <TouchableOpacity onPress={postText}>
          <View style={styles.styledButton}>
            <Text style={styles.buttonText}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
