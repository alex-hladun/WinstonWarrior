import { StyleSheet } from 'react-native';
import { Theme } from '../styles/Theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4,
    // backgroundColor: '#fff',
    alignSelf: 'center',
    top: 100,
    width: 300,
    height: 475,
    opacity: 0.75,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    // borderRadius: 15,
    // backgroundColor: 'red',
    position: 'absolute',
  },
  backgroundContainer: {
    // marginTop: 5,
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'column',
    // paddingTop: 20,
    justifyContent: 'flex-start',
    backgroundColor: Theme.spinGreen1,
    flex: 1

  },
  prevScore: {
    color: 'blue',
  },
  header: {
    transform: [{ rotate: "-45deg" }],
    width: 50,
    paddingVertical: 10,
    backgroundColor: Theme.spinGreen1,
    // margin: 10,
    textAlign: 'center',

  },
  exitHeader: {
    backgroundColor: Theme.red,
    alignItems: 'center',
    paddingTop: 5,
    marginTop: 50,
    marginBottom: 40,
    // margin: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center'
  },
  scoreHeader: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // marginHorizontal: 20,
    textAlign: 'center',
    backgroundColor: Theme.spinGreen1

  },
  holeHeader: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 10,
    // paddingBottom: 10,
    backgroundColor: 'transparent',
position: 'absolute',
top: 45,
right: 20

  },
  holeNumber: {
    fontSize: 70,
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
  },
  parNumber: {
    fontSize: 25,
    textDecorationStyle: 'solid',
  },
  pickerHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'transparent'
  },
  bottomScoreHeader: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 25,
    backgroundColor: 'transparent'
  },
  pickerRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  pickerStyle: {
    color: 'red',
    backgroundColor: 'orange'
  },
  pickerMaster: {
    // backgroundColor: Theme.spinGreen1,
    width: 50,
    height: 200
  },
  bgImage: {
    flex: 1,
    width: '130%',
    // height: '100%',
    left: '0%',
    bottom: '-30%',
    position: 'absolute',
    // zIndex: 10,
    opacity: 0.04,
    resizeMode: 'contain',
  },
  checkSymbol: {
    width: 70,
    height: 70,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 100,
    // opacity: 0.85,
    backgroundColor: Theme.spinGreen3,
  },
  moveSymbol: {
    width: 60,
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 100,
    backgroundColor: Theme.spinGreen2
  },
  distanceHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  club: {
    justifyContent: 'center',
    // height: 40,
    maxWidth: 80,
    minWidth: 70,
    backgroundColor: 'white',
    textAlign: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    // borderWidth: 0.5,
    borderRadius: 15,
    // alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    flex: 1
  },
  selected: {
    backgroundColor: Theme.spinGreen3
  },
  text: {
    backgroundColor: 'transparent'

  },
  clubContainer: {
    flexWrap: 'wrap',
    // height: '60%',
    marginTop: 20,
    borderColor: 'black',
    // borderWidth: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Theme.spinGreen1

  }

});

export default styles;