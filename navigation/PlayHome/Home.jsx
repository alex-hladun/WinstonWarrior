import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/PlayStyles'
import { StatContext } from '../../context/StatContext'
import { useTotalInfo } from '../../hooks/useTotalInfo';
import { useHandicap } from '../../hooks/useHandicap';

export function Home({ navigation }) {
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
  const totalInfo = useTotalInfo(1, 1)
  const hcp = useHandicap(1)

  const handlePress = () => {
    navigation.push('Course')
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>
          <View style={styles.winstonLogoContainer}>
            <Image source={require('../../assets/images/winstonLogo.png')} style={styles.winnyImage} />
            {/* <Text style={[styles.winstonTxtLogin, styles.buttonText]}>
              Winston Warrior
              </Text> */}
          </View>

          <View style={styles.holeRow}>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Rounds</Text>
              <Text style={styles.boxContent}>{totalInfo.totalRounds ? totalInfo.totalRounds : 0}</Text>

            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>HCP</Text>
              <Text style={styles.boxContent}>{hcp.toFixed(1)}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>{totalInfo.avgScore ? totalInfo.avgScore.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best</Text>
              <Text style={styles.boxContent}>{totalInfo.bestScore? totalInfo.bestScore : 'NA'}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => handlePress()}>
            <View style={[styles.styledButton, styles.playButton]}>
              <Text style={styles.buttonText}>Play Golf</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}