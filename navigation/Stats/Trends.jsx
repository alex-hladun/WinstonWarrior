import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { Theme } from '../../assets/styles/Theme'
import { StatContext } from '../../context/StatContext'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

export function Trends({ navigation }) {

  const [loading, setLoading] = React.useState(false)
  const [dataChart, setDataChart] = React.useState({})
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  // console.log("Trends -> statState", statState)
  const roundHistory = statState.roundHistory
  console.log("Trends -> roundHistory", roundHistory)

  let roundData;
  let data;
  React.useEffect(() => {
    console.log("Trends -> roundHistory", roundHistory)
    if (statState && statState.roundHistory[0]) {
      roundData = roundHistory.map((round) => {
        return (round.total_score)
      })

      data = {
        labels: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'],
        datasets: [{
          data: roundData
        }]
      }

      setDataChart(data)
      // console.log('roundData', roundData)
      // console.log('data', data)
      setLoading(true)

    } else {
      data = {
        labels: ['test'],
        datasets: [{
          data: [0]
        }]
      }
      setDataChart(data)
    }
  }, [])
  const handlePress = () => {
    navigation.push('Hole')
  }

  if (data) {
    console.log(data.labels, 'data.LABELS')
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
          {loading && roundHistory[0] ?
            
            <Text style={styles.header}>Scoring</Text>
            :
            <Text style={styles.header}>
              Start playing to see your stats!
            </Text>}
          </View>

          {loading && roundHistory[0] &&
            <LineChart
              data={{
                labels: roundHistory.map((round, index) => {
                  return (index)
                }),
                datasets: [{
                  data: roundHistory.map((round) => {
                    return (round.total_score)
                  })
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
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            // </View>
          }
          {loading && roundHistory[0] &&
          <>
          <View style={styles.holeRow}>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>{statState.totalInfo.avgScore}</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>Avg Putts</Text>
              <Text style={styles.boxContent}>{statState.totalInfo.avgPutts.toFixed(1)}</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>GIRs</Text>
              <Text style={styles.boxContent}>28</Text>
            </View>
          </View>
          <View style={styles.holeRow}>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>FWY %</Text>
              <Text style={styles.boxContent}>22</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>HCP</Text>
              <Text style={styles.boxContent}>10.2</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>GIRs</Text>
              <Text style={styles.boxContent}>28</Text>
            </View>
          </View>
          <View style={styles.holeRow}>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>Eagles</Text>
              <Text style={styles.boxContent}>{statState.totalInfo.totalBirds.eagles}</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>Birdies</Text>
              <Text style={styles.boxContent}>{statState.totalInfo.totalBirds.birdies}</Text>
            </View>
            <View style={styles.trendContainer}>
              <Text style={styles.boxHeader}>Pars</Text>
              <Text style={styles.boxContent}>{statState.totalInfo.totalBirds.pars}</Text>
            </View>
          </View>
          </>}
        </View>
      </View>
    </>
  );
}