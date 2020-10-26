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
  pickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  prevScore: {
    color: 'blue',
  },
  header: {
    transform: [{ rotate: "-45deg" }],
    width: 50,
    paddingVertical: 10,
    // margin: 10,
    textAlign: 'center',

  },
  scoreHeader: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // marginHorizontal: 20,
    textAlign: 'center',

  },
  holeHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 10
  },
  holeNumber: {
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
// fontStyle: 'underline'
  },
  pickerHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5
  },
  pickerRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  pickerStyle: {
    color: 'red',
    backgroundColor: 'orange'
  },
  checkSymbol: {
    width: 50,
    height: 50,
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    opacity: 0.85,
    color: '#4dc951',
  },
  distanceHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  club: {
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
  selected: {
    backgroundColor: '#4FC879'
  },
  clubContainer: {
    flexWrap: 'wrap',
    height: '60%',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }

});

export default styles;