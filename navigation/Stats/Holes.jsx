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
export function Holes({ navigation }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const holeNum = appState.hole_num
  const totalInfo = useTotalInfo(1,1)
  // console.log("Holes -> totalInfo", totalInfo)

  let dateLabels;
  React.useEffect(() => {
    // console.log('statState', statState.holeHistory)

    // if(statState.holeHistory[holeNum].date) {
    //   console.log('FOUND DATES')
    //   statState.holeHistory[holeNum].date.forEach(holeDate => {
    //     dateLabels.push(holeDate.slice(5,10))
    //   })
    // }

    console.log('datelabels', dateLabels)
  }, [statState.holeHistory])

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Hole {holeNum}</Text>
          </View>

          {holeNum && statState && statState.holeHistory[holeNum] ?
          <>
            <LineChart
              data={{
                labels: statState.holeHistory[holeNum].date.map(holeDate => {
                 return (holeDate.slice(5,10))
                }),
                datasets: [{
                  data: statState.holeHistory[holeNum].score
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
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>{statState.holes[holeNum].avgShots ? statState.holes[holeNum].avgShots.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Putts</Text>
              <Text style={styles.boxContent}>{statState.holes[holeNum].avgPutts ? statState.holes[holeNum].avgPutts.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>GIR %</Text>
            <Text style={styles.boxContent}>{totalInfo.birdieObj ? (totalInfo.birdieObj[holeNum].GIRs * 100 / totalInfo.birdieObj[holeNum].rounds).toFixed(0) : 0}</Text>
            </View>
           
          </View>
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Eagles</Text>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].eagles : 0 }</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Birds</Text>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].birdies : 0}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Pars</Text>
              <Text style={styles.boxContent}>{totalInfo.birdieObj ? totalInfo.birdieObj[holeNum].pars : 0}</Text>
          </View>
          </View>
          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>FWY %</Text>
              <Text style={styles.boxContent}>{statState.fwData[holeNum].fairwaysHit ? (100 * statState.fwData[holeNum].fairwaysHit / statState.fwData[holeNum].totalFairways).toFixed(0) : 0}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>AVG FW</Text>
            <Text style={styles.boxContent}>{statState.fwData[holeNum].driverDirection && statState.fwData[holeNum].driverDirection.toFixed(1)}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best Score</Text>
              <Text style={styles.boxContent}>{statState.lowScores[holeNum]}</Text>
            </View>
          </View>
          </>
          :
          <View style={styles.chartContainer}>
              <Text>Play a round to see hole stats</Text>
            </View>
          }
        </View>
      </View>
    </>
  );
}