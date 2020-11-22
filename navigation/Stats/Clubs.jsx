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

const { width } = Dimensions.get('window');

export function Clubs({ navigation }) {
  const shotData = useShotData(1)
  const [club, setClub] = React.useState(null)
  const [clubView, setClubView] = React.useState(false)
  // Carousel ref
  const carRef = React.useRef(null)

  const handleClubSelect = (clubindex) => {
    setClub(clubindex)
    setClubView(!clubView)
  }

  const handleClubView = () => {
    setClubView(!clubView)
  }

  const shotDataArray = shotData
  let clubList;
  if (shotDataArray[0]) {
    clubList = shotDataArray.map((clb, i) => {
      return (
        <View key={`cl${i}`} style={[styles.club]} >
          {/* <LinearGradient colors={[Theme.iconStroke, Theme.clubGradientTo]}> */}
          <TouchableOpacity onPress={() => handleClubSelect(i)}>
            <Text key={`club${i}`} style={styles.medTxt}>
              {clb.name}
            </Text>
            <Text key={`clubss${i}`} style={styles.smallTxt}>
              {clb.avg.toFixed(0)} yds
          </Text>
          </TouchableOpacity>
          {/* </LinearGradient> */}
        </View>
      )
    })
  }




  const shotDataForChart = {
    datasets: [{
      data: [20, 30, 55]
    }],
    labels: ['1', '2', '3']
  }

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

  const _renderItem = ({ item, index }) => {
    console.log(Theme.palette)
    return (
      <View style={[styles.clubCardContainer, { backgroundColor: Theme.palette[item.id]}]}>
        <View style={styles.clubCardHeader}>
          <Text style={styles.clubTypeText} onPress={() => handleClubView()}>{item.name}</Text>
          <Text style={styles.clubAvgText} onPress={() => handleClubView()}>{item.avg.toFixed(0)} yds</Text>
        </View>
        {/* <Text style={{ color: 'black' }} onPress={() => handleClubView()}> Max -  {item.max.toFixed(0)}</Text> */}
        <BarChart
          style={styles.barChartStyle}
          chartConfig={barChartConfig}
          data={shotDataForChart}
          width={Dimensions.get("window").width -125}
          height={370}
        />
      </View>
    );
  }

  const _clubView = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Theme.spinGreen1, paddingTop: 50, }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Carousel
            layout={"stack"}
            ref={carRef}
            data={shotDataArray}
            sliderWidth={100}
            enableMomentum={true}
            enableSnap={true}
            itemWidth={width}
            loop={true}
            firstItem={club}
            initialScrollIndex={7}
            renderItem={_renderItem}
            useScrollView={true}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>

          <Modal animationType="slide" transparent={true} visible={clubView}>
            <View style={styles.xContainer}>
              <TouchableOpacity onPress={() => handleClubView()}>
                <Text>
                  <XSymbol />
                </Text>
              </TouchableOpacity>
            </View>
            <_clubView />
          </Modal>
          <View style={styles.clubContainer}>
            {shotDataArray[0] ? clubList :
              <View style={styles.styledButton}>
                <Text>
                  Save some shots to see your distances!
              </Text>
              </View>}
          </View>
        </View>
      </View>
    </>
  );
}