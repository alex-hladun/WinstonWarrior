import { StyleSheet } from 'react-native';
import { Theme } from '../styles/Theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    // zIndex: 4,
    // backgroundColor: Theme.spinGreen1,
    alignSelf: 'center',
    top: 100,
    justifyContent: 'flex-start',
  },
  bgImage: {
    flex: 1,
    width: '150%',
    // height: '50%',
    right: '5%',
    top: '-20%',
    position: 'absolute',
    // zIndex: 10,
    opacity: 0.15,
    resizeMode: 'contain',
  },
  background: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  courseText: {
    textAlign: 'center'
  },
  img: {
    width: 75,
    height: 75
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  courseContainer: {
    backgroundColor: Theme.iconStroke,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    // borderWidth: 0.5,
    borderRadius: 20
  },
  stroke: {
    color: Theme.iconStroke,
  },
  addPlayer: {
    alignSelf: 'flex-start',
    width: 65,
    height: 65,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    // borderWidth: 0.5,
    borderRadius: 100,
    backgroundColor: Theme.spinGreen2,
  },
  playerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    // padding: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: Theme.iconStroke,
    // borderWidth: 0.5,
    borderRadius: 100,
    marginVertical: 7
  },
  removePlayer: {
    borderColor: 'black',
    borderStyle: 'solid',
    // borderWidth: 0.5,
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: Theme.red,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5
    marginHorizontal: 6
  },
  player: {
    padding: 20,
    width: 200,
    // marginRight:10
  },
  startRound: {
    alignSelf: 'flex-start',
    // width: 65,
    // height: 65,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 0
  },
  styledButton: {
    width: 175,
    backgroundColor: "#f3f8ff",
    padding: 10,
    borderColor: "black",
    justifyContent: 'center',
    // borderWidth: 1,
    margin: 10,
    borderRadius: 24,
    alignSelf: 'center'
  },
  startRoundButton: {
    width: 225,
    backgroundColor: "#f3f8ff",
    padding: 15,
    borderColor: "black",
    justifyContent: 'center',
    // borderWidth: 1,
    margin: 10,
    borderRadius: 24,
    alignSelf: 'center'
  },
  playButton: {
    backgroundColor: Theme.spinGreen2,
  },
  startButton: {
    marginTop: 30,
    // padding: 10,
    backgroundColor: '#33cc33'
  },
  buttonText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    color: Theme.iconStroke
  }
});

export default styles;