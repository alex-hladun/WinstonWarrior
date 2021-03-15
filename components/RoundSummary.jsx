import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "./Themed";
import { TouchableOpacity, Image, Switch } from "react-native";
import styles from "../assets/styles/PlayStyles";
import { AppContext } from "../context/AppContext";
import XSymbol from "../assets/svg/XSymbol";
import { postRound } from "../db/dbSetup";
import { useHandicap } from "../hooks/useHandicap";
import { netHandicapDiffCalc } from "../helpers/handicap";
import axios from "axios";
import config from "../settings.json";
import { finalRoundPost } from "../helpers/finalRoundPost";

const sumValues = (obj) => {
  if (Object.values(obj).length > 0) {
    return Object.values(obj).reduce((a, b) => a + b);
  }
  return 0;
};

const sumFront = (obj) => {
  let holeArray = Object.keys(obj).filter((a) => a < 10);
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole];
    }
  }
  return sum;
};
const sumBack = (obj) => {
  let holeArray = Object.keys(obj).filter((a) => a > 9);
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole];
    }
  }
  return sum;
};

export default function RoundSummary({ handleRoundSummary }) {
  const appContext = React.useContext(AppContext);
  let appState = appContext.value.state;
  const [postSocialRound, setPostScoialRound] = useState(false);
  const userHandicap = useHandicap(1);

  useEffect(() => {
    getSamplepost();
  }, []);

  const getSamplepost = async () => {
    const finalRoundObj1 = await finalRoundPost(
      appState.playState,
      appState.appState.user_name
    );
    console.log(
      "🚀 ~ file: RoundSummary.jsx ~ line 57 ~ getSamplepost ~ finalRoundObj1",
      finalRoundObj1
    );
  };

  const [scoreArr, setScoreArr] = useState([]);
  const [scoreObj, setScoreObj] = useState({});

  useEffect(() => {
    let newArr = [];
    let newObj = {};

    newArr.push({
      name: appState.appState.user_name,
      totalScore: sumValues(appState.playState.p1score),
      frontScore: sumFront(appState.playState.p1score),
      backScore: sumBack(appState.playState.p1score)
    });

    newObj["p1"] = {
      name: appState.appState.user_name,
      totalScore: sumValues(appState.playState.p1score),
      frontScore: sumFront(appState.playState.p1score),
      backScore: sumBack(appState.playState.p1score)
    };

    if (appState.playState.player_2) {
      newArr.push({
        name: appState.playState.player_2,
        totalScore: sumValues(appState.playState.p2score),
        frontScore: sumFront(appState.playState.p2score),
        backScore: sumBack(appState.playState.p2score)
      });

      newObj["p2"] = {
        name: appState.playState.player_2,
        totalScore: sumValues(appState.playState.p2score),
        frontScore: sumFront(appState.playState.p2score),
        backScore: sumBack(appState.playState.p2score)
      };
    }
    if (appState.playState.player_3) {
      newArr.push({
        name: appState.playState.player_3,
        totalScore: sumValues(appState.playState.p3score),
        frontScore: sumFront(appState.playState.p3score),
        backScore: sumBack(appState.playState.p3score)
      });

      newObj["p3"] = {
        name: appState.playState.player_3,
        totalScore: sumValues(appState.playState.p3score),
        frontScore: sumFront(appState.playState.p3score),
        backScore: sumBack(appState.playState.p3score)
      };
    }
    if (appState.playState.player_4) {
      newArr.push({
        name: appState.playState.player_4,
        totalScore: sumValues(appState.playState.p3score),
        frontScore: sumFront(appState.playState.p4score),
        backScore: sumBack(appState.playState.p4score)
      });
      newObj["p4"] = {
        name: appState.playState.player_4,
        totalScore: sumValues(appState.playState.p4score),
        frontScore: sumFront(appState.playState.p4score),
        backScore: sumBack(appState.playState.p4score)
      };
    }

    const sortedArray = newArr.sort((a, b) =>
      a.totalScore > b.totalScore ? 1 : b.totalScore > a.totalScore ? -1 : 0
    );

    sortedArray[0]["position"] = 1;
    let leadScore = sortedArray[0].totalScore;
    let position = 1;

    for (let i = 1; i < sortedArray.length; i++)
      if (sortedArray[i].totalScore === leadScore) {
        sortedArray[i]["position"] = position;
      } else {
        position = i + 1;
        leadScore = sortedArray[i].totalScore;
        sortedArray[i]["position"] = position;
      }
    // console.log("sorted positions", sortedArray);

    setScoreArr(sortedArray);
    // setScoreObj(newObj)
  }, [appState.playState]);

  let players;

  const toggleRound = () => {
    setPostScoialRound((prev) => !prev);
  };

  if (scoreObj) {
    players = scoreArr
      .sort((a, b) =>
        a.totalScore > b.totalScore ? 1 : b.totalScore > a.totalScore ? -1 : 0
      )
      .map((player, index) => {
        return (
          <View key={`${index}s`} style={[styles.playerRow]}>
            <View
              style={[
                styles.playerPosition,
                player.position === 1
                  ? styles.win
                  : player.position === 2
                  ? styles.second
                  : player.position === 3
                  ? styles.third
                  : styles.fourth
              ]}
            >
              <Text>{player.position}</Text>
            </View>
            <Text style={styles.player} key={`${index}playewwr`}>
              {player.name}
            </Text>
            <View style={[styles.playerPosition]}>
              <Text style={styles.bold}>{player.totalScore}</Text>
            </View>
          </View>
        );
      });
  }

  const handleScoreSubmit = async () => {
    // FWY % AND TOTAL PUTTS AND GIR % BLANK VALUES

    const hcpObj = netHandicapDiffCalc(
      appState.playState.p1score,
      userHandicap,
      appState.playState.p1_rtg,
      appState.playState.p1_slp,
      appState.playState.holeInfo
    );
    const holesPlayed = hcpObj.holesPlayed;
    const calculatedHolesPlayed = hcpObj.calculatedHolesPlayed;
    const calculatedScore = hcpObj.calculatedScore;
    const netHcpDiff = hcpObj.netHcpDiff;

    await postRound(
      calculatedScore,
      appState.playState.roundId,
      netHcpDiff,
      holesPlayed,
      calculatedHolesPlayed
    );
    const finalRoundObj = await finalRoundPost(
      appState.playState,
      appState.appState.user_name
    );
    console.log(
      "🚀 ~ file: RoundSummary.jsx ~ line 216 ~ handleScoreSubmit ~ finalRoundObj",
      finalRoundObj
    );

    // if (appState.playState.liveRound) {
    //   // UDONE ROUND
    //   axios.put(
    //     `${config.api2}rounds`,
    //     {
    //       contentType: "doneliveround",
    //       roundId: appState.playState.liveRound
    //     },
    //     {
    //       headers: {
    //         Authorization: appState.appState.auth_data
    //       }
    //     }
    //   );
    // }
    if (postSocialRound) {
      axios.post(
        `${config.api2}rounds`,
        {
          contentType: "round",
          stats: finalRoundObj,
          course: appState.playState.courseName,
          username: appState.appState.user_name,
          timestamp: Date.now()
        },
        {
          headers: {
            Authorization: appState.appState.auth_data
          }
        }
      );
    }

    appContext.value.doneRound();
    appContext.value.loadInitialStats(1);
  };

  const handleRoundQuit = async () => {
    appContext.value.doneRound();
  };

  return (
    <>
      <View style={styles.backgroundContainer}>
        <Image
          source={require("../assets/images/vectors/Asset40.png")}
          style={styles.bgTrophy}
        />
        <TouchableOpacity onPress={() => handleRoundSummary()}>
          <View style={styles.headerContainer}>
            <Text>
              <XSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>Final Scores</Text>
        {players}
        <Text>Post to Winsta</Text>
        <Switch onValueChange={toggleRound} value={postSocialRound} />
        <TouchableOpacity onPress={() => handleScoreSubmit()}>
          <View style={[styles.styledButton, styles.playButton]}>
            <Text style={styles.buttonText}>Save Round</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRoundQuit()}>
          <View style={[styles.styledButton, styles.quitButton]}>
            <Text style={styles.quitButtonText}>Delete Round</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
