import { StyleSheet } from 'react-native';
import { Theme } from './Theme'

const headerHeight = 'auto'
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // paddingTop: 300,
  },
  rowContainer: {
    backgroundColor: Theme.spinGreen1,

    // top: -400,
    // width: '100%',
    paddingTop: 20,
    // marginVertical: 20,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // transform: [{ rotate: "-270deg" }]


  },
  headerContainer: {
    backgroundColor: Theme.red,
    alignItems: 'center',
    // alignSelf: 'center',
    paddingTop: 5,
    // zIndex: 20,
    // top: 200,
    // left: 200,
    // position: 'absolute',
    // marginVertical: 20,
    // justifyContent: 'center',
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 100
  },
  holeHeader: {
    backgroundColor: 'rgb(14,96,44)',

    color: 'white'
  },
  parCell: {
    backgroundColor: 'rgb(0,81,120)'
  },
  whiteText: {
    color: 'white'
  },
  headerCell: {
    width: 50,
    paddingVertical: 4,
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#a19f9f',
    borderColor: Theme.spinGreen1,

    borderStyle: 'solid',
    borderWidth: 0.5,
    marginHorizontal: 0.3,
    marginVertical: 0.3,
  },
  score: {
    fontWeight: 'bold',
    
    // backgroundColor: 
  },
  invisibleHeader: {
    width: 80,
    height: headerHeight,
    paddingVertical: 4,
    marginHorizontal: 1,
    marginVertical: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.spinGreen1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    // borderColor: '#a19f9f',
    // borderStyle: 'solid',
    // borderWidth: 0.5,
  },
  table: {
  
    backgroundColor: Theme.spinGreen,

    marginTop: 300,
    transform: [{ rotate: "270deg" }]
  },
  tableChild: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: '10%',
  },
  tableRow: {
    backgroundColor: Theme.spinGreen1,
    flexDirection: 'row',
  }
});

export default styles;