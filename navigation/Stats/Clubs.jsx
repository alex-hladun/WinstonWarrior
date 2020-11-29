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
import { ClubCard } from './ClubCard'

const { width } = Dimensions.get('window');

export function Clubs({ navigation }) {
  const shotData = useShotData(1)
  // console.log("🚀 ~ file: Clubs.jsx ~ line 19 ~ Clubs ~ shotData", shotData)
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

  const clubMenuItem = (clb) => {
    // console.log('render club item', clb)
    return (
      <View key={`cl${clb.index}`} style={[styles.club, {backgroundColor: Theme.palette[clb.item.id]}]} >
      <TouchableOpacity onPress={() => handleClubSelect(clb.index)}>
        <Text key={`club${clb.index}`} style={styles.medTxt}>
          {clb.item.name}
        </Text>
        <Text key={`clubss${clb.index}`} style={styles.smallTxt}>
          {clb.item.avg.toFixed(0)} yds
      </Text>
      </TouchableOpacity>
    </View>
    )
  };


  const _renderItem = ({ item, index }) => {
    return (
      <ClubCard handleClubView={handleClubView} item={item}/>
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
        <Image source={require('../../assets/images/vectors/coollogo.png')} style={styles.bgImage} />
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
            {shotDataArray[0] ? 
            <FlatList 
            numColumns={3}
            key={'test'}
            data={shotData} renderItem={clubMenuItem} keyExtractor={item => `${item.id}`} />
            :
              <View style={styles.styledButton}>
                <Text>
                  Save some shots to see your distances!
              </Text>
              </View>}
          </View>
        </View>
    </>
  );
}