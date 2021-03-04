import React, { useState, useEffect } from "react";
import { Text, View } from "./Themed";
import { TouchableOpacity, Image } from "react-native";
import styles from "../assets/styles/ScoreStyles";
import { Picker } from "@react-native-community/picker";
import Slider from "@react-native-community/slider";
import CheckSymbol from "../assets/svg/CheckSymbol";
import db, { getScore, postScore } from "../db/dbSetup";
import { AppContext } from "../context/AppContext";
import XSymbol from "../assets/svg/XSymbol";
import { Theme } from "../assets/styles/Theme";
import LeftSymbol from "../assets/svg/LeftSymbol";
import RightSymbol from "../assets/svg/RightSymbol";
import axios from "axios";
import config from "../settings.json";
import { calculatedHolesPlayed } from "../helpers/handicap";
import { liveRoundCalc } from "../helpers/liveRoundCalc";

export default function Score({
  holeNum,
  setHole,
  handleScoreEnter,
  handleHoleInc,
  handleHoleDec
}) {
  const appContext = React.useContext(AppContext);
  let appState = appContext.value.state;
  const holeInfo = appState.playState.holeInfo;
  const [playerArray, setPlayerArray] = useState([]);
  const holeID = appState.playState.hole_id;
  const p1ps = appState.playState.p1score[holeNum];
  const p2ps = appState.playState.p2score[holeNum];
  const p3ps = appState.playState.p3score[holeNum];
  const p4ps = appState.playState.p4score[holeNum];
  const [score, setScore] = useState(p1ps ? p1ps : holeInfo[holeNum].par);
  const [p2score, setP2Score] = useState(p2ps ? p2ps : holeInfo[holeNum].par);
  const [p3score, setP3Score] = useState(p3ps ? p3ps : holeInfo[holeNum].par);
  const [p4score, setP4Score] = useState(p4ps ? p4ps : holeInfo[holeNum].par);
  const [putts, setPutts] = useState(2);
  const [penalty, setPenalty] = useState(0);
  const [teeShot, setTeeShot] = useState(50);
  const [approach, setApproach] = useState(50);
  const [chip, setChip] = useState(50);
  const [putting, setPutting] = useState(50);

  useEffect(() => {
    console.log(
      "LIVEROUND",
      liveRoundCalc(appState.playState, appState.appState.user_name)
    );
    console.log(JSON.stringify(appState.playState.roundId));
  }, []);

  useEffect(() => {
    console.log(`HOLE ID OF ${holeID}`);
    let newArr = [appState.appState.user_name];
    if (appState.playState.player_2) {
      newArr.push(appState.playState.player_2);
    }
    if (appState.playState.player_3) {
      newArr.push(appState.playState.player_3);
    }
    if (appState.playState.player_4) {
      newArr.push(appState.playState.player_4);
    }

    setPlayerArray(newArr);
  }, [appContext]);

  const players = playerArray.map((player, index) => {
    if (index !== 0) {
      return (
        <Text style={styles.header} key={`${index}player`}>
          {player}
        </Text>
      );
    }
  });

  const resetSliders = (holeDiff) => {
    // holeDiff exists because it uses the current holeNum in state, not the 'new' value
    setScore(holeInfo[holeNum + holeDiff].par);
    setP2Score(holeInfo[holeNum + holeDiff].par);
    setP3Score(holeInfo[holeNum + holeDiff].par);
    setP4Score(holeInfo[holeNum + holeDiff].par);
    setPutts(2);
    setPenalty(0);
    setTeeShot(50);
  };

  const handleScoreSubmit = async (hideModal = true, delta = 0) => {
    console.log(`POSTING WITH HOLEID OF ${holeID}`);

    if (putts > score - 1) {
      console.log("INVALID PUTTS");
      setPutts(score - 1);
      return;
    }

    let gir = 0;
    if (score - putts + 2 <= holeInfo[holeNum].par) {
      gir = 1;
    }

    let ud = 0;
    if (gir === 0 && score <= holeInfo[holeNum].par) {
      ud = 1;
    }
    await postScore(
      holeID,
      holeNum,
      appState.playState.roundId,
      score,
      putts,
      penalty,
      teeShot,
      approach,
      chip,
      putting,
      gir,
      ud
    );
    appContext.dispatch({
      type: "set_p1_score",
      hole: holeNum,
      score: score
    });

    if (appState.playState.player_2) {
      await postScore(
        holeID,
        holeNum,
        appState.playState.player_2_rd_id,
        p2score
      );
      appContext.dispatch({
        type: "set_p2_score",
        hole: holeNum,
        score: p2score
      });
    }
    if (appState.playState.player_3) {
      await postScore(
        holeID,
        holeNum,
        appState.playState.player_3_rd_id,
        p3score
      );
      appContext.dispatch({
        type: "set_p3_score",
        hole: holeNum,
        score: p3score
      });
    }
    if (appState.playState.player_4) {
      await postScore(holeID, holeNum, appState.playState.player_4, p4score);
      appContext.dispatch({
        type: "set_p4_score",
        hole: holeNum,
        score: p4score
      });
    }

    getScore(appState.playState.roundId);

    if (delta === 0 || holeNum === 18) {
      setHole(holeNum + 1);
    } else if (delta === 1) {
      setHole(holeNum + 1, false);
      resetSliders(1);
    } else if (delta === -1) {
      setHole(holeNum - 1, false);
      resetSliders(-1);
    }
    appContext.value.reloadHoleStats(appState.playState.courseId, holeNum);

    if (appState.playState.liveRound) {
      const toalInfo = appState.playState.holeInfo;
      console.log(
        "🚀 ~ file: Score.jsx ~ line 178 ~ handleScoreSubmit ~ toalInfo",
        toalInfo
      );
      // Some sort of identifier that lets us save the round.

      try {
        const putObj = liveRoundCalc(
          appState.playState,
          appState.appState.user_name
        );
        axios.put(`${config.api2}rounds`, putObj, {
          headers: {
            Authorization: appState.appState.auth_data
          }
        });
      } catch (err) {}
    }
  };

  const pickWidth = 50;

  return (
    <>
      <View style={styles.backgroundContainer}>
        <Image
          source={require("../assets/images/vectors/balldrop.png")}
          style={styles.bgImage}
        />
        <TouchableOpacity onPress={() => handleScoreEnter()}>
          <View style={styles.exitHeader}>
            <Text style={{ alignSelf: "center" }}>
              <XSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.holeHeader]}>
          <Text style={styles.holeNumber}>{holeNum}</Text>

          <Text style={styles.parNumber}>Par {holeInfo[holeNum].par}</Text>
        </View>
        <View style={[styles.scoreHeader]}>
          <Text style={styles.header}>{playerArray[0]}</Text>
          <Text style={styles.header}>Putts</Text>
          <Text style={styles.header}>Penalty</Text>
          {players}
        </View>
        <View style={styles.pickerRow}>
          <Picker
            style={styles.pickerMaster}
            onValueChange={(itemValue, itemIndex) => {
              setScore(itemValue);
            }}
            selectedValue={score}
          >
            <Picker.Item
              color={p1ps === 1 ? "blue" : ""}
              style={[styles.pickerStyle, styles.prevScore]}
              label="1"
              value={1}
            />
            <Picker.Item
              color={p1ps === 2 ? "blue" : ""}
              style={styles.pickerStyle}
              label="2"
              value={2}
            />
            <Picker.Item color={p1ps === 3 ? "blue" : ""} label="3" value={3} />
            <Picker.Item color={p1ps === 4 ? "blue" : ""} label="4" value={4} />
            <Picker.Item color={p1ps === 5 ? "blue" : ""} label="5" value={5} />
            <Picker.Item color={p1ps === 6 ? "blue" : ""} label="6" value={6} />
            <Picker.Item color={p1ps === 7 ? "blue" : ""} label="7" value={7} />
            <Picker.Item color={p1ps === 8 ? "blue" : ""} label="8" value={8} />
            <Picker.Item color={p1ps === 9 ? "blue" : ""} label="9" value={9} />
            <Picker.Item
              color={p1ps === 10 ? "blue" : ""}
              label="10"
              value={10}
            />
          </Picker>

          <Picker
            style={styles.pickerMaster}
            onValueChange={(itemValue, itemIndex) => {
              setPutts(itemValue);
            }}
            selectedValue={putts}
          >
            <Picker.Item label="0" value={0} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
          </Picker>
          <Picker
            style={styles.pickerMaster}
            onValueChange={(itemValue, itemIndex) => {
              setPenalty(itemValue);
            }}
            selectedValue={penalty}
          >
            <Picker.Item label="0" value={0} />
            <Picker.Item color={"red"} label="1" value={1} />
            <Picker.Item color={"red"} label="2" value={2} />
            <Picker.Item color={"red"} label="3" value={3} />
            <Picker.Item color={"red"} label="4" value={4} />
            <Picker.Item color={"red"} label="5" value={5} />
            <Picker.Item color={"red"} label="6" value={6} />
            <Picker.Item color={"red"} label="7" value={7} />
            <Picker.Item color={"red"} label="8" value={8} />
            <Picker.Item color={"red"} label="9" value={9} />
          </Picker>

          {appState.playState.player_2 && (
            <Picker
              style={styles.pickerMaster}
              onValueChange={(itemValue, itemIndex) => {
                setP2Score(itemValue);
              }}
              selectedValue={p2score}
            >
              <Picker.Item
                color={p2ps === 1 ? "blue" : ""}
                style={styles.pickerStyle}
                label="1"
                value={1}
              />
              <Picker.Item
                color={p2ps === 2 ? "blue" : ""}
                label="2"
                value={2}
              />
              <Picker.Item
                color={p2ps === 3 ? "blue" : ""}
                label="3"
                value={3}
              />
              <Picker.Item
                color={p2ps === 4 ? "blue" : ""}
                label="4"
                value={4}
              />
              <Picker.Item
                color={p2ps === 5 ? "blue" : ""}
                label="5"
                value={5}
              />
              <Picker.Item
                color={p2ps === 6 ? "blue" : ""}
                label="6"
                value={6}
              />
              <Picker.Item
                color={p2ps === 7 ? "blue" : ""}
                label="7"
                value={7}
              />
              <Picker.Item
                color={p2ps === 8 ? "blue" : ""}
                label="8"
                value={8}
              />
              <Picker.Item
                color={p2ps === 9 ? "blue" : ""}
                label="9"
                value={9}
              />
            </Picker>
          )}

          {appState.playState.player_3 && (
            <Picker
              style={styles.pickerMaster}
              onValueChange={(itemValue, itemIndex) => {
                setP3Score(itemValue);
              }}
              selectedValue={p3score}
            >
              <Picker.Item
                color={p3ps === 1 ? "blue" : ""}
                style={styles.pickerStyle}
                label="1"
                value={1}
              />
              <Picker.Item
                color={p3ps === 2 ? "blue" : ""}
                label="2"
                value={2}
              />
              <Picker.Item
                color={p3ps === 3 ? "blue" : ""}
                label="3"
                value={3}
              />
              <Picker.Item
                color={p3ps === 4 ? "blue" : ""}
                label="4"
                value={4}
              />
              <Picker.Item
                color={p3ps === 5 ? "blue" : ""}
                label="5"
                value={5}
              />
              <Picker.Item
                color={p3ps === 6 ? "blue" : ""}
                label="6"
                value={6}
              />
              <Picker.Item
                color={p3ps === 7 ? "blue" : ""}
                label="7"
                value={7}
              />
              <Picker.Item
                color={p3ps === 8 ? "blue" : ""}
                label="8"
                value={8}
              />
              <Picker.Item
                color={p3ps === 9 ? "blue" : ""}
                label="9"
                value={9}
              />
            </Picker>
          )}
          {appState.playState.player_4 && (
            <Picker
              style={[{ height: 200, width: pickWidth }]}
              onValueChange={(itemValue, itemIndex) => {
                setP4Score(itemValue);
              }}
              selectedValue={p4score}
            >
              <Picker.Item
                color={p4ps === 1 ? "blue" : ""}
                style={styles.pickerStyle}
                label="1"
                value={1}
              />
              <Picker.Item
                color={p4ps === 2 ? "blue" : ""}
                label="2"
                value={2}
              />
              <Picker.Item
                color={p4ps === 3 ? "blue" : ""}
                label="3"
                value={3}
              />
              <Picker.Item
                color={p4ps === 4 ? "blue" : ""}
                label="4"
                value={4}
              />
              <Picker.Item
                color={p4ps === 5 ? "blue" : ""}
                label="5"
                value={5}
              />
              <Picker.Item
                color={p4ps === 6 ? "blue" : ""}
                label="6"
                value={6}
              />
              <Picker.Item
                color={p4ps === 7 ? "blue" : ""}
                label="7"
                value={7}
              />
              <Picker.Item
                color={p4ps === 8 ? "blue" : ""}
                label="8"
                value={8}
              />
              <Picker.Item
                color={p4ps === 9 ? "blue" : ""}
                label="9"
                value={9}
              />
            </Picker>
          )}
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>Tee Shot</Text>
        </View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor={Theme.spinGreen3}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            value={teeShot}
            step={25}
            onSlidingComplete={(val) => setTeeShot(val)}
            // onSlidingStart={(val) => setTeeShot(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>Left</Text>
          <Text>Fairway</Text>
          <Text>Right</Text>
        </View>
        <View style={styles.bottomScoreHeader}>
          <TouchableOpacity onPress={(event) => handleScoreSubmit(false, -1)}>
            <View style={[styles.checkSymbol, styles.moveSymbol]}>
              <Text>
                <LeftSymbol />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => handleScoreSubmit()}>
            <View style={[styles.checkSymbol]}>
              <Text>
                <CheckSymbol />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => handleScoreSubmit(false, 1)}>
            <View style={[styles.checkSymbol, styles.moveSymbol]}>
              <Text>
                <RightSymbol />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
