import { View, Text, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native';
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
import { useTotalInfo } from '../../hooks/useTotalInfo';
import { useHandicap } from '../../hooks/useHandicap';
import { useRoundHistory } from '../../hooks/useRoundHistory';
import { resetDatabase } from '../../navigation/SignUp'
import { AppContext } from '../../context/AppContext';

export function Trends({ navigation }) {
  const appContext = React.useContext(AppContext)
  const hcp = useHandicap(1)
  const [loading, setLoading] = React.useState(false)
  const [dataChart, setDataChart] = React.useState({})
  const totalInfo = useTotalInfo(1, 1)
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  // console.log("Trends -> statState", statState)
  const roundHistory = useRoundHistory(1)

  // const roundHistory =  statState.roundHistory
  // console.log("Trends -> roundHistory", roundHistory)


  let roundData;
  let data;
  React.useEffect(() => {
    // console.log("Trends -> roundHistory", roundHistory)
    if (roundHistory[0]) {
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

  const logOut = () => {
    // resetDatabase()
    appContext.dispatch({
      type: 'log_out'
    })
    AsyncStorage.removeItem('authName')

  }


  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/pgaguy.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            {roundHistory[0] ?

              <Text onLongPress={() => logOut()} style={styles.header}>Scoring</Text>
              :
              <Text onLongPress={() => logOut()}>
                Start playing to see your stats!
            </Text>
            }
          </View>

          {roundHistory[0] &&
            <LineChart
              data={{
                labels: roundHistory.map((round, index) => {
                  return (round.end_date.slice(5, 10))
                }),
                datasets: [{
                  data: roundHistory.map((round) => {
                    return (round.total_score)
                  })
                }]
              }}
              width={Dimensions.get('window').width * 0.9} // from react-native
              height={240}
              chartConfig={{
                backgroundColor: Theme.chartBackgroundColor,
                backgroundGradientFrom: Theme.chartBGGradientFrom,
                backgroundGradientTo: Theme.chartBGGradientTo,
                propsForVerticalLabels: {
                  rotation: -90
                },
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
            // </View>
          }
          {roundHistory[0] &&
            <>
              <View style={styles.holeRow}>
                <View style={styles.trendContainer}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>Avg Score</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.avgScore && totalInfo.avgScore.toFixed(1)}</Text>
                </View>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>

                  <Text style={styles.boxHeaderText}>Avg Putts</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.avgPutts && totalInfo.avgPutts.toFixed(1)}</Text>
                </View>

                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>HCP</Text>
                  </View>
                  <Text style={styles.boxContent}>{hcp.toFixed(1)}</Text>
                </View>
              </View>
              <View style={styles.holeRow}>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>FWY %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.fwyPct && totalInfo.fwyPct.toFixed(1)}</Text>
                </View>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>GIR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.girPct && totalInfo.girPct.toFixed(1)}</Text>
                </View>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>

                  <Text style={styles.boxHeaderText}>SCR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.scramblePct && totalInfo.scramblePct.toFixed(1)}</Text>
                </View>
              </View>
              <View style={styles.holeRow}>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>Eagles</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.totalBirds && totalInfo.totalBirds.eagles}</Text>
                </View>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>Birdies</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.totalBirds && totalInfo.totalBirds.birdies}</Text>
                </View>
                <View style={styles.trendContainer}>
                <View style={styles.boxHeader}>
                  <Text style={styles.boxHeaderText}>Pars</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.totalBirds && totalInfo.totalBirds.pars}</Text>
                </View>
              </View>
            </>}
        </View>
      </View>
    </>
  );
}