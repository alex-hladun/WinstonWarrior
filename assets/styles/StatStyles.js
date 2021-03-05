import { StyleSheet } from "react-native";
import { Theme } from "../styles/Theme";
import { Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex: 4,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "space-between",
    top: 400,
    // width: '100%',
    height: 475,
    // opacity: 0.75,
    borderColor: "black",
    // borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    // backgroundColor: 'red',
    position: "absolute"
  },
  customDataContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 240,
    marginVertical: 5,
    borderRadius: 16,
    flexDirection: "row",
    alignSelf: "center",
    // justifyContent: "space-around",
    alignItems: "stretch",
    // alignContent: 'space-around',
    backgroundColor: Theme.darkCharcoal
  },
  customText: {
    color: Theme.iconStroke
  },
  customCont1: {
    flexDirection: "column",
    width: "20%",
    backgroundColor: Theme.spinGreen2,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  customCont2: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
  },
  xContainer: {
    backgroundColor: Theme.red,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 50,
    zIndex: 5,
    paddingTop: 5,
    marginVertical: 20,
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 100
  },
  homePageContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    // marginVertical: 10,
    position: "absolute"
  },
  clubCardContainer: {
    width: width - 50,
    margin: 25,
    height: 500,
    borderRadius: 50,
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0,
    // backgroundColor: '#EEBAB2',
    alignSelf: "center"
  },
  roundCardContainer: {
    width: width - 50,
    marginTop: 50,
    // justifyContent: 'space-evenly',
    // margin: 25,
    height: 600,
    borderRadius: 50,
    // alignItems: 'center',
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0,
    backgroundColor: Theme.coolBlue,
    alignSelf: "center"

    //     shadowColor: '#000',
    // shadowOffset: { width: 3, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  roundCardInnerContainer: {
    flexDirection: "column"
  },
  pieChartStyle: {
    left: 0,
    marginVertical: 5,
    alignSelf: "flex-start"
    // marginHorizontal: 10,
  },
  roundCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // paddingVertical: 10,
    marginVertical: 5
  },
  roundCardInnerContainer: {
    flexDirection: "column",
    textAlign: "center"
  },
  roundCardHeader: {
    opacity: 0.3,
    textAlign: "center",
    fontSize: 25
  },
  roundCardScore: {
    opacity: 0.5,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  roundCardSubText: {
    opacity: 0.5,
    textAlign: "center",
    fontSize: 20
    // fontWeight: 'bold'
  },
  clubCardHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    opacity: 0.35,
    height: 100,
    // borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
    // marginHorizontal: 10,
    // padding: 20
  },
  clubTypeText: {
    fontSize: 30,
    color: "#FFF",
    opacity: 1,
    marginHorizontal: 10,
    padding: 20
  },
  clubAvgText: {
    fontSize: 30,
    color: "#FFF",
    opacity: 1,
    marginHorizontal: 10,
    padding: 20
    // fontStyle: 'italic'
  },
  clubCardText: {
    fontSize: 20,
    color: "#FFF",
    opacity: 1
  },
  barChartStyle: {
    opacity: 1,
    padding: 10,
    margin: 10
    // borderBottomRightRadius: 50,
    // borderBottomEndRadius: 50,
    // borderRadius: 50,
    // borderTopLeftRadius: 0,
    // borderTopRightRadius: 0
    // borderBottomLeftRadius: 50
    // margin: 10
  },
  scoreContainer: {
    flex: 1,
    zIndex: 4,
    backgroundColor: "#fff",
    alignSelf: "center",
    // top: 100,
    width: "100%",
    height: "100%",
    paddingTop: 50,
    opacity: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    // borderRadius: 15,
    // backgroundColor: 'red',
    position: "absolute"
  },
  holeRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  club: {
    height: 100,
    width: "30%",
    borderWidth: 2,
    padding: 10,
    backgroundColor: Theme.iconStroke,
    color: Theme.spinGreen4,
    justifyContent: "center",
    textAlign: "center",
    borderStyle: "solid",
    // borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5
    // flex: 1
  },
  clubContainer: {
    // width: '95%',
    flexWrap: "wrap",
    // height: '60%',
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  header: {
    fontSize: 20,
    alignSelf: "center"
  },
  headerContainer: {
    flexDirection: "column",
    borderColor: "black",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: Theme.iconStroke,
    borderRadius: 15,
    margin: 5,
    padding: 5,
    width: "60%"
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
  modalContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    flexDirection: "column"
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    margin: 30
  },
  boxContainer: {
    flexDirection: "column",
    // backgroundColor: Theme.iconStroke,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 7,
    width: 90,
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3

    // flexDirection: 'column',
    // backgroundColor: Theme.iconStroke,
    // paddingVertical: 5,
    // margin: 3,
    // width: 100,
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: Theme.spinGreen4,
    // borderBottomWidth: 3,
    // borderRadius: 20,
    // alignSelf: 'center',
    // justifyContent: 'space-between',
  },
  selectBox: {
    backgroundColor: Theme.coolBlue
  },
  selectBoxHole: {
    backgroundColor: Theme.babyBlue
  },
  trendContainer: {
    flexDirection: "column",
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 7,
    width: 90,
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3

    // flexDirection: 'column',
    // backgroundColor: Theme.iconStroke,
    // paddingVertical: 5,
    // margin: 3,
    // width: 100,
    // borderWidth: 2,
    // borderStyle: 'solid',
    // borderColor: Theme.charcoal,
    // borderBottomWidth: 3,
    // borderRadius: 20,
    // alignSelf: 'center',
    // justifyContent: 'space-between',
  },
  boxHeader: {
    textAlign: "center",
    // width: 90,
    color: "black",
    // backgroundColor: 'black',
    justifyContent: "center",
    // alignItems: 'center',
    opacity: 0.35,
    // borderRadius: 100,
    // height: 30,
    // borderRadius: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  boxHeaderText: {
    alignSelf: "center",
    // fontSize: 30,
    // color: '#FFF',
    opacity: 1
    // marginHorizontal: 10,
    // padding: 2
  },
  boxContent: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    // marginTop: 10,
    paddingVertical: 10,
    fontSize: 30
  },
  chartContainer: {
    flexDirection: "column",
    borderColor: "black",
    // borderWidth: 1,
    alignSelf: "center",
    backgroundColor: Theme.iconStroke,
    borderRadius: 15,
    // borderStyle: 'solid',
    margin: 20,
    padding: 10,
    width: "95%",
    height: 150
  },
  clubMasterContainer: {
    alignSelf: "center",
    width: "100%"
  },
  video: {
    width: 400,
    height: 900,
    position: "absolute",
    zIndex: 5
  },
  bgImage: {
    flex: 1,
    width: "150%",
    // height: '50%',
    left: "5%",
    bottom: "-95%",
    position: "absolute",
    // zIndex: 10,
    opacity: 0.2,
    resizeMode: "contain"
  },
  background: {
    backgroundColor: Theme.spinGreen1,
    flex: 1
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
    fontSize: 40,
    textAlign: "center"
    // fontFamily: 'tacoma'
  },
  medTxt: {
    color: "#000",
    opacity: 0.7,
    fontSize: 30,
    textAlign: "center"
    // fontFamily: 'tacoma'
  },
  smallTxt: {
    // color: Theme.spinGreen4,
    color: "#000",
    opacity: 0.6,
    fontSize: 20,
    textAlign: "center"
    // fontFamily: 'tacoma'
  },
  styledButton: {
    width: 250,
    backgroundColor: Theme.ogButtonGreen,
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: "center",
    // borderWidth: 1,
    margin: 20,
    borderRadius: 24,
    alignSelf: "center"
  },
  playButton: {
    backgroundColor: Theme.spinGreen2
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3
    // color: "#f4f4f4"
  },
  roundItem: {
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 4,
    width: "97%",
    borderStyle: "solid",
    borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row"
    // filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.2));
  },
  nineHoleRoundItem: {
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 4,
    width: "97%",
    borderStyle: "solid",
    borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    backgroundColor: Theme.nineHoleRound,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row"
    // filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.2));
  },
  roundLeft: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  roundRight: {
    justifyContent: "center"
  },
  roundScoreText: {
    fontSize: 50
  },
  roundCourseName: {
    fontSize: 18
  },
  roundDate: {
    fontSize: 12
  }
});

export default styles;
