import { StyleSheet } from 'react-native';

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
    fontSize: 20
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
  }
});

export default styles;