import { StyleSheet } from 'react-native';
import { Theme } from '../styles/Theme'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'space-between',
    top: 400,
    // width: '100%',
    height: 475,
    // opacity: 0.75,
    borderColor: 'black',
    // borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    // backgroundColor: 'red',
    position: 'absolute',
  },
  xContainer: {
    backgroundColor: Theme.red,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
    zIndex: 5,
    paddingTop: 5,
    marginVertical: 20,
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100
  },
  homePageContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    width: '100%',
    height: '100%',
    padding: 10,
    // backgroundColor: 'red',
    position: 'absolute',
  },
  clubCardContainer: {
     width: width - 100,
      margin: 25, 
      height: 500, 
      borderRadius: 50, 
      backgroundColor: 'white',
       alignSelf: 'center', 
  },
  clubCardHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 20
  },
  clubTypeText: {
    fontSize: 20
  },
  clubAvgText: {
    fontSize: 30
  },
  scoreContainer: {
    flex: 1,
    zIndex: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
    // top: 100,
    width: '100%',
    height: '100%',
    paddingTop: 50,
    opacity: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    // borderRadius: 15,
    // backgroundColor: 'red',
    position: 'absolute',
  },
  holeRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  club: {
    height: 100,
    width: '30%',
    borderWidth: 2,
    padding: 10,
    backgroundColor: Theme.iconStroke,
    color: Theme.spinGreen4,
    justifyContent: 'center',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    // flex: 1
  },
  clubContainer: {
    // width: '95%',
    flexWrap: 'wrap',
    // height: '60%',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  header: {
    fontSize: 20,
    alignSelf: 'center'
  },
  headerContainer: {
    flexDirection: 'column',
    borderColor: 'black',
    // borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Theme.iconStroke,
    borderRadius: 15,
    // borderStyle: 'solid',
    margin: 10,
    padding: 10,
    width: '60%',
    // height: 150
  },
  hole: {
    justifyContent: 'center',
    // height: 40,
    maxWidth: 80,
    minWidth: 70,
    // backgroundColor: 'green',
    textAlign: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    // alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    flex: 1
  },
  modalContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 30
  },
  boxContainer: {
    flexDirection: 'column',
    backgroundColor: Theme.iconStroke,
    padding: 7,
    margin: 5,
    width: 100,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  trendContainer: {
    flexDirection: 'column',
    backgroundColor: Theme.iconStroke,
    padding: 7,
    margin: 5,
    width: 100,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Theme.chartBGGradientFrom,
    borderBottomWidth: 4,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  chartContainer: {
    flexDirection: 'column',
    borderColor: 'black',
    // borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: Theme.iconStroke,
    borderRadius: 15,
    // borderStyle: 'solid',
    margin: 20,
    padding: 10,
    width: '95%',
    height: 150
  },
  clubMasterContainer: {
    alignSelf: 'center',
    width: '100%'
  },
  boxHeader: {
    textAlign: 'center'
  },
  boxContent: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 30,
  },
  video: {
    width: 400,
    height: 900,
    position: 'absolute',
    zIndex: 5
  },
  bgImage: {
    flex: 1,
    width: '170%',
    // height: '50%',
    left: '5%',
    bottom: '-37%',
    position: 'absolute',
    // zIndex: 10,
    opacity: 0.2,
    resizeMode: 'contain',
  },
  background: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    // // width: '100%',
    // // height: '100%',
    // position: 'absolute'
  },
  winstonText: {
    justifyContent: 'center',
    padding: 20,
    marginBottom: 100,
    borderWidth: 20,
    borderRadius: 10,
    borderColor: 'white',
  },
  txt: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
    // fontFamily: 'tacoma'
  },
  medTxt: {
    color: Theme.spinGreen4,
    fontSize: 30,
    textAlign: 'center'
    // fontFamily: 'tacoma'
  },
  smallTxt: {
    color: Theme.spinGreen4,
    fontSize: 20,
    textAlign: 'center'
    // fontFamily: 'tacoma'
  },
  styledButton: {
    width: 250,
    backgroundColor: Theme.ogButtonGreen,
    padding: 15,
    borderColor: "#f3f8ff",
    justifyContent: 'center',
    // borderWidth: 1,
    margin: 20,
    borderRadius: 24,
    alignSelf: 'center'
  },
  playButton: {
    backgroundColor: Theme.spinGreen2,
  },
  buttonText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    // color: "#f4f4f4"
  },
  roundItem: {
    borderWidth: 2,
    padding: 20,
    margin: 6,
    width: '97%',
    borderStyle: 'solid',
    borderColor: Theme.spinGreen4,
    borderBottomWidth: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
// filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.2));
  },
  roundLeft: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  roundRight: {
    justifyContent: 'center'
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