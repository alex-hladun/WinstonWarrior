import { StyleSheet } from "react-native";
import { Theme } from "../styles/Theme";
import { Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  frame: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: Theme.grannySmith,
    borderColor: "black",
    borderBottomWidth: 0.5
  },
  upperFContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    height: 50,
    borderColor: "black",
    marginTop: 7
    // borderWidth: 1
  },
  nav: {
    height: 95,
    alignSelf: "center",
    top: 0,
    backgroundColor: "red",
    position: "absolute",
    zIndex: 5
  },
  upperText: {
    paddingHorizontal: 2
  },
  commentBar: {
    height: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 15
  },
  score: {
    fontSize: 125
  },
  upperFImage: {
    height: 35,
    width: 35,
    margin: 15,
    marginTop: 5,
    backgroundColor: "black"
  },
  background: {
    backgroundColor: Theme.ygCrayola,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
  comment: {
    fontWeight: "500",
    fontSize: 15
  },
  commentContainer: {
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 10
    // height: 50
  },
  commentText: {
    fontSize: 10
  },
  upperFTextContainer: {
    flexDirection: "column",
    borderColor: "black",
    // borderWidth: 1,
    marginTop: 5
  },
  upperF2: {
    height: 50,
    borderColor: "black"
    // borderWidth: 1
  },
  mediaContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 375 * 0.8,
    backgroundColor: Theme.spinGreen3
  }
});

export default styles;
