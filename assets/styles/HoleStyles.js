import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    // fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 50,
  },
  header: {
    // position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginHorizontal: 10,
    opacity: 0.80,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 2,
    width: '100%',
    padding: 10,
    marginTop: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    // marginLeft: 20,
    marginRight: 20

    // width: '100%'
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    alignSelf: 'center'
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  }, title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 10,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
  floating: {
    width: '48%',
    height: '7%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#4FC879',
    borderRadius: 100,
    opacity: 0.85,
    top: '90%'
  },
  floatingContainer: {
    width: '90%',
    height: '7%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
    top: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent'

  },
  floatingHoleMarker: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    opacity: 0.85,
    color: '#000000',
  },
  flag: {
    backgroundColor: '#5d97e8'
  },
  check: {
    backgroundColor: '#4fd163'
  },
  target: {
    backgroundColor: '#d15f4d'
  },
  move: {
    backgroundColor: '#ccdee3'
  },
  shotDiff: {
    margin: 20,
  },
  holeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
  fadeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '60%',
    width: '100%',
    position: 'absolute',
    // elevation: 3,
    // zIndex: 1,
    // opacity: 0
  },
  distancePin: {
    top: 20,
    // marginBottom: 0,
    // width: 20,
    // height: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    elevation: 3,
    zIndex: 20
  },
  customMarker: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  distanceCallout: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
    elevation: 3,
    opacity: 0.75
  },
  markerImage: {
    width: 20,
    height: 20
  }
});

export default styles