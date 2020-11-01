import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { LineChart } from 'react-native-chart-kit'
import { Theme } from '../../assets/styles/Theme'
import { StatContext } from '../../context/StatContext'

import { AppContext } from '../../context/AppContext'
export function Holes({ navigation }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const holeNum = appState.hole_num

  React.useEffect(() => {
    console.log('statState', statState.holes)
  }, [])


  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Hole {holeNum}</Text>
          </View>

          {holeNum ?
          <>
            <LineChart
              data={{
                labels: [],
                datasets: [{
                  data: statState.holeHistory[holeNum].score
                }]
              }}
              width={Dimensions.get('window').width * 0.9} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: Theme.chartBackgroundColor,
                backgroundGradientFrom: Theme.chartBGGradientFrom,
                backgroundGradientTo: Theme.chartBGGradientTo,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              bezier
              style={{
                // top: -100,
                alignSelf: 'center',
                marginVertical: 5,
                borderRadius: 16
              }}
            />
            
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Score Avg</Text>
              <Text style={styles.boxContent}>{statState.holes[holeNum].avgShots.toFixed(1)}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Putts</Text>
              <Text style={styles.boxContent}>{statState.holes[holeNum].avgPutts.toFixed(1)}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best Score</Text>
              <Text style={styles.boxContent}>2</Text>
            </View>
          </View>
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Eagles</Text>
              <Text style={styles.boxContent}>12</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Birds</Text>
              <Text style={styles.boxContent}>12</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Pars</Text>
              <Text style={styles.boxContent}>3</Text>
            </View>
          </View>
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>FWY</Text>
              <Text style={styles.boxContent}>32%</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>GIR</Text>
              <Text style={styles.boxContent}>22%</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>U&D</Text>
              <Text style={styles.boxContent}>22%</Text>
            </View>
          </View>
          </>
          :
          <View style={styles.chartContainer}>
              <Text>Start a round to see hole stats</Text>
            </View>
          }
        </View>
      </View>
    </>
  );
}