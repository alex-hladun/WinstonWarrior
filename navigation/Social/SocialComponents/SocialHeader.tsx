import * as React from "react";
import socStyles from "../../../assets/styles/SocialStyles";
import { View, Text, Image } from "react-native";
var dayjs = require("dayjs");

const textFont = { fontFamily: "nimbus", fontSize: 20 };
class SocialHeader extends React.PureComponent {
  render() {
    const { social } = this.props;

    return (
      <View style={socStyles.upperFContainer}>
        <View style={socStyles.upperFImage}>
          <Image
            source={require("../../../assets/images/golfer.png")}
            style={socStyles.profileImage}
          />
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

export default SocialHeader;
