import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";
import * as React from "react";
import styles from "../../assets/styles/StatStyles";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Theme } from "../../assets/styles/Theme";
import { AppContext } from "../../context/AppContext";

export function Holes() {
  const width = Dimensions.get("window").width;
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const holeData = appState.statState.courseData.holeStats;
  const holeNum = appState.playState.hole_num;
  console.log(holeData[holeNum]);
  const puttHistory = holeData[holeNum]?.puttHistory;
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
  const [pieChartData, setPieChartData] = React.useState([
    {
      name: "Pars",
      count: 2,
      color: Theme.palette[0],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]);

  const setChart = (chartType) => {
    switch (chartType) {
      case "Putts":
        setChartType("Putts");
        setParentChartType("LineChart");
        setChartData({
          labels: holeData[holeNum].dateHistory.map((holeDate) => {
            return holeDate.slice(5, 10);
          }),
          datasets: [
            {
              data: puttHistory
            }
          ]
        });
        break;
      case "Shots":
        setParentChartType("LineChart");
        setChartType("Shots");
        if (holeData["1"]) {
          setChartData({
            labels: holeData[holeNum].dateHistory.map((holeDate) => {
              return holeDate.slice(5, 10);
            }),
            datasets: [
              {
                data: holeData[holeNum].shotHistory
              }
            ]
          });
        }
        break;
      case "Fairway":
        setParentChartType("Fairway");
        setChartType("Fairway");

        break;
      case "GIR":
        setParentChartType("GIR");
        setChartType("GIR");

        break;

      case "Scoring":
        setChartType("Scoring");
        setParentChartType("PieChart");
        setPieChartData([
          {
            name: "Eagles",
            count: holeData[holeNum].eagles,
            color: Theme.piePalette[0],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Birdies",
            count: holeData[holeNum].birdies,
            color: Theme.piePalette[1],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Pars",
            count: holeData[holeNum].pars,
            color: Theme.piePalette[2],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Bogeys",
            count: holeData[holeNum].bogies,
            color: Theme.piePalette[3],

            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Doubles",
            count: holeData[holeNum].doubles,
            color: Theme.piePalette[4],
            legendFontColor: "#000",
            legendFontSize: 15
          },
          {
            name: "Triples +",
            count: holeData[holeNum].triples,
            color: Theme.piePalette[5],
            legendFontColor: "#000",
            legendFontSize: 15
          }
        ]);
        break;
    }
  };

  React.useEffect(() => {
    setChart(chartType);
  }, [puttHistory, holeNum]);

  const chartConfig = {
    backgroundColor: Theme.chartBackgroundColor,
    paddingTop: 0,
    backgroundGradientFrom: Theme.holeBGGFrom,
    backgroundGradientTo: Theme.holeBGGTo,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForVerticalLabels: {
      rotation: -90
    }
  };

  const fairwayChart = () => {
    return (
      <>
        <View style={styles.customCont1}>
          {holeData[holeNum].fwyHistory.map((i, j) => {
            return (
              <Text key={`fwyx${j}`} style={styles.customText}>
                {holeData[holeNum].dateHistory[j].slice(5, 10)}
              </Text>
            );
          })}
        </View>
        <View style={styles.customCont2}>
          {holeData[holeNum].fwyHistory.map((i, j) => {
            return (
              <Text key={`fwyx${j}`} style={styles.customText}>
                {i}
              </Text>
            );
          })}
        </View>
      </>
    );
  };

  const girChart = () => {
    return (
      <>
        <View style={styles.customCont1}>
          {holeData[holeNum].girHistory.map((i, j) => {
            return (
              <Text key={`fwyx${j}`} style={styles.customText}>
                {holeData[holeNum].dateHistory[j].slice(5, 10)}
              </Text>
            );
          })}
        </View>
        <View style={styles.customCont2}>
          {holeData[holeNum].girHistory.map((i, j) => {
            const scramble =
              holeData[holeNum].scrambleHistory[j] === 1
                ? "Scramble"
                : "Not Scramble";
            return (
              <Text key={`fwyx${j}`} style={styles.customText}>
                GIR {i} +
                {scramble} + penalty {holeData[holeNum].penaltyHistory[j]}
              </Text>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        <View style={styles.homePageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
              Hole {holeNum} ({chartType})
            </Text>
          </View>

          {holeNum && holeData[holeNum] && holeData[holeNum].shotHistory[0] ? (
            <>
              {parentChartType === "LineChart" ? (
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
              ) : parentChartType === "PieChart" ? (
                <PieChart
                  data={pieChartData}
                  chartConfig={chartConfig}
                  height={240}
                  style={{
                    // alignSelf: 'flex-end',
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
              ) : parentChartType === "Fairway" ? (
                <View style={styles.customDataContainer}>{fairwayChart()}</View>
              ) : parentChartType === "GIR" ? (
                <View style={styles.customDataContainer}>{girChart()}</View>
              ) : (
                <View>
                  <Text>Nothing</Text>
                </View>
              )}
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart("Shots")}>
                  <View
                    style={[
                      styles.boxContainer,
                      chartType === "Shots" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Score</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].avgShots
                        ? holeData[holeNum].avgShots.toFixed(1)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Putts")}>
                  <View
                    style={[
                      styles.boxContainer,
                      chartType === "Putts" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Avg Putts</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].avgPutts
                        ? holeData[holeNum].avgPutts.toFixed(1)
                        : "NA"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("Scoring")}>
                  <View
                    style={[
                      styles.boxContainer,
                      chartType === "Scoring" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>Best Score</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].lowScore}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.holeRow}>
                <TouchableOpacity onPress={() => setChart("Fairway")}>
                  <View
                    style={[
                      styles.boxContainer,
                      parentChartType === "Fairway" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>FWY %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].fairwaysHit
                        ? (
                            (100 * holeData[holeNum].fairwaysHit) /
                            holeData[holeNum].totalFairways
                          ).toFixed(0)
                        : "0"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("GIR")}>
                  <View
                    style={[
                      styles.boxContainer,
                      parentChartType === "GIR" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>GIR %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].GIRs
                        ? (
                            (holeData[holeNum].GIRs * 100) /
                            holeData[holeNum].rounds
                          ).toFixed(0)
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChart("GIR")}>
                  <View
                    style={[
                      styles.boxContainer,
                      parentChartType === "GIR" && styles.selectBoxHole
                    ]}
                  >
                    <View style={styles.boxHeader}>
                      <Text style={styles.boxHeaderText}>SCR %</Text>
                    </View>
                    <Text style={styles.boxContent}>
                      {holeData[holeNum].scrambleSuccess
                        ? (
                            (holeData[holeNum].scrambleSuccess * 100) /
                            holeData[holeNum].scrambleChances
                          ).toFixed(0)
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
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
          ) : (
            <View style={styles.chartContainer}>
              <Text>Save a score to this hole to see hole stats</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
