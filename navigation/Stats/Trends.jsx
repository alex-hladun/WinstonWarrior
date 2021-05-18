import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import * as React from "react";
import styles from "../../assets/styles/StatStyles";
import { Theme } from "../../assets/styles/Theme";
import { LineChart, PieChart } from "react-native-chart-kit";
import { AppContext } from "../../context/AppContext";
import { resetDatabase } from "../../navigation/SignUp";

export function Trends({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const handicapHistory = appState.statState.hcpHistory.filter((h) => !!h);

  const roundHistory = appState.statState.roundHistory;
  const totalPuttHistory = appState.statState.puttHistory;
  const [parentChartType, setParentChartType] = React.useState("LineChart");
  const [chartType, setChartType] = React.useState("Shots");
  const [chartData, setChartData] = React.useState({
    labels: ["Loading"],
    datasets: [
      {
        data: [0]
      }
    ]
  });

  React.useEffect(() => {
    setChart(chartType);
  }, [roundHistory, totalPuttHistory]);

  const setChart = (chartType) => {
    switch (chartType) {
      case "Putts":
        setParentChartType("LineChart");
        setChartType("Putts");
        setChartData({
          labels: roundHistory?.map((round, index) => {
            return round.end_date?.slice(5, 10);
          }),
          datasets: [
            {
              data: totalPuttHistory
            }
          ]
        });
        break;
      case "FWY %":
        setParentChartType("LineChart");
        setChartType("FWY %");

        setChartData({
          labels: roundHistory?.map((round, index) => {
            return round.end_date?.slice(5, 10);
          }),
          datasets: [
            {
              data: appState.statState?.fwyData?.fwyHistory.filter(
                (i) => i !== "NaN"
              )
            }
          ]
        });
        break;
      case "GIR %":
        setParentChartType("LineChart");
        setChartType("GIR %");
        setChartData({
          labels: roundHistory?.map((round, index) => {
            console.log(
              "🚀 ~ file: Trends.jsx ~ line 68 ~ labels:roundHistory[0]?.map ~ round",
              round
            );
            return round.end_date?.slice(5, 10);
          }),
          datasets: [
            {
              data: appState.statState?.girData?.girHistory
            }
          ]
        });
        break;
      case "Scramble %":
        setParentChartType("LineChart");
        setChartType("Scramble %");
        setChartData({
          labels: roundHistory?.map((round, index) => {
            return round.end_date?.slice(5, 10);
          }),
          datasets: [
            {
              data: appState.statState?.scrData?.scrHistory
            }
          ]
        });
        break;
      case "Handicap":
        setParentChartType("LineChart");
        setChartType("HCP");
        setChartData({
          labels: roundHistory?.map((round, index) => {
            if (index < handicapHistory.length) {
              return round.end_date?.slice(5, 10);
            } else {
              return "NA";
            }
          }),
          datasets: [
            {
              data: handicapHistory.length > 0 ? handicapHistory : [0]
            }
          ]
        });
        break;
      case "Shots":
        if (roundHistory[0]) {
          setChartType("Shots");
          setParentChartType("LineChart");
          setChartData({
            labels: roundHistory?.map((round, index) => {
              return round.end_date?.slice(5, 10);
            }),
            datasets: [
              {
                data: roundHistory.map((round) => {
                  {
                    if (round.calculated_holes_played === 9) {
                      return round.total_score * 2;
                    } else if (round.calculated_holes_played === 18) {
                      return round.total_score;
                    }

                    return round.total_score;
                  }
                })
              }
            ]
          });
        }
        break;
      case "Scoring":
        setParentChartType("PieChart");
        setChartType("Scoring");
        setChartData([
          {
            name: "Eagles",
            count: appState.statState.birdieObj?.eagles,
            color: Theme.piePalette[0],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Birdies",
            count: appState.statState.birdieObj?.birdies,
            color: Theme.piePalette[1],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Pars",
            count: appState.statState.birdieObj?.pars,
            color: Theme.piePalette[2],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Bogeys",
            count: appState.statState.birdieObj?.bogies,
            color: Theme.piePalette[3],

            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Doubles",
            count: appState.statState.birdieObj?.doubles,
            color: Theme.piePalette[4],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Triples +",
            count: appState.statState.birdieObj?.triples,
            color: Theme.piePalette[5],
            legendFontColor: "#000",
            legendFontSize: 15
          }
        ]);
        break;
    }
  };

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
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/pgaguy.png")}
          style={styles.bgImage}
        />
        <View style={styles.homePageContainer}>
          {roundHistory[0] ? (
            <View style={styles.headerContainer}>
              <Text
                onLongPress={() => resetDatabase(true)}
                style={styles.header}
              >
                Total {chartType}
              </Text>
            </View>
          ) : (
            <View style={styles.styledButton}>
              <Text onLongPress={() => resetDatabase(true)}>
                Start playing to see your stats!
              </Text>
            </View>
          )}

          {roundHistory[0] && parentChartType === "LineChart" && (
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={240}
              chartConfig={chartConfig}
              bezier
              style={{
                alignSelf: "center",
                marginVertical: 5,
                borderRadius: 16
              }}
            />
          )}
          {roundHistory[0] && parentChartType === "PieChart" && (
            <PieChart
              data={chartData}
              chartConfig={chartConfig}
              height={240}
              style={{
                left: 20,
                marginVertical: 5,
                borderRadius: 16
              }}
              width={Dimensions.get("window").width}
              center={[5, 0]}
              hasLegend={true}
              accessor={"count"}
              backgroundColor={"transparent"}
              absolute="true"
            />
          )}

          {roundHistory[0] && (
            <>
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart("Shots")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Shots" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Score</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.avgScore
                        ? appState.statState.avgScore.toFixed(1)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Putts")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Putts" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Putts</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.avgPutts
                        ? appState.statState.avgPutts.toFixed(1)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Handicap")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "HCP" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>HCP</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.hcp
                        ? appState.statState.hcp.toFixed(1)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart("FWY %")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "FWY %" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>FWY %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.fwyData?.fwyPct
                        ? appState.statState?.fwyData?.fwyPct.toFixed(0)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("GIR %")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "GIR %" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>GIR %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState.girData?.girPct &&
                        appState.statState.girData?.girPct?.toFixed(0)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Scramble %")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Scramble %" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>SCR %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.scrData?.scrPct
                        ? appState.statState?.scrData.scrPct.toFixed(0)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart("Scoring")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Scoring" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Eagles</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.birdieObj?.eagles &&
                        appState.statState?.birdieObj?.eagles}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Scoring")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Scoring" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Birdies</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.birdieObj?.birdies &&
                        appState.statState?.birdieObj?.birdies}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Scoring")}>
                  <View
                    style={[
                      styles.trendContainer,
                      chartType === "Scoring" && styles.selectBox
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Pars</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {appState.statState?.birdieObj?.pars &&
                        appState.statState?.birdieObj?.pars}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
}
