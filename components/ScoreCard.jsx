import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreCardStyles'
import holeInfo from '../assets/holeInfo'
import db, { getScore } from '../db/dbSetup'
import { AppContext } from '../context/AppContext'
import { PlayContext } from '../context/PlayContext'

export default function ScoreCard({ holeNum }) {
  const [scoreState, setScoreState] = useState({})
  const [p2scoreState, setP2ScoreState] = useState({})
  const [p3scoreState, setP3ScoreState] = useState({})
  const [p4scoreState, setP4ScoreState] = useState({})
  const [playerArray, setPlayerArray] = useState([])
  const [p1totalScore, setP1TotalScore] = useState(0)
  const [p2totalScore, setP2TotalScore] = useState(0)
  const [p3totalScore, setP3TotalScore] = useState(0)
  const [p4totalScore, setP4TotalScore] = useState(0)
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  let appState = appContext.value.state
  let playState = playContext.value.state

  console.log('appContext', appContext)
  // console.log(scoreState)
  useEffect(() => {
    // console.log(appContext.value.state)
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
    // getUsersAsync()
  }, [appContext.value.state])

  useEffect(() => {
    console.log('playContext', playState)

    const getScores = async () => {
      let totalScore = 0;
      // const scoreBoard = appContext
      const scoreResult = await getScore(appState.round_id);
      // console.log('score result in scorecard', scoreResult)
      scoreResult.rows._array.forEach(function (scoreObj) {
        // console.log('scoreObj', scoreObj)
        scoreBoard[scoreObj['hole_num']] = scoreObj['total_shots']
        totalScore += scoreObj['total_shots']
      })
      setScoreState(scoreBoard)
      setP1TotalScore(totalScore)

      if (appContext.value.state.user_2_name) {
        const scb2 = {}
        let ts2 = 0
        const scoreResult2 = await getScore(appState.user_2_rd_id);
        scoreResult2.rows._array.forEach(function (scoreObj) {
          // console.log('scoreObj', scoreObj)
          scb2[scoreObj['hole_num']] = scoreObj['total_shots']
          ts2 += scoreObj['total_shots']
        })
        setP2ScoreState(scb2)
        setP2TotalScore(ts2)
      }
      if (appContext.value.state.user_3_name) {
        const scb3 = {}
        const scoreResult3 = await getScore(appState.user_3_rd_id);
        let ts3 = 0
        scoreResult3.rows._array.forEach(function (scoreObj) {
          // console.log('scoreObj', scoreObj)
          scb3[scoreObj['hole_num']] = scoreObj['total_shots']
          ts3 += scoreObj['total_shots']
        })
        setP3ScoreState(scb3)
        setP3TotalScore(ts3)
      }
      if (appContext.value.state.user_4_name) {
        const scb4 = {}
        let ts4 = 0
        const scoreResult4 = await getScore(appState.user_4_rd_id);
        scoreResult4.rows._array.forEach(function (scoreObj) {
          // console.log('scoreObj', scoreObj)
          scb4[scoreObj['hole_num']] = scoreObj['total_shots']
          ts4 += scoreObj['total_shots']
        })
        setP4ScoreState(scb4)
        setP4TotalScore(ts4)
      }
    }
    getScores()
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
    <View style={styles.container}>
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
