import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/PlayStyles'
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'
import XSymbol from '../assets/svg/XSymbol';
import { getPct, postRound } from '../db/dbSetup'


const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

const sumFront = obj => {
  let holeArray = Object.keys(obj).filter(a => a < 10)
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole]
    }
  }
  return sum
}
const sumBack = obj => {
  let holeArray = Object.keys(obj).filter(a => a > 9)
  console.log(holeArray)
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole]
    }
  }
  return sum
}

const diffCalc = (score, rtg, slp) => {
  // (Adjusted Gross Score - Course Rating) X 113 ÷ Slope Rating
  return ((score - rtg) * 113 / slp)
}

export default function RoundSummary({ handleRoundSummary }) {
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  let playState = playContext.value.state
  let appState = appContext.value.state
  const [scoreArr, setScoreArr] = useState([])
  const [scoreObj, setScoreObj] = useState({})
  // const [p1totalScore, setP1TotalScore] = useState(0)
  // const [p2totalScore, setP2TotalScore] = useState(0)
  // const [p3totalScore, setP3TotalScore] = useState(0)
  // const [p4totalScore, setP4TotalScore] = useState(0)


  useEffect(() => {
    console.log(playState.p1score)
    let newArr = [];
    let newObj = {}

    newArr.push({
      name: appState["user_name"],
      totalScore: sumValues(playState.p1score),
      frontScore: sumFront(playState.p1score),
      backScore: sumBack(playState.p1score),
    })

    newObj['p1'] = {
      name: appState["user_name"],
      totalScore: sumValues(playState.p1score),
      frontScore: sumFront(playState.p1score),
      backScore: sumBack(playState.p1score),
    }

    if (appState["user_2_name"]) {
      newArr.push({
        name: appState["user_2_name"],
        totalScore: sumValues(playState.p2score),
        frontScore: sumFront(playState.p2score),
        backScore: sumBack(playState.p2score)
      })

      newObj['p2'] = {
        name: appState["user_2_name"],
        totalScore: sumValues(playState.p2score),
        frontScore: sumFront(playState.p2score),
        backScore: sumBack(playState.p2score),
      }
    }
    if (appState.user_3_name) {
      newArr.push({
        name: appState["user_3_name"],
        totalScore: sumValues(playState.p3score),
        frontScore: sumFront(playState.p3score),
        backScore: sumBack(playState.p3score)
      })

      newObj['p3'] = {
        name: appState["user3_name"],
        totalScore: sumValues(playState.p3score),
        frontScore: sumFront(playState.p3score),
        backScore: sumBack(playState.p3score),
      }
    }
    if (appState.user_4_name) {
      newArr.push({
        name: appState["user_4_name"],
        totalScore: sumValues(playState.p3score),
        frontScore: sumFront(playState.p4score),
        backScore: sumBack(playState.p4score)
      })
      newObj['p4'] = {
        name: appState["user_4_name"],
        totalScore: sumValues(playState.p4score),
        frontScore: sumFront(playState.p4score),
        backScore: sumBack(playState.p4score),
      }
    }

    const sortedArray = newArr.sort((a, b) => (a.totalScore > b.totalScore) ? 1 : ((b.totalScore > a.totalScore) ? -1 : 0))

    sortedArray[0]['position'] = 1;
    let leadScore = sortedArray[0].totalScore
    let position = 1;

    for (let i = 1; i < sortedArray.length; i++)
      if (sortedArray[i].totalScore === leadScore) {
        sortedArray[i]['position'] = position;
      } else {
        position = i + 1;
        leadScore = sortedArray[i].totalScore
        sortedArray[i]['position'] = position;
      }
    console.log('sorted positions', sortedArray)

    setScoreArr(sortedArray)
    // setScoreObj(newObj)

  }, [playState])

  let players;

  if (scoreObj) {
    players = scoreArr
      .sort((a, b) => (a.totalScore > b.totalScore) ? 1 : ((b.totalScore > a.totalScore) ? -1 : 0))
      .map((player, index) => {
        return (
          <View key={`${index}s`} style={[styles.playerRow]}>
            <View style={[styles.playerPosition, player.position === 1 ? styles.win : player.position === 2 ? styles.second : player.position === 3 ? styles.third : styles.fourth]}>
              <Text>{player.position}</Text>
            </View>
            <Text style={styles.player} key={`${index}playewwr`}>
              {player.name}
            </Text>
            <View style={[styles.playerPosition]}>
              <Text style={styles.bold}>{player.totalScore}</Text>
            </View>
          </View>
        )
      })
  }

  const handleScoreSubmit = async () => {
    // const pctObj = await getPct(appState.round_id)

// FWY % AND TOTAL PUTTS AND GIR % BLANK VALUES
    await postRound(sumValues(playState.p1score), appState.round_id, diffCalc(sumValues(playState.p1score), 71.8, 127), 30, 20, 20)
    appContext.value.doneRound()
    playContext.value.doneRound()
  }

  return (
    <>
      <View style={styles.backgroundContainer}>
        <Image source={require('../assets/images/vectors/Asset40.png')} style={styles.bgTrophy} />
        <TouchableOpacity onPress={() => handleRoundSummary()}>

          <View style={styles.headerContainer}>

            <Text>
              <XSymbol />
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>
          Final Scores
    </Text>
        {players}
        <TouchableOpacity onPress={() => handleScoreSubmit()}>
          <View style={[styles.styledButton, styles.playButton]}>
            <Text style={styles.buttonText}>
              Save Round
</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}