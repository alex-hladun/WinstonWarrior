import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../styles/Theme";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.spinGreen1,
    alignSelf: "center",
    justifyContent: "space-between",
    // top: 100,
    width: "100%",
    height: "100%",
    // opacity: 0.75,
    borderColor: "black",
    // borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    // padding: 10,
    // backgroundColor: 'red',
    position: "absolute"
  },
  winnyImage: {
    height: 150,
    width: 175
  },
  homePageContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 30
  },
  background: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "absolute"
  },
  signupBackground: {
    // backgroundColor: Theme.spinGreen1,
    flex: 1,
    alignItems: "center"
  },
  holeRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 10
  },
  header: {
    fontSize: 20,
    alignSelf: "center"
  },
  headerContainer: {
    backgroundColor: Theme.red,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 5,
    marginVertical: 20,
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 100
  },
  hole: {
    justifyContent: "center",
    // height: 40,
    maxWidth: 80,
    minWidth: 70,
    // backgroundColor: 'green',
    textAlign: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 15,
    // alignSelf: 'center',
    alignItems: "center",
    padding: 10,
    margin: 10,
    flex: 1
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  boxContainer: {
    flexDirection: "column",
    borderColor: "black",
    // borderWidth: 1,
    backgroundColor: Theme.iconStroke,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
    borderBottomWidth: 4,
    borderRightWidth: 4,
    // borderStyle: 'solid',
    padding: 10,
    width: 100,
    height: 100,
    justifyContent: "center"
  },
  boxHeader: {
    textAlign: "center"
  },
  boxContent: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 30
  },
  video: {
    width: 400,
    height: 900,
    position: "absolute"
  },
  bgImage: {
    flex: 1,
    width: "170%",
    // height: '50%',
    left: "5%",
    bottom: "-37%",
    position: "absolute",
    opacity: 0.2,
    resizeMode: "contain"
  },
  bgTrophy: {
    flex: 1,
    width: "150%",
    // height: '50%',
    left: "5%",
    bottom: "-80%",
    position: "absolute",
    opacity: 0.2,
    resizeMode: "contain"
  },
  backgroundContainer: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    alignItems: "center",
    paddingTop: 50
  },
  winstonText: {
    justifyContent: "center",
    padding: 20,
    marginBottom: 100,
    borderWidth: 20,
    borderRadius: 10,
    borderColor: "white"
  },
  txt: {
    color: "white",
    fontSize: 40
  },
  winstonTxtHome: {
    color: "black",
    fontSize: 40
  },
  winstonTxtLogin: {
    color: "black",
    fontSize: 27
  },
  styledButton: {
    width: 250,
    backgroundColor: Theme.ogButtonGreen,
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: "center",
    margin: 20,
    // top: 250,
    borderRadius: 24,
    alignSelf: "center"
    // position: "absolute"
  },
  styledPlayButton: {
    width: 160,
    backgroundColor: Theme.ogButtonGreen,
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: "center",
    margin: 20,
    // top: 250,
    borderRadius: 24,
    alignSelf: "center"
    // position: "absolute"
  },
  styledSnipeButton: {
    width: 160,
    backgroundColor: Theme.palette[6],
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: "center",
    margin: 20,
    // top: 250,
    borderRadius: 24,
    alignSelf: "center"
    // position: "absolute"
  },
  styledWelcomeButton: {
    width: 250,
    backgroundColor: Theme.ogButtonGreen,
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: "center",
    marginTop: 100,
    borderRadius: 24,
    alignSelf: "center"
  },
  playButton: {
    backgroundColor: Theme.spinGreen2
  },
  quitButton: {
    backgroundColor: Theme.quitRed,
    color: "white",
    marginVertical: 10
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3
  },
  quitButtonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3,
    color: "white"
  },
  scoreContent: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 10,
    width: 250,
    fontSize: 30,
    padding: 20,
    backgroundColor: Theme.spinGreen3,
    borderRadius: 15
  },
  playerText: {
    textAlign: "center"
  },
  playerRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    marginHorizontal: 20,
    // padding: 10,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: Theme.iconStroke,
    // borderWidth: 0.5,
    borderRadius: 100,
    marginVertical: 7
  },
  bold: {
    fontWeight: "bold"
  },
  player: {
    padding: 20,
    marginRight: 5
  },
  welcomeText: {
    alignSelf: "center",
    fontSize: 30,
    padding: 20
  },
  welcomeTextSmall: {
    alignSelf: "center",
    fontSize: 20,
    padding: 20
  },
  signUpText: {
    padding: 20,
    width: 300,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 40,
    marginVertical: 10
    // marginRight:10
  },
  playerPosition: {
    borderRadius: 100,
    width: 48,
    height: 48,
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
  whiteText: {
    color: Theme.iconStroke
  },
  winstonLogoContainer: {
    alignSelf: "center",
    flexDirection: "column",
    // justifyContent: 'flex-start',
    paddingTop: 50,
    // height: 300,
    marginVertical: 20,
    alignItems: "center"
  },
  multipleButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default styles;
