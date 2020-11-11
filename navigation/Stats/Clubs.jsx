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
const { width } = Dimensions.get('window');

export function Clubs({ navigation }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const shotData = statState.shotData
  const [club, setClub] = React.useState(null)
  const [clubView, setClubView] = React.useState(false)
  // Carousel ref
  const carRef = React.useRef(null)

  const handlePress = () => {
    navigation.push('Hole')
  }

  const handleClubSelect = (clubindex) => {
    setClub(clubindex)
    setClubView(!clubView)
  }

  const handleClubView = () => {
    setClubView(!clubView)
  }

  const [index, setIndex] = React.useState(0)

  const shotDataArray = shotData
  // console.log(shotDataArray)

  let clubList;
  if (shotDataArray) {


    clubList = shotDataArray.map((clb, i) => {
      return (
        <View key={`cl${i}`} style={[clb.club_id === club && styles.selected, styles.club]} >
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
      <View style={{
        width: width - 100, margin: 25, height: 500, borderRadius: 50, backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
        //  borderColor: 'black', borderWidth: 2, borderStyle: 'solid'
      }}>
        <Text style={{ color: 'black' }} onPress={() => handleClubView()}>{item.name}</Text>
        <Text style={{ color: 'black' }} onPress={() => handleClubView()}> Max -  {item.max}</Text>
        <Text style={{ color: 'black' }} onPress={() => handleClubView()}>Avg -  {item.avg}</Text>
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
          <View style={styles.clubmasterContainer}>
            {/* <Text onPress={() => handleClubView()}>Open Club list</Text> */}
            <View style={styles.clubContainer}>
              {shotDataArray[0] ? clubList : 
              <Text>
                Save some shots to see your distances!
              </Text> }
            </View>
          </View>
        </View>
      </View>
    </>
  );
}