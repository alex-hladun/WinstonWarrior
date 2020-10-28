import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/PlayStyles'
import holeInfo from '../assets/holeInfo'
import { Picker } from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import CheckSymbol from '../assets/svg/CheckSymbol'
import db, { getUsers, postScore } from '../db/dbSetup'
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'

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

export default function RoundSummary() {
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  let playState = playContext.value.state
  const [scoreArr, setScoreArr] = useState([])
  const [p1totalScore, setP1TotalScore] = useState(0)
  const [p2totalScore, setP2TotalScore] = useState(0)
  const [p3totalScore, setP3TotalScore] = useState(0)
  const [p4totalScore, setP4TotalScore] = useState(0)

  let appState = appContext.value.state

  useEffect(() => {
    console.log(playState.p1score)
    let newArr = [];

    newArr.push({
        name: appState["user_name"],
        totalScore: sumValues(playState.p1score),
        frontScore: sumFront(playState.p1score),
        backScore: sumBack(playState.p1score),
      })

    if (appState["user_2_name"]) {
      newArr.push({
        name: appState["user_2_name"],
        totalScore: sumValues(playState.p2score),
        frontScore: sumFront(playState.p2score),
        backScore: sumBack(playState.p2score)
      })
    }
    if (appState.user_3_name) {
      newArr.push({
        name: appState["user_3_name"],
        totalScore: sumValues(playState.p3score),
        frontScore: sumFront(playState.p3score),
        backScore: sumBack(playState.p3score)
      })
    }
    if (appState.user_4_name) {
      newArr.push({
        name: appState["user_4_name"],
        totalScore: sumValues(playState.p3score),
        frontScore: sumFront(playState.p4score),
        backScore: sumBack(playState.p4score)
      })
    }

    setScoreArr(newArr)

  }, [p1totalScore, p2totalScore, p3totalScore, p4totalScore])

  let players;

  if (scoreArr) {
    players = scoreArr.map((player, index) => {
        return (
          <View key={`${index}s`} style={styles.scoreContent}>
          <Text style={styles.whiteText} key={`${index}playewwr`}>
            {player.name} - ({player.frontScore} / {player.backScore}) {player.totalScore}
          </Text>
          </View>
        )
    })
  }

  const handleScoreSubmit = async () => {
    appContext.dispatch({
      type: 'set_round_id',
      data: null
    })
    appContext.dispatch({
      type: 'set_round_id',
      data: null
    })
    appContext.dispatch({
      type: 'set_view_mode',
      data: 'menu'
    })
  }

  return (
    <>
    <Text style={styles.header}>
      Final Scores
    </Text>
      <TouchableOpacity >
        <View style={styles.boxContent}>
          {players}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleScoreSubmit()}>
<View style={[styles.styledButton, styles.playButton]}>
<Text style={styles.buttonText}>
  Save Round
</Text>
</View>
      </TouchableOpacity>
    </>
  )

}