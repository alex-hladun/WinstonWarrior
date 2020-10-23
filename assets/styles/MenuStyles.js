import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    // zIndex: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
    top: 100,
    justifyContent: 'flex-start',

  },
  courseText: {
    textAlign: 'center'
  },
  courseContainer: {
    backgroundColor: '#7CFC00',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 30
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
    borderWidth: 0.5,
    borderRadius: 100
  },
  playerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    // padding: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 100,
    marginVertical: 7
  },
  removePlayer: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 100,
    width: 30,
    height: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5
    marginHorizontal: 10
  },
  player: {
    padding: 20,
    marginRight:10
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
  }


});

export default styles;