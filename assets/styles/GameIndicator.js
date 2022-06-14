import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../styles/Theme";
const { width } = Dimensions.get("window");
export const ipad = width > 1000;
export const styles = StyleSheet.create({
  chipContainer: {
    flex: 1,
    zIndex: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 90,
    right: 16,
    opacity: 0.8
  },
  screenContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Theme.spinGreen1,
    borderRadius: 20
  },
  chip: {
    zIndex: 201,
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: Theme.spinGreen3,
    justifyContent: "center",
    alignItems: "center"
  },
  holeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "100%"
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10
  }
});

export default styles;
