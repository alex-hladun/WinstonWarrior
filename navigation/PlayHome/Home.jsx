import { View, Text, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import styles from "../../assets/styles/Play/HomeStyles";
import { AppContext } from "../../context/AppContext";
import NotificationHandler from "../NotificationHandler";

export function Home({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  const handlePress = () => {
    navigation.push("Course");
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        <View style={styles.homePageContainer}>
          <View style={styles.winstonLogoContainer}>
            <Image
              source={require("../../assets/images/winstonLogo.png")}
              style={styles.winnyImage}
            />
          </View>
          <NotificationHandler />

          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Rounds</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.totalRounds
                  ? appState.statState?.totalRounds
                  : 0}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>HCP</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.hcp
                  ? appState.statState.hcp.toFixed(1)
                  : "NA"}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.avgScore
                  ? appState.statState?.avgScore.toFixed(1)
                  : "NA"}
              </Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best</Text>
              <Text style={styles.boxContent}>
                {appState.statState?.bestScore
                  ? appState.statState?.bestScore
                  : "NA"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.multipleButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Sniper");
            }}
          >
            <View style={[styles.styledSnipeButton]}>
              <Text style={styles.buttonText}>Snipe Times</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress()}>
            <View style={[styles.styledPlayButton, styles.playButton]}>
              <Text style={styles.buttonText}>Play Golf</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
