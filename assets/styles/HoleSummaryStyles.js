import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
    top: 100,
    width: 300,
    height: 500,
    backgroundColor: 'red',
    position: 'absolute'
  },
  header: {
    fontSize: 20
  }
});

export default styles;