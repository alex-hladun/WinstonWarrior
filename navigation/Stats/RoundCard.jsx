import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, Modal, ImageBackground, Dimensions } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import XSymbol from '../../assets/svg/XSymbol';
import { Theme } from '../../assets/styles/Theme'
import { useShotData } from '../../hooks/useShotData';
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart
} from 'react-native-chart-kit'

import { useShotHistory } from '../../hooks/useShotHistory';

const { width } = Dimensions.get('window');

const pieChartConfig = {
  // backgroundColor: Theme.chartBackgroundColor,
  // paddingTop: 0,
  decimalPlaces: 0, // optional, defaults to 2dp
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 1.0,
  color: (opacity = 1) => `rgba(35, 36, 36, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}

export function RoundCard({ handleRoundView, item }) {
  console.log("🚀 ~ file: RoundCard.jsx ~ line 31 ~ RoundCard ~ item", item)


  // const shotArray = useShotHistory(1, item.id)
  // console.log("🚀 ~ file: Clubs.jsx ~ line 77 ~ Clubs ~ shotArray", shotArray)

  const pieChartData = [{
    name: "Eagles",
    count: 2,
    color: Theme.palette[0],
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }, {
    name: "Birdies",
    count: 6,
    color: Theme.palette[2],

    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }, {
    name: "Pars",
    count: 6,
    color: Theme.palette[5],

    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }, {
    name: "Bogeys",
    count: 2,
    color: Theme.palette[6],

    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }, {
    name: "Double+",
    count: 2,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  ]
  // shotArray.forEach((shot, index) => {
  //   clubShotArray.push(shot.distance)
  //   clubLabelArray.push(index + 1)
  // })

  // const shotDataForChart = {
  //   datasets: [{
  //     data: clubShotArray
  //   }],
  //   labels: clubLabelArray
  // }

  return (
    <View style={[styles.roundCardContainer]}>
      <View style={styles.clubCardHeader}>
        <Text style={styles.clubTypeText} onPress={() => handleRoundView()}>{item.end_date.slice(5, 10)}</Text>
        <Text style={styles.clubAvgText} onPress={() => handleRoundView()}>{item.total_score}</Text>
      </View>

      <View style={styles.roundCardInnerContainer}>
        <Text style={styles.clubAvgText}>{item.course_name}</Text>
        <PieChart
          data={pieChartData}
          chartConfig={pieChartConfig}
          height={150}
          
          // style={{alignSelf: 'center', margin: 20, padding: 30}}
          width={'90%'}
          center={[75, 0]}
          // center={1}
          // padding='20'
          // paddingLeft={35}
          hasLegend={false}
          accessor={"count"}
          backgroundColor={"red"}
          absolute='true'
        />
      </View>
    </View>



    // {/* <Text style={{ color: 'black' }} onPress={() => handleRoundView()}> Max -  {item.max.toFixed(0)}</Text> */}
    //   {/* <BarChart
    //     style={styles.barChartStyle}
    //     chartConfig={barChartConfig}
    //     data={shotDataForChart}
    //     width={Dimensions.get("window").width - 125}
    //     height={370}
    //   />
    // </View> */}
  )
}