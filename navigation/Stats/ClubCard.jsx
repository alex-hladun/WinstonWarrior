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
import { BarChart } from 'react-native-chart-kit'
import { useShotHistory } from '../../hooks/useShotHistory';

const { width } = Dimensions.get('window');

const barChartConfig = {
  backgroundColor: Theme.chartBackgroundColor,
  paddingTop: 0,
  decimalPlaces: 0, // optional, defaults to 2dp
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.0,
  color: (opacity = 1) => `rgba(35, 36, 36, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}

export function ClubCard({ handleClubView, item }) {

  const shotArray = useShotHistory(1, item.id)
  console.log("🚀 ~ file: Clubs.jsx ~ line 77 ~ Clubs ~ shotArray", shotArray)

  const clubShotArray = []
  const clubLabelArray = []
  shotArray.forEach((shot, index) => {
    clubShotArray.push(shot.distance)
    clubLabelArray.push(shot.effort)
  })

  const shotDataForChart = {
    datasets: [{
      data: clubShotArray
    }],
    labels: clubLabelArray
  }

  return (
    <View style={[styles.clubCardContainer, { backgroundColor: Theme.palette[item.id] }]}>
      <View style={styles.clubCardHeader}>
        <Text style={styles.clubTypeText} onPress={() => handleClubView()}>{item.name}</Text>
        <Text style={styles.clubAvgText} onPress={() => handleClubView()}>{item.avg.toFixed(0)} yds</Text>
      </View>
      {/* <Text style={{ color: 'black' }} onPress={() => handleClubView()}> Max -  {item.max.toFixed(0)}</Text> */}
      <BarChart
        style={styles.barChartStyle}
        chartConfig={barChartConfig}
        data={shotDataForChart}
        width={Dimensions.get("window").width - 125}
        height={370}
      />
    </View>
  )
}