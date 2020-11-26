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
import { useTotalPuttHistory } from '../../hooks/useTotalPuttHistory';
import { useRoundHistory } from '../../hooks/useRoundHistory';
import { resetDatabase } from '../../navigation/SignUp'
import { AppContext } from '../../context/AppContext';
import { useTotalPctHistory } from '../../hooks/useTotalPctHistory';

export function Trends({ navigation }) {
  const appContext = React.useContext(AppContext)
  const hcp = useHandicap(1)
  const totalInfo = useTotalInfo(1, 1)
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const pctHistory = useTotalPctHistory(1)
  // console.log("Trends -> statState", statState)
  const roundHistory = useRoundHistory(1)
  const totalPuttHistory = useTotalPuttHistory(1)
  const [chartType, setChartType] = React.useState('Shots')
  const [chartData, setChartData] = React.useState({
    labels: ['Loading'],
    datasets: [{
      data: [0]
    }]
  })

  React.useEffect(() => {
    console.log('SETTING CHART VIA USEEFFECT IN TRENDS')
    setChart(chartType)
  }, [roundHistory, totalPuttHistory])


  const setChart = (chartType) => {
    switch (chartType) {
      case 'Putts':
        setChartType('Putts')
        setChartData({
          labels: totalPuttHistory.map((i, j) => j),
          datasets: [{
            data: totalPuttHistory
          }]
        })
        break;
      case 'FWY %':
        setChartType('FWY %')
        setChartData({
          labels: pctHistory.fwyPct.map((i, j) => j),
          datasets: [{
            data: pctHistory.fwyPct
          }]
        })
        break;
      case 'GIR %':
        setChartType('GIR %')
        setChartData({
          labels: pctHistory.girPct.map((i, j) => j),
          datasets: [{
            data: pctHistory.girPct
          }]
        })
        break;
      case 'Scramble %':
        setChartType('Scramble %')
        setChartData({
          labels: pctHistory.scramblePct.map((i, j) => j),
          datasets: [{
            data: pctHistory.scramblePct
          }]
        })
        break;
      case 'Shots':
        if (roundHistory[0]) {
        setChartType('Shots')
          setChartData(
            {
              labels: roundHistory.map((round, index) => {
                return (round.end_date.slice(5, 10))
              }),
              datasets: [{
                data: roundHistory.map((round) => {
                  return (round.total_score)
                })
              }]
            }
          )
        }
    }
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

              <Text onLongPress={() => logOut()} style={styles.header}>Total {chartType}</Text>
              :
              <Text onLongPress={() => logOut()}>
                Start playing to see your stats!
            </Text>
            }
          </View>

          {roundHistory[0] &&
            <LineChart
              data={chartData}
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
                <TouchableOpacity onPress={() => setChart('Shots')}>
                  <View style={styles.trendContainer}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Score</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.avgScore && totalInfo.avgScore.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart('Putts')}>
                  <View style={styles.trendContainer}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Putts</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.avgPutts && totalInfo.avgPutts.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.trendContainer}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>HCP</Text>
                  </View>
                  <Text style={styles.boxContent}>{hcp.toFixed(1)}</Text>
                </View>
              </View>
              <View style={styles.holeRow}>
              <TouchableOpacity onPress={() => setChart('FWY %')}>
                <View style={styles.trendContainer}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>FWY %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.fwyPct && totalInfo.fwyPct.toFixed(1)}</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress={() => setChart('GIR %')}>
                <View style={styles.trendContainer}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>GIR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.girPct && totalInfo.girPct.toFixed(1)}</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress={() => setChart('SCRAMBLE %')}>
                <View style={styles.trendContainer}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>SCR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo.scramblePct && totalInfo.scramblePct.toFixed(1)}</Text>
                </View>
                </TouchableOpacity>
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