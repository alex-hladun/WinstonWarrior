import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/PlayStyles'
import { StatContext } from '../../context/StatContext'
import { AppContext } from '../../context/AppContext'
import { useTotalInfo } from '../../hooks/useTotalInfo';
import { useHandicap } from '../../hooks/useHandicap';
import { useHandicapHistory } from '../../hooks/useHandicapHistory';

export function Home({ navigation }) {
  const statContext = React.useContext(StatContext)
  const appContext = React.useContext(AppContext)
  const statState = statContext.value.state
  const appState = appContext.value.state
  const totalInfo = useTotalInfo(1, 'Any')
  // const hcp = useHandicap(1)
  const hcpInfo = useHandicapHistory(1)
  const hcpHistory = hcpInfo.handicapHistory;
  const hcp = hcpHistory[hcpHistory.length - 1]

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
              <Text style={styles.boxContent}>{appState.statState?.totalRounds ? appState.statState?.totalRounds : 0}</Text>

            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>HCP</Text>
              <Text style={styles.boxContent}>{appState.statState?.hcp ? appState.statState.hcp.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Avg Score</Text>
              <Text style={styles.boxContent}>{appState.statState?.avgScore ? appState.statState?.avgScore.toFixed(1) : 'NA'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.boxHeader}>Best</Text>
              <Text style={styles.boxContent}>{appState.statState?.bestScore? appState.statState?.bestScore : 'NA'}</Text>
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