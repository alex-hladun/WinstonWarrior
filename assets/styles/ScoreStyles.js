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
  pickerHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10
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
  }
});

export default styles;