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
import { useHandicapHistory } from '../../hooks/useHandicapHistory';

export function Trends({ navigation }) {
  const appContext = React.useContext(AppContext)
  // const hcp = useHandicap(1)
  const totalInfo = useTotalInfo(1, 'ALL')
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const pctHistory = useTotalPctHistory(1)
  const handicapHistory = useHandicapHistory(1)
  const hcp = handicapHistory[handicapHistory.length - 1]
  // console.log("Trends -> statState", statState)
  const roundHistory = useRoundHistory(1)
  const totalPuttHistory = useTotalPuttHistory(1)
  const [parentChartType, setParentChartType] = React.useState('LineChart')
  const [chartType, setChartType] = React.useState('Shots')
  const [chartData, setChartData] = React.useState({
    labels: ['Loading'],
    datasets: [{
      data: [0]
    }]
  })

  React.useEffect(() => {
    // console.log('SETTING CHART VIA USEEFFECT IN TRENDS')
    setChart(chartType)
  }, [roundHistory, totalPuttHistory])


  const setChart = (chartType) => {
    switch (chartType) {
      case 'Putts':
        setParentChartType('LineChart')
        setChartType('Putts')
        setChartData({
          labels: totalPuttHistory.map((i, j) => j),
          datasets: [{
            data: totalPuttHistory
          }]
        })
        break;
      case 'FWY %':
        setParentChartType('LineChart')
        setChartType('FWY %')

        setChartData({
          labels: pctHistory.fwyPct.map((i, j) => {
            if(i !== "NaN") {
              return (j)
            }
            }),
          datasets: [{
            data: pctHistory.fwyPct.filter(i => i !== "NaN")
          }]
      })
        break;
      case 'GIR %':
        setParentChartType('LineChart')
        setChartType('GIR %')
        setChartData({
          labels: pctHistory.girPct.map((i, j) => j),
          datasets: [{
            data: pctHistory.girPct
          }]
        })
        break;
      case 'Scramble %':
        setParentChartType('LineChart')
        setChartType('Scramble %')
        console.log("🚀 ~ file: Trends.jsx ~ line 95 ~ setChart ~ pctHistory?.scramblePct", pctHistory?.scramblePct)
        setChartData({
          labels: pctHistory?.scramblePct.map((i, j) => j),
          datasets: [{
            data: pctHistory?.scramblePct
          }]
        })
        break;
      case 'Handicap':
        setParentChartType('LineChart')
        setChartType('HCP')
        setChartData({
          labels: handicapHistory.map((i, j) => j),
          datasets: [{
            data: handicapHistory
          }]
        })
        break;
      case 'Shots':
        if (roundHistory[0]) {
          setChartType('Shots')
          setParentChartType('LineChart')
          setChartData(
            {
              labels: roundHistory?.map((round, index) => {
                return (round.end_date?.slice(5, 10))
              }),
              datasets: [{
                data: roundHistory.map((round) => {
                  return (round.total_score)
                })
              }]
            }
          )
        }
        break;
        case 'Scoring':
        setParentChartType('PieChart')
        setChartType('Scoring')
        setChartData([{
          name: "Eagles",
          count: totalInfo.totalBirds.eagles,
          color: Theme.piePalette[0],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Birdies",
          count: totalInfo.totalBirds.birdies,
          color: Theme.piePalette[1],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Pars",
          count: totalInfo.totalBirds.pars,
          color: Theme.piePalette[2],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Bogeys",
          count: totalInfo.totalBirds.bogies,
          color: Theme.piePalette[3],

          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Doubles",
          count: totalInfo.totalBirds.doubles,
          color: Theme.piePalette[4],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Triples +",
          count: totalInfo.totalBirds.triples,
          color: Theme.piePalette[5],
          legendFontColor: "#000",
          legendFontSize: 15
        },
        ])
        break;
    }
  }


  const logOut = () => {
    // resetDatabase()
    appContext.dispatch({
      type: 'log_out'
    })
    AsyncStorage.removeItem('authName')

  }

  const chartConfig = {
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
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/pgaguy.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
            {roundHistory[0] ?
          <View style={styles.headerContainer}>
              <Text onLongPress={() => logOut()} style={styles.header}>Total {chartType}</Text>
              </View>
              :
            <View style={styles.styledButton}>
              <Text onLongPress={() => logOut()}>
                Start playing to see your stats!
            </Text>
          </View>
            }

          {roundHistory[0] && (parentChartType === 'LineChart') &&
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width * 0.9} // from react-native
              height={240}
              chartConfig={chartConfig}
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
          {roundHistory[0] && (parentChartType === 'PieChart') &&
          <PieChart
          data={chartData}
          chartConfig={chartConfig}
          height={240}
          style={{
            // alignSelf: 'flex-end',
            left: 20,
            marginVertical: 5,
            borderRadius: 16,
          }}
          width={Dimensions.get('window').width}
          center={[5, 0]}
          hasLegend={true}
          accessor={"count"}
          backgroundColor={"transparent"}
          absolute='true'
          />
        }

          {roundHistory[0] &&
            <>
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart('Shots')}>
                  <View style={[styles.trendContainer, chartType === 'Shots' && styles.selectBox]}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Score</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo?.avgScore && totalInfo.avgScore.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart('Putts')}>
                  <View style={[styles.trendContainer, chartType === 'Putts' && styles.selectBox]}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Putts</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo?.avgPutts && totalInfo.avgPutts.toFixed(1)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart('Handicap')}>
                <View style={[styles.trendContainer, chartType === 'HCP' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>HCP</Text>
                  </View>
                  <Text style={styles.boxContent}>{hcp? hcp.toFixed(1) : 
                  'NA'}</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.holeRow}>
              <TouchableOpacity onPress={() => setChart('FWY %')}>
                <View style={[styles.trendContainer, chartType === 'FWY %' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>FWY %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.fwyPct && totalInfo.fwyPct.toFixed(0)}</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress={() => setChart('GIR %')}>
                <View style={[styles.trendContainer, chartType === 'GIR %' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>GIR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.girPct && totalInfo.girPct.toFixed(0)}</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity onPress={() => setChart('Scramble %')}>
                <View style={[styles.trendContainer, chartType === 'Scramble %' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>SCR %</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.scramblePct && totalInfo.scramblePct.toFixed(0)}</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.holeRow}>
              <TouchableOpacity onPress={() => setChart('Scoring')}>
                <View style={[styles.trendContainer, chartType === 'Scoring' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>Eagles</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.totalBirds && totalInfo.totalBirds.eagles}</Text>
                </View>
                </TouchableOpacity >
              <TouchableOpacity onPress={() => setChart('Scoring')}>
                <View style={[styles.trendContainer, chartType === 'Scoring' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>Birdies</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.totalBirds && totalInfo.totalBirds.birdies}</Text>
                </View>
                </TouchableOpacity >
              <TouchableOpacity onPress={() => setChart('Scoring')}>
                <View style={[styles.trendContainer, chartType === 'Scoring' && styles.selectBox]}>
                  <View style={styles.boxHeader}>
                    <Text style={styles.boxHeaderText}>Pars</Text>
                  </View>
                  <Text style={styles.boxContent}>{totalInfo?.totalBirds && totalInfo.totalBirds.pars}</Text>
                </View>
                </TouchableOpacity >
              </View>
            </>}
        </View>
      </View>
    </>
  );
}