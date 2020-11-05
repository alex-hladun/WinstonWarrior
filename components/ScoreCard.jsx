import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreCardStyles'
import holeInfo from '../assets/holeInfo'
import db, { getScore } from '../db/dbSetup'
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'
import XSymbol from '../assets/svg/XSymbol';

const sumValues = obj => {
  if (obj) {
    return Object.values(obj).reduce((a, b) => a + b)
  }
};

export default function ScoreCard({ holeNum, handleScoreCardEnter }) {
  const playContext = React.useContext(PlayContext)
  let playState = playContext.value.state
  const [scoreState, setScoreState] = useState(playState.p1score)
  const [p2scoreState, setP2ScoreState] = useState(playState.p2score)
  const [p3scoreState, setP3ScoreState] = useState(playState.p3score)
  const [p4scoreState, setP4ScoreState] = useState(playState.p4score)
  const [playerArray, setPlayerArray] = useState([])
  const [p1totalScore, setP1TotalScore] = useState(0)
  const [p2totalScore, setP2TotalScore] = useState(0)
  const [p3totalScore, setP3TotalScore] = useState(0)
  const [p4totalScore, setP4TotalScore] = useState(0)
  const appContext = React.useContext(AppContext)
  let appState = appContext.value.state


  useEffect(() => {
    // console.log('playState', playState)
    // get array of user names
    let newArr = [appContext.value.state.user_name];
    if (appContext.value.state["user_2_name"]) {
      newArr.push(appContext.value.state["user_2_name"])
    }
    if (appContext.value.state.user_3_name) {
      newArr.push(appContext.value.state.user_3_name)
    }
    if (appContext.value.state.user_4_name) {
      newArr.push(appContext.value.state.user_4_name)
    }
    setPlayerArray(newArr)

  }, [appContext.value.state])

  useEffect(() => {
    // Calculate total scores
    // console.log('playContext', playState)

    let totalScore = sumValues(scoreState)
    setP1TotalScore(totalScore)

    if (appContext.value.state.user_2_name) {
      let ts2 = sumValues(p2scoreState)
      setP2TotalScore(ts2)
    }
    if (appContext.value.state.user_3_name) {
      let ts3 = sumValues(p3scoreState)
      setP3TotalScore(ts3)
    }

    if (appContext.value.state.user_4_name) {
      let ts4 = sumValues(p4scoreState)
      setP4TotalScore(ts4)
    }
  }, [])


  let backPar = 0
  let frontPar = 0
  const tableBuilder = (startIndex, endIndex, type, name = '', scoreStateObj = {}, setScoreStateObj = null) => {
    let frontScore = 0
    let backScore = 0
    const newArr = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (type === 'header') {
        if (i === startIndex) {
          newArr.push(
            <View key={`ke25s${i}`} key={i} style={[styles.invisibleHeader, styles.holeHeader]}>
              <Text>
              </Text>
            </View>)
        } else if (i === endIndex) {
          if (startIndex < 3) {
            newArr.push(
              <View key={`${i}ds`} style={[styles.headerCell, styles.holeHeader]}>
                <Text style={styles.holeHeader}>
                  Out
                </Text>
              </View>)
          } else {
            newArr.push(
              <View key={`ke5s2${i}`} style={[styles.headerCell, styles.holeHeader]}>
                <Text style={styles.holeHeader}>
                  In
                </Text>
              </View>)
            newArr.push(
              <View key={`k2e5s${i}`} style={[styles.headerCell, styles.holeHeader]}>
                <Text style={styles.holeHeader}>
                  Total
                </Text>
              </View>)
          }

        } else {
          newArr.push(
            <View key={`ke5s${i}`} style={[styles.headerCell, styles.holeHeader]}>
              <Text style={styles.holeHeader}>
                {i}
              </Text>
            </View>
          )
        }
      } else if (type === 'Par') {
        if (i === startIndex) {
          newArr.push(
            <View key={`ke3ss${i}`} style={[styles.invisibleHeader, styles.parCell]}>
              <Text style={styles.whiteText} key={i}>
                Par
            </Text>
            </View>
          )
        } else if (i === endIndex) {
          if (startIndex < 5) {
            newArr.push(
              <View key={`k5as${i}`} style={[styles.headerCell, styles.parCell]}>
                <Text style={styles.whiteText} key={i}>
                  {frontPar}
                </Text>
              </View>
            )
          } else {
            newArr.push(
              <View key={`ke4s${i}`} style={[styles.headerCell, styles.parCell]}>
                <Text style={styles.whiteText} key={i}>
                  {backPar}
                </Text>
              </View>
            )
            newArr.push(
              <View key={`kesa2s${i}`} style={[styles.headerCell, styles.parCell]}>
                <Text style={styles.whiteText} key={i}>
                  {backPar + frontPar}
                </Text>
              </View>
            )
          }
        } else {
          if (startIndex < 5) {
            frontPar += holeInfo[i].par
          } else {
            backPar += holeInfo[i].par
          }
          newArr.push(
            <View key={`k54es${i}`} style={[styles.headerCell, styles.parCell]}>
              <Text style={styles.whiteText} key={i}>
                {holeInfo[i].par}
              </Text>
            </View>
          )

        }
      } else if (type === 'Score') {
        if (i === startIndex) {
          newArr.push(
            <View key={`ke223s${i}`} style={[styles.score, styles.invisibleHeader]}>
              <Text key={i}>
                {name}
              </Text>
            </View>
          )
        } else if (i === endIndex) {
          if (startIndex < 5) {
            // if (name === appState.user_2_name) {
            //   setP2FrontScore(frontScore)
            // }

            newArr.push(
              <View key={`k54es${i}`} style={[styles.score, styles.headerCell]}>
                <Text style={styles.score} key={i}>
                  {frontScore}
                </Text>
              </View>
            )
          } else {
            newArr.push(
              <View key={`k34es${i}`} style={styles.headerCell}>
                <Text style={styles.score} key={i}>
                  {backScore}
                </Text>
              </View>
            )


            newArr.push(
              <View key={`ke323s${i}`} style={styles.headerCell}>
                <Text style={styles.score} key={i}>
                  {name === appState.user_name ? p1totalScore : name === appState.user_2_name ? p2totalScore : name === appState.user_3_name ? p3totalScore : p4totalScore}
                </Text>
              </View>
            )
          }
        }
        else {
          if (startIndex < 5 && scoreStateObj[i]) {
            frontScore += scoreStateObj[i]
          } else if (scoreStateObj[i]) {
            backScore += scoreStateObj[i]
          }
          newArr.push(
            <View key={`kesaas${i}`} style={styles.headerCell}>
              <Text style={styles.score} key={i}>
                {scoreStateObj[i]}
              </Text>
            </View>
          )
        }
      } else if (type === 'yards') {
        // If I wanted to add yardage to scorecard
      }
    }
    return newArr
  }



  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.rowContainer}>
      <TouchableOpacity onPress={() => handleScoreCardEnter()}>
        <View style={styles.headerContainer}>
          <Text>
          <XSymbol />
          </Text>
        </View>
      </TouchableOpacity>
        </View>
      <View key={`id2`} style={styles.table}>
        <View style={styles.tableChild}>
          <View style={styles.tableRow}>
            {tableBuilder(0, 10, 'header')}
          </View>
          <View style={styles.tableRow}>
            {tableBuilder(0, 10, 'Par')}
          </View>
          <View style={styles.tableRow}>
            {tableBuilder(0, 10, 'Score', playerArray[0], scoreState, setScoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_2_name && tableBuilder(0, 10, 'Score', appState.user_2_name, p2scoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_3_name && tableBuilder(0, 10, 'Score', appState.user_3_name, p3scoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_4_name && tableBuilder(0, 10, 'Score', appState.user_4_name, p4scoreState)}
          </View>
        </View>
        <View style={styles.tableChild}>
          <View style={styles.tableRow}>
            {tableBuilder(9, 19, 'header')}
          </View>
          <View style={styles.tableRow}>
            {tableBuilder(9, 19, 'Par')}
          </View>
          <View style={styles.tableRow}>
            {tableBuilder(9, 19, 'Score', playerArray[0], scoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_2_name && tableBuilder(9, 19, 'Score', appState.user_2_name, p2scoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_3_name && tableBuilder(9, 19, 'Score', appState.user_3_name, p3scoreState)}
          </View>
          <View style={styles.tableRow}>
            {appState.user_4_name && tableBuilder(9, 19, 'Score', appState.user_4_name, p4scoreState)}
          </View>
        </View>
      </View>
    </View>
  )

}
