import * as React from "react";
import styles from "../../../assets/styles/PlayStyles";
import socStyles from "../../../assets/styles/SocialStyles";
import { View, TouchableOpacity, Alert } from "react-native";
import config from "../../../settings.json";
import HeartSymbol from "../../../assets/svg/HeartSymbol";
import MessageSymbol from "../../../assets/svg/MessageSymbol";
import DeleteIcon from "../../../assets/svg/DeleteIcon";
import { authenticatedAxios } from "../../../helpers/authenticatedAxios";

const textFont = { fontFamily: "nimbus", fontSize: 20 };

class SocialFooter extends React.PureComponent {
  render() {
    const { social, navigation } = this.props;

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

export default SocialFooter;
