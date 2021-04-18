import { View, Text, Image, Dimensions } from "react-native";
import config from "../../settings.json";
import * as React from "react";
import styles from "../../assets/styles/SocialStyles";
import { Theme } from "../../assets/styles/Theme";
import HeartSymbol from "../../assets/svg/HeartSymbol";
import MessageSymbol from "../../assets/svg/MessageSymbol";
import { Video } from "expo-av";
var dayjs = require("dayjs");
import { PieChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SocialItem = (social) => {
  const withinMinutes = (Date.now() - social.item.timestamp) / 60 / 1000;

  const textFont = { fontFamily: "nimbus", fontSize: 20 };
  const stats = social.item.stats;
  // console.log("🚀 ~ file: Rounds.jsx ~ line 19 ", social);

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
    <View style={styles.frame}>
      <View style={styles.upperFContainer}>
        <View style={styles.upperFImage}>
          <Text></Text>
        </View>
        <View style={styles.upperFTextContainer}>
          <Text style={[styles.upperText, textFont]}>
            {social.item.username}
          </Text>
          <Text style={[styles.upperText, textFont]}>
            {dayjs(social.item.timestamp).format("M/D")}
            {social?.item?.stats?.course && "- " + social?.item?.stats?.course}
          </Text>
        </View>
      </View>
      {social.item.text && social.item.ContentType !== "liveround" && (
        <View style={styles.commentContainer}>
          <Text style={[styles.comment, textFont]}>{social.item.text}</Text>
        </View>
      )}
      {social.item.ImageURI && social.item.ContentType === "image" && (
        <Image
          source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
          style={styles.mediaPicture}
        />
      )}
      {social.item.ImageURI && social.item.ContentType === "video" && (
        <Video
          source={{ uri: `${config.cloudfrontDist}${social.item.ImageURI}` }}
          style={styles.mediaPicture}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
        />
      )}
      {social.item.ContentType === "round" && (
        <View style={[styles.roundCardContainer]}>
          <View style={styles.clubCardHeader}>
            <Text style={styles.clubAvgText}>
              {stats?.frontScore + stats?.backScore}
            </Text>
          </View>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.courseText}>
              {stats?.course ? stats?.course : "Sample Course"}
            </Text>
            <View style={styles.roundCardRow}>
              <View style={styles.roundCardInnerContainer}>
                <Text style={styles.roundCardHeader}>Front</Text>
                <Text style={styles.roundCardScore}>
                  {stats?.frontScore ? stats?.frontScore : ""}
                </Text>
              </View>
              {stats?.backScore && (
                <View style={styles.roundCardRow}>
                  <View style={styles.roundCardInnerContainer}>
                    <Text style={styles.roundCardHeader}>Back</Text>
                    <Text style={styles.roundCardScore}>
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
                style={styles.pieChartStyle}
                center={[3, 0]}
                hasLegend={true}
                accessor={"count"}
                backgroundColor={"transparent"}
                absolute="false"
              />
            )}
          </View>
          <View style={styles.roundCardRow}>
            <View style={styles.roundCardInnerContainer}>
              <Text style={styles.roundCardHeader}>FWY</Text>
              <Text style={styles.roundCardSubText}>
                {stats?.fairways ? stats.fairways : ""} /{" "}
                {stats?.holesPlayed ? stats.holesPlayed : ""}
              </Text>
            </View>
            <View style={styles.roundCardInnerContainer}>
              <Text style={styles.roundCardHeader}>GIR</Text>
              <Text style={styles.roundCardSubText}>
                {stats?.gir ? stats.gir : 0} /{" "}
                {stats?.holesPlayed ? stats?.holesPlayed : ""}
              </Text>
            </View>
            <View style={styles.roundCardInnerContainer}>
              <Text style={styles.roundCardHeader}>SCR</Text>
              <Text style={styles.roundCardSubText}>
                {stats?.gir ? stats?.scrambles : 18} /{" "}
                {stats?.holesPlayed ? stats?.holesPlayed - stats?.gir : ""}
              </Text>
            </View>
          </View>
        </View>
      )}
      {social.item.ContentType === "liveround" && (
        <View style={styles.commentContainer}>
          <Text style={[styles.comment, textFont]}>
            Thru {social.item.stats?.thruHoles}
          </Text>
          <Text style={[styles.comment, textFont]}>
            {social.item.stats?.player1?.name}
            {" - "}
            {social.item.stats?.player1?.score}{" "}
          </Text>
          {social.item.stats?.player2?.name && (
            <Text style={[styles.comment, textFont]}>
              {social.item.stats?.player2?.name}
              {" - "}
              {social.item.stats?.player2?.score}{" "}
            </Text>
          )}
          {social.item.stats?.player3?.name && (
            <Text style={[styles.comment, textFont]}>
              {social.item.stats?.player3?.name}
              {" - "}
              {social.item.stats?.player3?.score}{" "}
            </Text>
          )}
          {social.item.stats?.player4?.name && (
            <Text style={[styles.comment, textFont]}>
              {social.item.stats?.player4?.name}
              {" - "}
              {social.item.stats?.player4?.score}{" "}
            </Text>
          )}
        </View>
      )}
      <View style={styles.commentBar}>
        <TouchableOpacity style={styles.commentLogo}>
          <HeartSymbol fill={true} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentLogo}
          onPress={() => {
            navigator.push;
          }}
        >
          <MessageSymbol />
        </TouchableOpacity>
      </View>
    </View>
  );
};
