import { StyleSheet } from 'react-native';

const headerHeight = 'auto'
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: '#a19f9f',
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
    marginHorizontal: 1,
    marginVertical: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a19f9f',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  table: {
    marginLeft: '7%',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    transform: [{ rotate: "270deg" }]
  },
  tableChild: {
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '10%'
  },
  tableRow: {
    flexDirection: 'row',
    // justifyContent: 'space-eve'
  }
});

export default styles;