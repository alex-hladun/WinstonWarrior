import React, { useState, useRef, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Modal
} from "react-native";
import styles from "../assets/styles/GameIndicator.js";
import { View, Text } from "react-native";
import PlayerStroke from "../assets/svg/PlayerStroke";
import Ranking from "./Ranking/Ranking";

interface Props {
  mode?: string;
  timeout: number;
}

const GameIndicator: React.FC<Props> = ({ mode, timeout = 0 }: Props) => {
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (timeout > 0) {
      timer = setTimeout(() => {
        setSummaryOpen(false);
        return clearTimeout(timer);
      }, timeout);
    }
    return clearTimeout(timer);
  });
  return (
    <>
      <View style={styles.chipContainer}>
        <TouchableOpacity
          onPress={() => {
            setSummaryOpen(true);
          }}
        >
          <View style={styles.chip}>
            <PlayerStroke />
          </View>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={summaryOpen}>
        <View style={styles.holeContainer}>
          <TouchableOpacity onPress={() => setSummaryOpen(false)}>
            <View style={styles.screenContainer}>
              <Text style={styles.headerText}>{mode}</Text>
              <Ranking name="Alex" position={1} score={5} />
              <Ranking name="Carter" position={2} score={4} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default GameIndicator;
