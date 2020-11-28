import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, Dimensions, ImageBackground, Modal } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { StatContext } from '../../context/StatContext'
import { useRoundHistory } from '../../hooks/useRoundHistory';
import { RoundCard } from './RoundCard'
import XSymbol from '../../assets/svg/XSymbol';
import { Theme } from '../../assets/styles/Theme'
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');


// Renders into list
const RoundItem = ({ round, handleRoundSelect }) => {
  return (
    <TouchableOpacity onPress={() => handleRoundSelect(round)}>
    <View style={styles.roundItem}>
      <View style={styles.roundLeft}>
        <Text style={styles.roundCourseName}>
          {round.item.course_name}
        </Text>
        <Text style={styles.roundDate}>{round.item.end_date && round.item.end_date.slice(0, 10)}</Text>
      </View>
      <View style={styles.roundRight}>
        <Text style={styles.roundScoreText}>{round.item.total_score}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
};


export function Rounds() {
  const roundHistory = useRoundHistory(1)
  const reverseRoundHistory = roundHistory.reverse()
  const [roundView, setRoundView] = React.useState(false)
  const [round, setRound] = React.useState(null)
  const carRef = React.useRef(null)

  // Item rendered into flatlist
  const renderItem = (round) => {
    return (<RoundItem handleRoundSelect={handleRoundSelect}  round={round} />)
  };

// The component rendered into the carosuel
const _renderItem = ({ item, index }) => {
  return (
    <RoundCard handleRoundView={handleRoundView} item={item}/>
  );
}

const handleRoundSelect = (roundIndex) => {
  setRound(roundIndex)
  setRoundView(!roundView)
}

const handleRoundView = () => {
  setRoundView(!roundView)
}



// The carosuel component rendered into the modal
const _roundView = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.spinGreen1, paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Carousel
          layout={"stack"}
          ref={carRef}
          data={roundHistory}
          sliderWidth={100}
          enableMomentum={true}
          enableSnap={true}
          itemWidth={width}
          loop={true}
          // firstItem={round}
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
        <Modal animationType="slide" transparent={true} visible={roundView}>
            <View style={styles.xContainer}>
              <TouchableOpacity onPress={() => handleRoundView()}>
                <Text>
                  <XSymbol />
                </Text>
              </TouchableOpacity>
            </View>
            <_roundView />
          </Modal>

          <SafeAreaView>
            {roundHistory[0] ? 
            <FlatList data={reverseRoundHistory} renderItem={renderItem} keyExtractor={item => `${item.round_id}`} />
            :
            <View style={styles.styledButton}>
            <Text>
              Play a round to see your history. 
            </Text>
            </View>
          }
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}