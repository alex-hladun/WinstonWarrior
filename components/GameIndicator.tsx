import React, { useState, useContext, useEffect, useMemo } from "react";
import { TouchableOpacity, Modal, AppState } from "react-native";
import styles from "../assets/styles/GameIndicator.js";
import { View, Text } from "react-native";
import PlayerStroke from "../assets/svg/PlayerStroke";
import Ranking from "./Ranking/Ranking";
import generateMatchScoring from "../helpers/generateMatchScoring";
import { AppContext } from "../context/AppContext";
interface Props {
  mode?: string;
  timeout: number;
}

const GameIndicator: React.FC<Props> = ({ mode, timeout = 0 }: Props) => {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const appContext = useContext(AppContext);
  const state = appContext.value.state;
  const { rankingArray, carry } = useMemo(() => {
    console.log(
      "🚀 ~ file: GameIndicator.tsx ~ line 30 ~ const{rankingArray,carry}=useMemo ~ state",
      state.playState.p1score
    );
    if (
      state.gameState.team1.name &&
      Object.keys(state.playState.p1score).length > 0
    ) {
      return generateMatchScoring(state);
    } else {
      return { rankingArray: [], carry: undefined };
    }
  }, [state]);

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
              <Text style={styles.headerText}>Carry: {carry}</Text>
              {rankingArray.map((ranking) => (
                <Ranking
                  name={ranking.teamName}
                  position={ranking.position}
                  score={ranking.score}
                />
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default GameIndicator;
