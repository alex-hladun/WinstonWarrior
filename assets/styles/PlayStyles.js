import { StyleSheet } from 'react-native';
import { Theme } from '../styles/Theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'space-between',
    top: 100,
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
  homePageContainer: {
    flex: 1,
    // zIndex: 4,
    // backgroundColor: Theme.spinGreen1,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 100,
    width: '100%',
    height: '100%',
    // opacity: 0.75,
    borderColor: 'black',
    // borderStyle: 'solid',
    borderWidth: 0.5,
    // borderRadius: 15,
    padding: 10,
    // backgroundColor: 'red',
    position: 'absolute',
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
  header: {
    fontSize: 20,
    alignSelf: 'center',
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
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
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
    borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: Theme.iconStroke,
    borderRadius: 15,
    // borderStyle: 'solid',
    padding: 10,
    width: 120,
    // height: 150
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
    width: '100%',
    height: '100%',
    position: 'absolute'
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
  scoreContent: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 30,
    padding: 20,
    backgroundColor: Theme.spinGreen3,
    borderRadius: 15,
  },
  whiteText: {
    color: Theme.iconStroke
  }
});

export default styles;