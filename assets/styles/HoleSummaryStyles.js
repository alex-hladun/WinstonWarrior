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
    width: 300,
    // height: 475,
    // opacity: 0.75,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
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

  },
  headerContainer: {
    backgroundColor: Theme.red,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 5,
    zIndex: 3,
    // position: 'absolute',
    // top: 500,
    // marginLeft: 20,
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100
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
  styledButton: {
    width: 250,
    backgroundColor: "#f3f8ff",
    padding: 10,
    borderColor: "black",
    justifyContent: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 24,
    alignSelf: 'center'
  },
  playButton: {
    backgroundColor: '#4c8bd9'
  },
  buttonText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    // color: "#f4f4f4"
  }
});

export default styles;