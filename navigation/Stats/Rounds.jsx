import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import { StatContext } from '../../context/StatContext'


const RoundItem = ({ round }) => {

  // console.log('round in RoundItem', round.item)

  return (
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
  )
};

export function Rounds({ navigation }) {
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state

  let roundHistory;

  if(statState && statState.roundHistory) {
    roundHistory = statState.roundHistory.reverse()

  }
  // console.log("Trends -> roundHistory", roundHistory)

  const renderItem = (round) => {
    // console.log('Render item in Rounds.js', round)
    return (<RoundItem round={round} />)
  };

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <SafeAreaView>
            {roundHistory[0] ? 
            <FlatList data={roundHistory} renderItem={renderItem} keyExtractor={item => `${item.round_id}`} />
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