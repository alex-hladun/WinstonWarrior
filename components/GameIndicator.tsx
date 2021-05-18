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

interface Props {
  mode?: string;
}

const GameIndicator: React.FC<Props> = ({ mode }: Props) => {
  const [summaryOpen, setSummaryOpen] = useState(false);
  return (
    <>
      <TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              console.log("rpess");
              setSummaryOpen(true);
            }}
            style={{ backgroundColor: "red" }}
          >
            <View style={styles.chip}>
              <PlayerStroke />
              <Text>{mode}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={summaryOpen}>
        <View style={styles.screnContainer}>
          <Text>HELLLOOOOO</Text>
        </View>
      </Modal>
    </>
  );
};

export default GameIndicator;
