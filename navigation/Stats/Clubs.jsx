import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, Modal, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { StatContext } from '../../context/StatContext'
import { AppContext } from '../../context/AppContext'
import { LinearGradient } from 'expo-linear-gradient';
import XSymbol from '../../assets/svg/XSymbol';
import { Theme } from '../../assets/styles/Theme'
import { useShotData } from '../../hooks/useShotData';
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
              {clb.avg} yds
          </Text>
          </TouchableOpacity>
          {/* </LinearGradient> */}
        </View>
      )
    })
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.clubCardContainer}>
        <View style={styles.clubCardHeader}>
          <Text style={styles.clubTypeText} onPress={() => handleClubView()}>{item.name}</Text>
          <Text style={styles.clubAvgText} onPress={() => handleClubView()}>{item.avg} yds</Text>
        </View>
        <Text style={{ color: 'black' }} onPress={() => handleClubView()}> Max -  {item.max}</Text>
        <Text style={{ color: 'black' }} onPress={() => handleClubView()}> Shots - {item.count}</Text>
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

          {/* <View style={styles.clubMasterContainer}> */}
          <View style={styles.clubContainer}>
            {shotDataArray[0] ? clubList :
              <Text>
                Save some shots to see your distances!
              </Text>}
          </View>
        </View>
        {/* </View> */}
      </View>
    </>
  );
}