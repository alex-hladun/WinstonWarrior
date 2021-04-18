import { Theme } from "../assets/styles/Theme";

const generatePieData = (stats) => {
  return [
    {
      name: "Eagles",
      count: stats?.eagles,
      color: Theme.piePalette[0],
      legendFontColor: "#666464",
      legendFontSize: 15
    },
    {
      name: "Birdies",
      count: stats?.birdies,
      color: Theme.piePalette[1],
      legendFontColor: "#666464",
      legendFontSize: 15
    },
    {
      name: "Pars",
      count: stats?.pars,
      color: Theme.piePalette[2],
      legendFontColor: "#666464",
      legendFontSize: 15
    },
    {
      name: "Bogeys",
      count: stats?.bogies,
      color: Theme.piePalette[3],
      legendFontColor: "#666464",
      legendFontSize: 15
    },
    {
      name: "Doubles",
      count: stats?.doubles,
      color: Theme.piePalette[4],
      legendFontColor: "#666464",
      legendFontSize: 15
    },
    {
      name: "Triples +",
      count: stats?.triples,
      color: Theme.piePalette[5],
      legendFontColor: "#666464",
      legendFontSize: 15
    }
  ];
};

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

export { generatePieData, pieChartConfig };
