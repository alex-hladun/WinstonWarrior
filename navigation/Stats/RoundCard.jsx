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
  // console.log("🚀 ~ file: RoundCard.jsx ~ line 31 ~ RoundCard ~ item", item)

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

  return (
    <View style={[styles.roundCardContainer]}>
      <View style={styles.clubCardHeader}>
        <Text style={styles.clubTypeText}>{item.end_date.slice(5, 10)}</Text>
        <Text style={styles.clubAvgText}>{item.total_score}</Text>
      </View>

      <View style={styles.roundCardInnerContainer}>
        <Text style={styles.clubAvgText}>{item.course_name}</Text>
        <View style={styles.roundCardRow}>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.roundCardHeader}>Front</Text>
            <Text style={styles.roundCardScore}>36</Text>
          </View>
        <View style={styles.roundCardRow}>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.roundCardHeader}>Back</Text>
            <Text style={styles.roundCardScore}>29</Text>
          </View>
</View>
        </View>
      <PieChart
        data={pieChartData}
        chartConfig={pieChartConfig}
        height={200}
        width={'100%'}
        center={[155, 0]}
        hasLegend={false}
        accessor={"count"}
        backgroundColor={"transparent"}
        absolute='true'
      />
    </View>
    <View style={styles.roundCardRow}>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.roundCardHeader}>FWY</Text>
            <Text style={styles.roundCardScore}>8/18</Text>
          </View>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.roundCardHeader}>GIR</Text>
            <Text style={styles.roundCardScore}>7/18</Text>
          </View>
          <View style={styles.roundCardInnerContainer}>
            <Text style={styles.roundCardHeader}>SCR</Text>
            <Text style={styles.roundCardScore}>2/7</Text>
          </View>
          </View>
    </View >
  )
}