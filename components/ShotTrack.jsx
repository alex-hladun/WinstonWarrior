import React, { useState, useEffect } from "react";
import { Text, View } from "./Themed";
import {
  StyleSheet,
  Easing,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  Animated,
  Alert,
  Modal
} from "react-native";
import styles from "../assets/styles/ScoreStyles";
import Slider from "@react-native-community/slider";
import CheckSymbol from "../assets/svg/CheckSymbol";
import { AppContext } from "../context/AppContext";
import { StatContext } from "../context/StatContext";
import { postShot } from "../db/dbSetup";
import XSymbol from "../assets/svg/XSymbol";
import { Theme } from "../assets/styles/Theme";

export default function ShotTrack({ distance, handleTrackViewClose }) {
  const appContext = React.useContext(AppContext);
  const statContext = React.useContext(StatContext);
  const appState = appContext.value.state;
  const [club, setClub] = useState(null);
  const [effort, setEffort] = useState(100);

  let clubArray;
  let clubList;
  clubArray = appState.appState.clubList;
  if (clubArray) {
    clubList = clubArray.map((clb, i) => {
      return (
        <TouchableOpacity
          key={`clubchoice${i}`}
          style={[styles.club, clb.club_id === club && styles.selected]}
          onPress={() => setClub(clb.club_id)}
        >
          <View key={`cl${i}`}>
            <Text
              key={`club${i}`}
              onPress={() => setClub(clb.club_id)}
              style={[styles.text, clb.club_id === club && styles.selected]}
            >
              {clb.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  const handleSubmit = async () => {
    await postShot(1, club, effort, distance);
    appContext.value.refreshShotStats(1);
    handleTrackViewClose();
  };

  return (
    <>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => handleTrackViewClose()}>
          <View style={[styles.exitHeader]}>
            <Text>
              <XSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.pickerHeader]}>
          <Text>Distance</Text>
        </View>

        <View style={[styles.pickerHeader]}>
          <Text style={styles.distanceHeader}>{distance} yds</Text>
        </View>
        <View style={styles.clubContainer}>{clubList}</View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={Theme.spinGreen3}
            maximumTrackTintColor="#FFFFFF"
            value={effort}
            onSlidingComplete={(val) => setEffort(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>Easy</Text>
          <Text>Hard</Text>
        </View>

        <View style={styles.pickerHeader}>
          <TouchableOpacity onPress={(event) => handleSubmit()}>
            <View style={[styles.checkSymbol]}>
              <Text>
                <CheckSymbol color={Theme.iconStroke} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
