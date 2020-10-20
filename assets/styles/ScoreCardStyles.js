import { StyleSheet } from 'react-native';

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
  headerCell: {
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginHorizontal: 1,
    marginVertical: 0.5
  },
  score: {
    fontWeight: 'bold',
    // backgroundColor: 
  },
  
  invisibleHeader: {
    width: 80,
    height: 25,
    marginHorizontal: 1,
    marginVertical: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  table: {
    flexDirection: 'column',
    top: '50%',
    // right: '15%'
  },
  tableChild: {
    flexDirection: 'column',
    marginBottom: 50
  },
  tableRow: {
    flexDirection: 'row',
    // justifyContent: 'space-eve'
    

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