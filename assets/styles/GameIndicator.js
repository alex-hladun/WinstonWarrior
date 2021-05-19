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
    bottom: 100,
    right: 17,
    opacity: 0.8
  },
  screenContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // bottom: 130,
    // left: 50,
    alignSelf: "center",
    backgroundColor: Theme.spinGreen1,
    // width: "85%",
    // height: "50%",
    borderRadius: 20
  },
  chip: {
    zIndex: 201,
    // position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#9FD983",
    justifyContent: "center",
    alignItems: "center"
    // overflow: "hidden"
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
