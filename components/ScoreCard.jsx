import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreCardStyles'
import holeInfo from '../assets/holeInfo'
import db from '../db/dbSetup'

export default function ScoreCard({ holeNum }) {
  const [scoreState, setScoreState] = useState({})

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

  const courseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  let frontPar = 0
  let backPar = 0
  let frontScore = 0
  let backScore = 0

  const tableBuilder = (startIndex, endIndex, type) => {
    const newArr = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (type === 'header') {
        if (i === startIndex) {
          newArr.push(
            <View key={i} style={styles.invisibleHeader}>
              <Text>
              </Text>
            </View>)
        } else if (i === endIndex) {
          if (startIndex < 3) {
            newArr.push(
              <View style={styles.headerCell}>
                <Text>
                  Out
                </Text>
              </View>)
          } else {
            newArr.push(
              <View style={styles.headerCell}>
                <Text>
                  In
                </Text>
              </View>)
            newArr.push(
              <View style={styles.headerCell}>
                <Text>
                  Total
                </Text>
              </View>)
          }
          
        } else {
          newArr.push(
            <View style={styles.headerCell}>
              <Text>
                {i}
              </Text>
            </View>
          )
        }
      } else if (type === 'Par') {
        if (i === startIndex) {
          newArr.push(
            <View style={styles.invisibleHeader}>
              <Text key={i}>
                Par
            </Text>
            </View>
          )
        } else if (i === endIndex) {
          if (startIndex < 5) {
            newArr.push(
              <View style={styles.headerCell}>
                <Text key={i}>
                  {frontPar}
                </Text>
              </View>
            )
          } else {
              newArr.push(
                <View style={styles.headerCell}>
                  <Text key={i}>
                    {backPar}
                  </Text>
                </View>
              )
              newArr.push(
                <View style={styles.headerCell}>
                  <Text key={i}>
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
            <View style={styles.headerCell}>
              <Text key={i}>
                {holeInfo[i].par}
              </Text>
            </View>
          )

        }
      } else if (type === 'Score') {
        if (i === startIndex) {
          newArr.push(
            <View style={[styles.score, styles.invisibleHeader]}>
              <Text key={i}>
                Shot
            </Text>
            </View>
          )
        } else if (i === endIndex) {
          if (startIndex < 5) {
            newArr.push(
              <View style={[styles.score, styles.headerCell]}>
                <Text style={styles.score} key={i}>
                  {frontScore}
                </Text>
              </View>
            )
          } else {
              newArr.push(
                <View style={styles.headerCell}>
                  <Text style={styles.score}  key={i}>
                    {backScore}
                  </Text>
                </View>
              )
              newArr.push(
                <View style={styles.headerCell}>
                  <Text style={styles.score}  key={i}>
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
          newArr.push (
            <View style={styles.headerCell}>
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

  const score = tableBuilder(0,10,'Score')
  const score2 = tableBuilder(9,19,'Score')

  const par = tableBuilder(0,10,'Par')
  const par2 = tableBuilder(9,19,'Par')

  const tableHeaders = tableBuilder(0,10,'header')
  const tableHeaders2 = tableBuilder(9,19,'header')


  return (
    <View key={`id2`} style={[styles.table, {
      transform: [{ rotate: "270deg" }]
    }]}>
      <View style={styles.tableChild}>
        <View style={styles.tableRow}>
          {tableHeaders}
        </View>
        <View style={styles.tableRow}>
          {par}
        </View>
        <View style={styles.tableRow}>
          {score}
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
          {score2}
        </View>
      </View>
    </View>
  )

}
