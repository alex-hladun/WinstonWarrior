import * as React from "react";
import socStyles from "../../../assets/styles/SocialStyles";
import playStyles from "../../../assets/styles/PlayStyles";
import { View, Text, Dimensions } from "react-native";
import CachedImage from "../CachedImage";
import config from "../../../settings.json";
import { Video } from "expo-av";
import { PieChart } from "react-native-chart-kit";
import { pieChartConfig } from "../../../helpers/generatePieData";

const textFont = { fontFamily: "nimbus", fontSize: 20 };

const SocialBody = React.memo(({ social, index, visible }) => {
  const content = social;
  const stats = content.stats;
  let sortedPlayers;

  if (content.scoreArray) {
    sortedPlayers = content.scoreArray.map((player, index2) => {
      console.log(
        "🚀 ~ file: SocialBody.tsx ~ line 24 ~ sortedPlayers=content.scoreArray.map ~ player",
        player
      );
      return (
        <View key={`${index2}s2`} style={[playStyles.playerRow]}>
          <View
            style={[
              playStyles.playerPosition,
              player.position === 1
                ? playStyles.win
                : player.position === 2
                ? playStyles.second
                : player.position === 3
                ? playStyles.third
                : playStyles.fourth
            ]}
          >
            <Text>{player.position}</Text>
          </View>
          <Text style={playStyles.player} key={`${index}playewwr`}>
            {player.name}
          </Text>
          <View style={[playStyles.playerPosition]}>
            <Text style={playStyles.bold}>
              {player.score > 0 ? "+" : player.score < 0 ? "-" : ""}
              {player.score}
            </Text>
          </View>
        </View>
      );
    });
  }

  return (
    <>
      {content.ContentType !== "liveround" && (
        <View style={socStyles.commentContainer}>
          {content?.text !== "" && content.text !== null && (
            <Text style={[socStyles.comment, textFont]}>{content.text}</Text>
          )}
        </View>
      )}
      {content.ImageURI && content.ContentType === "image" && (
        <View style={socStyles.topMargin}>
          <CachedImage
            source={{
              uri: `${config.cloudfrontDist}${content.ImageURI}`
            }}
            style={socStyles.mediaPicture}
            cacheKey={content.SK}
          />
        </View>
      )}
      {content.ImageURI && content.ContentType === "video" && (
        <View style={socStyles.topMargin}>
          <Video
            source={{
              uri: `${config.cloudfrontDist}${content.ImageURI}`
            }}
            style={socStyles.mediaPicture}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={index === visible}
            isLooping
          />
        </View>
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
          <View style={socStyles.liveRoundSummary}>
            <View style={socStyles.marginContainer}>
              <Text style={[socStyles.header, textFont]}>
                Thru {content.stats?.thruHoles}
              </Text>
            </View>
            {sortedPlayers}
          </View>
        </View>
      )}
    </>
  );
});
export default SocialBody;
