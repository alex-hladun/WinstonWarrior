import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../styles/Theme";
const { width } = Dimensions.get("window");
export const ipad = width > 1000;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 130,
    left: 50,
    opacity: 0.8
  },
  screenContainer: {
    flex: 1,
    zIndex: 200,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 130,
    left: 50,
    backgroundColor: "red",
    width: "100%",
    height: "100%"
  },
  chip: {
    zIndex: 201,
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#9FD983",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});

export default styles;
