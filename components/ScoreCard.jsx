import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreCardStyles'
import holeInfo from '../assets/holeInfo'
import db from '../db/dbSetup'

export default function ScoreCard({ holeNum }) {
  const [scoreState, setScoreState] = useState({})

  const playerArray=['Alex','Carter','Paul','Will']

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `
          SELECT * FROM scores;
          `
        , null, (txObj, result) => {
          // console.log('score result', result.rows._array)

          const scoreBoard = {}
          result.rows._array.forEach(function (scoreObj) {
            scoreBoard[scoreObj['hole_number']] = scoreObj['total_shots']
            // newScore[scoreObj['hole_number']] = scoreObj['total_shots']
            // console.log('newscore', newScore)
          })
          setScoreState(scoreBoard)
          // console.log('scoreboard', scoreBoard)
          // console.log('scoreState', scoreState)
        }, (err, mess) => console.log('err', mess))
    })

  }, [])

  let frontPar = 0
  let backPar = 0
  let frontScore = 0
  let backScore = 0

  const tableBuilder = (startIndex, endIndex, type, name = '') => {
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
              <View key={`${i}ds`}style={[styles.headerCell, styles.holeHeader]}>
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
            <View key={`k54es${i}`}  style={[styles.headerCell, styles.parCell]}>
              <Text style={styles.whiteText} key={i}>
                {holeInfo[i].par}
              </Text>
            </View>
          )

        }
      } else if (type === 'Score') {
        if (i === startIndex) {
          newArr.push(
            <View  key={`ke223s${i}`} style={[styles.score, styles.invisibleHeader]}>
              <Text key={i}>
                {name}
              </Text>
            </View>
          )
        } else if (i === endIndex) {
          if (startIndex < 5) {
            newArr.push(
              <View key={`k54es${i}`} style={[styles.score, styles.headerCell]}>
                <Text style={styles.score} key={i}>
                  {frontScore}
                </Text>
              </View>
            )
          } else {
            newArr.push(
              <View key={`k34es${i}`}  style={styles.headerCell}>
                <Text style={styles.score} key={i}>
                  {backScore}
                </Text>
              </View>
            )
            newArr.push(
              <View key={`ke323s${i}`}  style={styles.headerCell}>
                <Text style={styles.score} key={i}>
                  {backScore + frontScore}
                </Text>
              </View>
            )
          }
        }
        else {
          if (startIndex < 5 && scoreState[i]) {
            frontScore += scoreState[i]
          } else if (scoreState[i]) {
            backScore += scoreState[i]
          }
          newArr.push(
            <View key={`kesaas${i}`}  style={styles.headerCell}>
              <Text style={styles.score} key={i}>
                {scoreState[i]}
              </Text>
            </View>
          )
        }
      } else if (type === 'yards') {

      }
    }

    return newArr
  }

  const score = tableBuilder(0, 10, 'Score', 'Alex')
  const score2 = tableBuilder(9, 19, 'Score', 'Alex')
  const scoreb = tableBuilder(0, 10, 'Score', 'Frank')
  const scoreb2 = tableBuilder(9, 19, 'Score', 'Frank')
  const scorec = tableBuilder(0, 10, 'Score', 'Michael')
  const scorec2 = tableBuilder(9, 19, 'Score', 'Michael')
  const scored = tableBuilder(0, 10, 'Score', 'Carter')
  const scored2 = tableBuilder(9, 19, 'Score', 'Carter')


  const par = tableBuilder(0, 10, 'Par')
  const par2 = tableBuilder(9, 19, 'Par')

  const tableHeaders = tableBuilder(0, 10, 'header')
  const tableHeaders2 = tableBuilder(9, 19, 'header')


  return (
    <View style={styles.container}>
      <View key={`id2`} style={styles.table}>
        <View style={styles.tableChild}>
          <View style={styles.tableRow}>
            {tableHeaders}
          </View>
          <View style={styles.tableRow}>
            {par}
          </View>
          <View style={styles.tableRow}>
            {playerArray.length > 0 && tableBuilder(0, 10, 'Score', playerArray[0])}
          </View>
          <View style={styles.tableRow}>
            {playerArray.length > 1 && tableBuilder(0, 10, 'Score', playerArray[1])}
          </View>
          <View style={styles.tableRow}>
            {playerArray.length > 2 && tableBuilder(0, 10, 'Score', playerArray[2])}
          </View>
          <View style={styles.tableRow}>
            {playerArray.length > 3 && tableBuilder(0, 10, 'Score', playerArray[3])}
          </View>
        </View>
        <View style={styles.tableChild}>
          <View style={styles.tableRow}>
            {tableHeaders2}
          </View>
          <View style={styles.tableRow}>
            {par2}
          </View>
          <View style={styles.tableRow}>
            {tableBuilder(9, 19, 'Score', playerArray[0])}
          </View>
          <View style={styles.tableRow}>
            {playerArray.length > 1 && tableBuilder(9, 19, 'Score', playerArray[1])}
          </View>
          <View style={styles.tableRow}>
          {playerArray.length > 2 && tableBuilder(9, 19, 'Score', playerArray[2])}
          </View>
          <View style={styles.tableRow}>
          {playerArray.length > 3 && tableBuilder(9, 19, 'Score', playerArray[3])}
          </View>
        </View>
      </View>
    </View>
  )

}
