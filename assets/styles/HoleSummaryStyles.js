import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4,
    backgroundColor: '#fff',
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
    height: 60,
    width: 60,
    // backgroundColor: 'green',
    textAlign: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'stretch',
    padding: 25,
    margin: 10
  }
});

export default styles;