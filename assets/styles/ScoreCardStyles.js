import { StyleSheet } from 'react-native';
import { Theme } from './Theme'

const headerHeight = 'auto'

const cellBorder = 0
export const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Theme.spinGreen1,
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  rowContainer: {
    backgroundColor: Theme.spinGreen1,
    paddingTop: 20,
    alignSelf: 'center',
  },
  bgImage: {
    flex: 1,
    width: '150%',
    // height: '50%',
    left: '15%',
    top: '-15%',
    position: 'absolute',
    // zIndex: 10,
    opacity: 0.2,
    resizeMode: 'contain',
  },
  headerContainer: {
    backgroundColor: Theme.red,
    alignItems: 'center',
    paddingTop: 5,
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    // marginBottom: 2
  },
  holeHeader: {
    backgroundColor: 'rgb(14,96,44)',
    borderRadius: cellBorder,
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
    borderColor: Theme.spinGreen1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginHorizontal: 0.3,
    marginVertical: 0.3,
  },
  score: {
    fontWeight: 'bold',
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
  },
  table: {
    backgroundColor: 'transparent',
    width: '90%',
    height: '90%',
    marginTop: 100,
    // left: 20,
    // marginLeft: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    // paddingTop: 40,
    // paddingRight: 20,
    transform: [{ rotate: "270deg" }]
  },
  tableChild: {
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  tableRow: {
    backgroundColor: Theme.spinGreen1,
    flexDirection: 'row',
  }
});

export default styles;