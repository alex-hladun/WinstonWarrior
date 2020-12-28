import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { Theme } from '../../assets/styles/Theme'
import { StatContext } from '../../context/StatContext'
import { AppContext } from '../../context/AppContext'
import { PlayContext } from '../../context/PlayContext'
import { useTotalInfo } from '../../hooks/useTotalInfo';
import { useHoleData } from '../../hooks/useHoleData';
// import holeInfo from '../../assets/holeInfo';
import { usePuttHistory } from '../../hooks/usePuttHistory'

export function Holes() {
  const width = Dimensions.get('window').width
  // console.log("🚀 ~ file: Holes.jsx ~ line 17 ~ Holes ~ width", width)
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  const holeInfo = playContext.value.state.holeInfo
  const appState = appContext.value.state
  const statContext = React.useContext(StatContext)

  const holeData = useHoleData(1, playContext.value.state.course_id)
  const holeNum = appState.hole_num
  const totalInfo = useTotalInfo(1, playContext.value.state.course_id)
  console.log("🚀 ~ file: Holes.jsx ~ line 24 ~ Holes ~ totalInfo", totalInfo)
  // TODO: Change to hole ID
  const puttHistory = usePuttHistory(1, holeNum)
  const [parentChartType, setParentChartType] = React.useState('LineChart')
  const [chartType, setChartType] = React.useState('Shots')
  const [chartData, setChartData] = React.useState({
    labels: ['Loading'],
    datasets: [{
      data: [0]
    }]
  })
  const [pieChartData, setPieChartData] = React.useState([{
    name: "Pars",
    count: 2,
    color: Theme.palette[0],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }]
  )

  const setChart = (chartType) => {
    console.log('SETTING CHART TYPE')
    // setParentChartType('LineChart')
    switch (chartType) {
      case 'Putts':
        setChartType('Putts')
        setParentChartType('LineChart')
        setChartData({
          labels: puttHistory.map((i, j) => (j)),
          datasets: [{
            data: puttHistory
          }]
        })
        break;
      case 'Shots':
        setParentChartType('LineChart')
        setChartType('Shots')
        if (holeData.holeHistoryObj && holeData.holeHistoryObj[holeNum]) {
          setChartData({
            labels: holeData.holeHistoryObj[holeNum].date.map(holeDate => {
              return (holeDate.slice(5, 10))
            }),
            datasets: [{
              data: holeData.holeHistoryObj[holeNum].score
            }]
          })
        }
        break;
      case 'Scoring':
        setChartType('Scoring')
        setParentChartType('PieChart')
        setPieChartData([{
          name: "Eagles",
          count: totalInfo.birdieObj[holeNum].eagles,
          color: Theme.piePalette[0],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Birdies",
          count: totalInfo.birdieObj[holeNum].birdies,
          color: Theme.piePalette[1],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Pars",
          count: totalInfo.birdieObj[holeNum].pars,
          color: Theme.piePalette[2],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Bogeys",
          count: totalInfo.birdieObj[holeNum].bogies,
          color: Theme.piePalette[3],

          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Doubles",
          count: totalInfo.birdieObj[holeNum].doubles,
          color: Theme.piePalette[4],
          legendFontColor: "#000",
          legendFontSize: 15
        }, {
          name: "Triples +",
          count: totalInfo.birdieObj[holeNum].triples,
          color: Theme.piePalette[5],
          legendFontColor: "#000",
          legendFontSize: 15
        },
        ])
        break;
    }
  }

  React.useEffect(() => {
    setChart(chartType)
  }, [puttHistory, holeData.holeHistoryObj, holeNum])


  const chartConfig = {
    backgroundColor: Theme.chartBackgroundColor,
    paddingTop: 0,
    backgroundGradientFrom: Theme.holeBGGFrom,
    backgroundGradientTo: Theme.holeBGGTo,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForVerticalLabels: {
      rotation: -90,
    }
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Hole {holeNum} ({chartType})</Text>
          </View>

          {(
            holeNum
            && holeData.holeHistoryObj
            && holeData.holeHistoryObj[holeNum]
            && holeData.holeHistoryObj[holeNum].score[0]
            && totalInfo.birdieObj
            && totalInfo.birdieObj[holeNum]
          )
            ?
            (
              <>

                {parentChartType === 'LineChart' ?
                  <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width * 0.9} // from react-native
                    height={240}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                      alignSelf: 'center',
                      marginVertical: 5,
                      borderRadius: 16,
                    }}
                  /> :
                  parentChartType === 'PieChart' ?
                    (
                      <PieChart
                        data={pieChartData}
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
                    )
                    :
                    (<View>
                      <Text>BarChart</Text>
                    </View>)

                }
                <View style={styles.holeRow}>
                  <TouchableOpacity onPress={() => setChart('Shots')}>
                    <View style={[styles.boxContainer, chartType === 'Shots' && styles.selectBoxHole]}>
                      <View style={styles.boxHeader}>
                        <Text style={styles.boxHeaderText}>Avg Score</Text>
                      </View>
                      <Text style={styles.boxContent}>{holeData.holeObj[holeNum].avgShots ? holeData.holeObj[holeNum].avgShots.toFixed(1) : 'NA'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setChart('Putts')}>
                    <View style={[styles.boxContainer, chartType === 'Putts' && styles.selectBoxHole]}>
                      <View style={styles.boxHeader}>
                        <Text style={styles.boxHeaderText}>Avg Putts</Text>
                      </View>
                      <Text style={styles.boxContent}>{holeData.holeObj[holeNum].avgPutts ? holeData.holeObj[holeNum].avgPutts.toFixed(1) : 'NA'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setChart('Scoring')}>
                    <View style={[styles.boxContainer, chartType === 'Scoring' && styles.selectBoxHole]}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Best Score</Text>
                    </View>
                    <Text style={styles.boxContent}>{holeData.lowHoleObj[holeNum]}</Text>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.holeRow}>
                  <View style={styles.boxContainer}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>FWY %</Text>
                    </View>
                    <Text style={styles.boxContent}>{holeData.hitFwObj[holeNum].fairwaysHit ? (100 * holeData.hitFwObj[holeNum].fairwaysHit / holeData.hitFwObj[holeNum].totalFairways).toFixed(0) : '0'}</Text>
                  </View>
                  <View style={styles.boxContainer}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>GIR %</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.birdieObj[holeNum].GIRs ? (totalInfo.birdieObj[holeNum].GIRs * 100 / totalInfo.birdieObj[holeNum].rounds).toFixed(0) : 0}</Text>
                  </View>
                  <View style={styles.boxContainer}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>SCR %</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.birdieObj && totalInfo.birdieObj[holeNum].scrambleSuccess ? (totalInfo.birdieObj[holeNum].scrambleSuccess * 100 / totalInfo.birdieObj[holeNum].scrambleChances).toFixed(0) : 0}</Text>
                  </View>
                </View>
                {/* <View style={styles.holeRow}>
                  <TouchableOpacity onPress={() => setChart('Scoring')}>
                    <View style={[styles.boxContainer, chartType === 'Scoring' && styles.selectBoxHole]}>
                      <View style={styles.boxHeader}>
                        <Text style={styles.boxHeaderText}>Eagles</Text>
                      </View>
                      <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].eagles : 0}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setChart('Scoring')}>
                  <View style={[styles.boxContainer, chartType === 'Scoring' && styles.selectBoxHole]}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Birds</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].birdies : 0}</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setChart('Scoring')}>
                  <View style={[styles.boxContainer, chartType === 'Scoring' && styles.selectBoxHole]}>
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Pars</Text>
                    </View>
                    <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].pars : 0}</Text>
                  </View>
                  </TouchableOpacity>
                </View> */}
              </>
            )
            :
            <View style={styles.chartContainer}>
              <Text>Save a score to this hole to see hole stats</Text>
            </View>
          }
        </View>
      </View>
    </>
  );
}