import * as React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import EditScreenInfo from '../components/EditScreenInfo';
import Hole from '../components/Hole'
import { Text, View } from '../components/Themed';
import { AppContext } from '../context/AppContext'
import { StatContext } from '../context/StatContext'
import NavigationPlay from '../navigation/PlayHome'
import { PlayContext } from '../context/PlayContext'
import { createWinston, loadAvgPutts, loadBestScore, loadAvgScore, loadTotalRounds, seedData, setUpDB, loadStats, removeDB, loadFairwayData, registerUser, getClubs, loadHoleStats, loadLow, createClubs, getScore, loadBirds, loadHoleHistory, loadShots, loadFairwayDataTotal, getPct } from '../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';

export default function TabOneScreen() {
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  const statContext = React.useContext(StatContext)
  const contextState = appContext.value.state
  const [initialHole, setInitialHole] = React.useState(1)


  React.useEffect(() => {

    let reset = false;
    if (reset) {
      console.log('resetting DB SHOULD ONLY RUN ONCE')
      removeDB()
      setUpDB()
      createWinston()
      registerUser('Alex')
      createClubs()
      seedData()
    }
    retrieveStats()


    let roundID

    const checkExisting = async () => {
      // console.log('checking existing round')
      try {
        roundID = await AsyncStorage.getItem('roundID')
        if (roundID) {
          Alert.alert(
            "Existing Round",
            "Would you like to return to your game?",
            [
              {
                text: "No",
                onPress: () => console.log('NOT loading existing round'),
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: () => {

                  appContext.dispatch({
                    type: 'set_round_id',
                    data: JSON.parse(roundID)
                  })

                  setHole()
                  checkAndRestoreScores()
                }
              }
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        // No previus round
      }
    }

    const getAllClubs = async () => {
      const clubs = await getClubs()
      appContext.dispatch({
        type: 'set_club_list',
        data: clubs
      })
      // console.log('clubs set')
    }

    checkExisting()
    getAllClubs()
  }, [])

  const setHole = async () => {
    // Also put scores into state
    const holeNum = await AsyncStorage.getItem('holeNum')
    const holeNumDig = JSON.parse(holeNum)
    console.log('Setting SAVED hole to ', holeNumDig)
    setInitialHole(holeNumDig)
    appContext.value.setHole(holeNumDig)

    appContext.dispatch({
      type: 'set_view_mode',
      data: 'play'
    })
  }

  const retrieveStats = async () => {
    const statsArray = await loadStats(1)
    // console.log("TabOneScreen -> statsArray with roundHistory", statsArray)
    statContext.dispatch({
      type: 'set_round_history',
      data: statsArray
    })

    // console.log('round history', statsArray)


    // Get individual TOTAL hole stats
    const holeStats = await loadHoleStats(1, 1)
    // console.log("TabOneScreen -> holeStats", holeStats)
    let holeObj = {}
    for (let i = 1; i <= 18; i++) {
      holeObj[i] = {}
    }

    holeStats.forEach((hole) => {
      holeObj[hole.hole_num]['avgShots'] = hole.avg_shots
      holeObj[hole.hole_num]['avgPutts'] = hole.avg_putts
    })

    statContext.dispatch({
      type: 'set_hole_stats',
      data: holeObj
    })

    // Get counts of birdie, par, eagle for each hole
    const birdieCount = await loadBirds(1, 1)
    // console.log('birdieCount', birdieCount)
    let birdieObj = {}
    for (let i = 1; i <= 18; i++) {
      birdieObj[i] = {
        pars: 0,
        birdies: 0,
        eagles: 0,
        rounds: 0,
        GIRs: 0
      }
    }

    const totalBirds = {
      eagles: 0,
      birdies: 0,
      pars: 0
    }

    birdieCount.forEach((hole) => {
      // console.log('scoreObj', hole)
      birdieObj[hole.hole_num].rounds++

      if (hole.total_shots - hole.hole_par === -1) {
        birdieObj[hole.hole_num].birdies++
        totalBirds.birdies ++
      } else if (hole.total_shots - hole.hole_par === 0) {
        birdieObj[hole.hole_num].pars++
        totalBirds.pars ++
      } else if (hole.total_shots - hole.hole_par === -2) {
        birdieObj[hole.hole_num].eagles++
        totalBirds.eagles ++
      }

      if ((hole.total_shots - hole.total_putts + 2) <= hole.hole_par) {
        birdieObj[hole.hole_num].GIRs++

      }
    })

    statContext.dispatch({
      type: 'set_birdies',
      data: birdieObj
    })

    // Get hole history (historical total shots & putts)
    const holeHistory = await loadHoleHistory(1, 1)
    holeObj = {}
    for (let i = 1; i <= 18; i++) {
      holeObj[i] = { score: [], putts: [] }
    }

    holeHistory.forEach((hole) => {
      // console.log("TabOneScreen -> hole history", hole)

      holeObj[hole.hole_num].score.push(hole.total_shots)
      holeObj[hole.hole_num].putts.push(hole.total_putts)

    })
    statContext.dispatch({
      type: 'set_hole_history',
      data: holeObj
    })

    // Shot data logic here
    const shotData = await loadShots(1)
    // console.log('ALL SHOTDATA', shotData)
    statContext.dispatch({
      type: 'set_shot_data',
      data: shotData
    })

    // Retrieve low
    const lowHoleData = await loadLow(1, 1)
    holeObj = {}
    for (let i = 1; i <= 18; i++) {
      holeObj[i] = {}
    }

    lowHoleData.forEach((hole) => {
      holeObj[hole.hole_num] = hole.min_score
    })
    statContext.dispatch({
      type: 'set_low_scores',
      data: holeObj
    })

    const hitFwData = await loadFairwayData(1, 1)
    const allFwData = await loadFairwayDataTotal(1, 1)
    let hitFwObj = {}
    allFwData.forEach((hole) => {
      hitFwObj[hole.hole_num] = {
        totalFairways: hole.total_fairways,
        driverDirection: hole.driver_direction,
        approachRtg: hole.approach_rtg,
        chipRtg: hole.chip_rtg,
        puttRtg: hole.putt_rtg
      }
    })

    hitFwData.forEach(hole => {
      hitFwObj[hole.hole_num] = {
        ...hitFwObj[hole.hole_num], fairwaysHit: hole.total_fairways_hit
      }
    })

    // console.log('FINal FW OBJ', hitFwObj)
    statContext.dispatch({
      type: 'set_fw_data',
      data: hitFwObj
    })

    const totalRounds = await loadTotalRounds(1)
    const avgScore = await loadAvgScore(1)
    const bestScore = await loadBestScore(1)
    const avgPutts = await loadAvgPutts(1)
    console.log(totalRounds, avgScore, bestScore)
    statContext.dispatch({
      type: 'set_total_info',
      data: {
        totalRounds,
        avgScore,
        avgPutts,
        bestScore,
        totalBirds
      }
    })
    // const testFwyPct = await getPct(5005)

    console.log('ALL STATS SAVED INTO STATSTATE')
  }

  const checkAndRestoreScores = async () => {
    // console.log('playcontext', playContext)
    const p1roundID = await AsyncStorage.getItem('roundID')
    const p2roundID = await AsyncStorage.getItem('u2roundid')
    const p3roundID = await AsyncStorage.getItem('u3roundid')
    const p4roundID = await AsyncStorage.getItem('u4roundid')
    const p1Score = await getScore(JSON.parse(p1roundID))

    // console.log('p1 score returned should be array', p1Score)

    let scoreObj = {}
    for (const score of p1Score) {
      console.log(`p1 score ${score}`)
      scoreObj[score.hole_num] = score.total_shots
    }
    playContext.dispatch({
      type: 'restore_p1_score',
      data: scoreObj
    })

    // TODO: this can be refactored in a loop
    if (p2roundID) {
      const p2name = await AsyncStorage.getItem('u2name')
      console.log('RESTOING PLAYER 2, ROUNDID; ', p2roundID)
      let scoreObj2 = {}
      const p2Score = await getScore(JSON.parse(p2roundID))
      for (const score of p2Score) {
        console.log('p2 SCORE OBJ', score)
        scoreObj2[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p2_score',
        data: scoreObj2,
        name: p2name
      })

      appContext.dispatch({
        type: 'set_user_2_name',
        data: p2name
      })
      appContext.dispatch({
        type: 'set_user_2_round_id',
        data: p2roundID
      })
    }
    if (p3roundID) {
      const p3name = await AsyncStorage.getItem('u3name')
      let scoreObj3 = {}
      console.log('RESTORING P3 SCORE')
      const p3Score = await getScore(JSON.parse(p3roundID))
      for (const score of p3Score) {
        console.log('p3 SCORE OBJ', score)
        scoreObj3[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p3_score',
        data: scoreObj3,
        name: p3name
      })

      appContext.dispatch({
        type: 'set_user_3_name',
        data: p3name
      })

      appContext.dispatch({
        type: 'set_user_3_round_id',
        data: p3roundID
      })
    }
    if (p4roundID) {
      const p4name = await AsyncStorage.getItem('u4name')
      let scoreObj4 = {}
      const p4Score = await getScore(JSON.parse(p4roundID))
      for (const score of p4Score) {
        console.log('p4 SCORE OBJ', score)
        scoreObj4[score.hole_num] = score.total_shots
      }
      playContext.dispatch({
        type: 'restore_p4_score',
        data: scoreObj4,
        name: p4name
      })

      appContext.dispatch({
        type: 'set_user_4_name',
        data: p4name
      })

      appContext.dispatch({
        type: 'set_user_4_round_id',
        data: p4roundID
      })
    }
  }

  const [state, setState] = React.useState({
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    },
    geocode: null,
    errorMessage: "",
    hole: 1
  })

  let locationUpdate;

  let location;
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setState({
        ...state, errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1.0,
      timeInterval: 1000
    }, (loc) => {
      setState({ ...state, location: { latitudeDelta: 0.05, longitudeDelta: 0.05, latitude: loc.coords.latitude, longitude: loc.coords.longitude } });
    })
  };

  React.useEffect(() => {
    getLocationAsync()

  }, [locationUpdate])

  return (
    contextState.viewMode === 'play' ?
      <Hole location={state.location} initialHole={initialHole} />
      :
      <NavigationPlay />
  );
}

