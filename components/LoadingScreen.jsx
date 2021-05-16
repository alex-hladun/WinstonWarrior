import * as React from "react";
import { View, Text, Image } from "react-native";
import styles from "../assets/styles/PlayStyles";

export function LoadingScreen() {
  return (
    <View style={styles.background}>
      <Image
        source={require("../assets/images/vectors/Asset52.png")}
        style={styles.bgImage}
      />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Loading...</Text>
      </View>
    </View>
  );
}
