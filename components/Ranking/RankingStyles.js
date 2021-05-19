import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../assets/styles/Theme";

export const styles = StyleSheet.create({
  playerRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: Theme.iconStroke,
    borderRadius: 100,
    marginVertical: 7
  },
  playerPosition: {
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    // padding: 5
    marginHorizontal: 6
  },
  win: {
    backgroundColor: "gold"
  },
  second: {
    backgroundColor: "silver"
  },
  third: {
    backgroundColor: "yellow"
  },
  fourth: {
    // backgroundColor: 'yellow',
  },
  player: {
    padding: 20,
    marginRight: 5
  },
  bold: {
    fontWeight: "bold"
  }
});

export default styles;
