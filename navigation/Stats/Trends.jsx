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
  const roundHistory = statState.roundHistory


  let roundData;
  let data;
  React.useEffect(() => {
    // console.log('roundhistory', roundHistory)
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
           <Text style={styles.header}>Scoring</Text>
           </View>

          {loading &&
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
              width={Dimensions.get('window').width*0.9} // from react-native
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
        </View>
      </View>
    </>
  );
}