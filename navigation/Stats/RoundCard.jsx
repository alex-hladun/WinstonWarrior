import { View, Text, Dimensions } from "react-native";
import * as React from "react";
import styles from "../../assets/styles/StatStyles";
import { AppContext } from "../../context/AppContext";
import { Theme } from "../../assets/styles/Theme";
import { PieChart } from "react-native-chart-kit";
import { getRoundData } from "../../db/roundData";

const pieChartConfig = {
  backgroundColor: Theme.chartBackgroundColor,
  backgroundGradientFrom: Theme.chartBGGradientFrom,
  backgroundGradientTo: Theme.chartBGGradientTo,
  propsForVerticalLabels: {
    rotation: -90
  },
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
};

export function RoundCard({ handleRoundView, item }) {
  const appContext = React.useContext(AppContext);
  const [roundData, setRoundData] = React.useState({});

  const updateData = async () => {
    const roundDataForState = await getRoundData(item.round_id);
    setRoundData(roundDataForState);
  };

  React.useEffect(() => {
    updateData();
    console.log(
      "🚀 ~ file: RoundCard.jsx ~ line 50 ~ RoundCard ~ roundData",
      roundData
    );
  }, []);

  let pieChartData;

  if (roundData?.frontScore) {
    pieChartData = [
      {
        name: "Eagles",
        count: roundData.birdieObj.eagles,
        color: Theme.piePalette[0],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Birdies",
        count: roundData.birdieObj.birdies,
        color: Theme.piePalette[1],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Pars",
        count: roundData.birdieObj.pars,
        color: Theme.piePalette[2],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Bogeys",
        count: roundData.birdieObj.bogeys,
        color: Theme.piePalette[3],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Doubles",
        count: roundData.birdieObj.doubles,
        color: Theme.piePalette[4],
        legendFontColor: "#666464",
        legendFontSize: 15
      },
      {
        name: "Triples +",
        count: roundData.birdieObj.triples,
        color: Theme.piePalette[5],
        legendFontColor: "#666464",
        legendFontSize: 15
      }
    ];
  }

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
            <Text style={styles.roundCardScore}>
              {roundData?.frontScore ? roundData.frontScore : ""}
            </Text>
          </View>
          {roundData?.backScore && (
            <View style={styles.roundCardRow}>
              <View style={styles.roundCardInnerContainer}>
                <Text style={styles.roundCardHeader}>Back</Text>
                <Text style={styles.roundCardScore}>
                  {roundData?.backScore ? roundData.backScore : ""}
                </Text>
              </View>
            </View>
          )}
        </View>
        {roundData.frontScore && (
          <PieChart
            data={pieChartData}
            chartConfig={pieChartConfig}
            height={200}
            width={Dimensions.get("window").width}
            style={styles.pieChartStyle}
            center={[3, 0]}
            hasLegend={true}
            accessor={"count"}
            backgroundColor={"transparent"}
            absolute="false"
          />
        )}
      </View>
      <View style={styles.roundCardRow}>
        <View style={styles.roundCardInnerContainer}>
          <Text style={styles.roundCardHeader}>FWY</Text>
          <Text style={styles.roundCardSubText}>
            {roundData?.fwHit ? roundData.fwHit : "0"} /{" "}
            {roundData?.totalHoles ? roundData.totalHoles : ""}
          </Text>
        </View>
        <View style={styles.roundCardInnerContainer}>
          <Text style={styles.roundCardHeader}>GIR</Text>
          <Text style={styles.roundCardSubText}>
            {roundData?.girHit ? roundData.girHit : 0} /{" "}
            {roundData?.totalHoles ? roundData.totalHoles : ""}
          </Text>
        </View>
        <View style={styles.roundCardInnerContainer}>
          <Text style={styles.roundCardHeader}>SCR</Text>
          <Text style={styles.roundCardSubText}>
            {roundData?.girHit ? roundData.scramble : 18} /{" "}
            {roundData?.totalHoles
              ? roundData.totalHoles - roundData.girHit
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}
