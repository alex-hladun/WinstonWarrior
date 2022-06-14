import React, { useState, useEffect } from "react";
import { Text, View } from "../Themed";
import styles from "./RankingStyles";

interface Props {
  name: string;
  position: number;
  score: number;
}
const Ranking: React.FC<Props> = ({ name, position, score }: Props) => {
  return (
    <View key={name} style={[styles.playerRow]}>
      <View
        style={[
          styles.playerPosition,
          position === 1
            ? styles.win
            : position === 2
            ? styles.second
            : position === 3
            ? styles.third
            : styles.fourth
        ]}
      >
        <Text>{position}</Text>
      </View>
      <Text style={styles.player} key={`${name}playewwr`}>
        {name}
      </Text>
      <View style={[styles.playerPosition]}>
        <Text style={styles.bold}>{score}</Text>
      </View>
    </View>
  );
};

export default Ranking;
