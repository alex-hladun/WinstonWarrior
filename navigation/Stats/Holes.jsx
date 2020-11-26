import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { LineChart } from 'react-native-chart-kit'
import { Theme } from '../../assets/styles/Theme'
import { StatContext } from '../../context/StatContext'
import { AppContext } from '../../context/AppContext'
import { useTotalInfo } from '../../hooks/useTotalInfo';
import { useHoleData } from '../../hooks/useHoleData';
import holeInfo from '../../assets/holeInfo';
import { usePuttHistory } from '../../hooks/usePuttHistory'

export function Holes({ navigation }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const statContext = React.useContext(StatContext)
  const holeData = useHoleData(1, 1)
  // console.log("🚀 ~ file: Holes.jsx ~ line 19 ~ Holes ~ holeData", holeData.hitFwObj)
  const holeNum = appState.hole_num
  const totalInfo = useTotalInfo(1,1)
  // TODO: Change to hole ID
  const puttHistory = usePuttHistory(1, holeNum)
  const [chartData, setChartData] = React.useState({
    labels: ['Loading'],
     datasets: [{
       data: [0]
     }]

  })

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Hole {holeNum}</Text>
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
          <>
            <LineChart
              data={{
                labels: holeData.holeHistoryObj[holeNum].date.map(holeDate => {
                 return (holeDate.slice(5,10))
                }),
                datasets: [{
                  data: holeData.holeHistoryObj[holeNum].score
                }]
              }}
              width={Dimensions.get('window').width * 0.9} // from react-native
              height={240}
              chartConfig={{
                backgroundColor: Theme.chartBackgroundColor,
                paddingTop: 0,
                backgroundGradientFrom: Theme.holeBGGFrom,
                backgroundGradientTo: Theme.holeBGGTo,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForVerticalLabels: {
                  rotation: -90,
                }
              }}
              bezier
              style={{
                alignSelf: 'center',
                marginVertical: 5,
                borderRadius: 16,
                // paddingBottom: 10,
              }}
            />
            
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Avg Score</Text>
              </View>
              <Text style={styles.boxContent}>{holeData.holeObj[holeNum].avgShots ? holeData.holeObj[holeNum].avgShots.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Avg Putts</Text>
              </View>
              <Text style={styles.boxContent}>{holeData.holeObj[holeNum].avgPutts ? holeData.holeObj[holeNum].avgPutts.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Best Score</Text>
              </View>
              <Text style={styles.boxContent}>{holeData.lowHoleObj[holeNum]}</Text>
            </View>
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
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Eagles</Text>
              </View>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].eagles : 0 }</Text>
            </View>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Birds</Text>
              </View>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].birdies : 0}</Text>
            </View>
            <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.boxHeaderText}>Pars</Text>
              </View>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].pars : 0}</Text>
          </View>
          </View>
          </>
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