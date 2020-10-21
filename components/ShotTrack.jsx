import React, { useState, useRef, useCallback } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreStyles'
import holeInfo from '../assets/holeInfo'
import { Picker } from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import CheckSymbol from '../assets/svg/CheckSymbol'
import db from '../db/dbSetup'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function ShotTrack({ distance, handleTrackViewClose }) {
  const [club, setClub] = useState(null)
  const [effort, setEffort] = useState(100)

  const handleSubmit = async () => {
    console.log('handle distance submit')
    // await db.transaction(tx => {
    //   tx.executeSql(
    //     `
    //       INSERT INTO scores (
    //         hole_number,
    //         date_time,
    //         total_shots,
    //         total_putts,
    //         driver_direction,
    //         approach_rtg,
    //         chip_rtg,
    //         putt_rtg
    //       ) VALUES (?, strftime('%Y-%m-%d %H:%M:%S','now'), ?, ?, ?, ?, ?, ?);
    //       `
    //     , [holeNum, score, putts, teeShot, approach, chip, putting], (txObj, result) => {
    //       // console.log('result', result.rows._array)
    //       // console.log('transObj', txObj)
    //       setHole(holeNum + 1)
    //       // console.log('txObj', txObj)
    //     }, (err, mess) => console.log('err', mess))
    // })

    handleTrackViewClose()
  }

  const pickWidth = 50

  const clubArray = ['D', '2W', '3W', '4W', '5W', 'HY', 'DI', '3I', '4I', '5I', '6I', '7I', '8I', '9I', 'PW', 'AW', '52', '54', '56', '58', '60']

  const clubList = []

  for (let i = 0; i < clubArray.length; i++) {
    clubList.push(
      // <TouchableWithoutFeedback >
      <View key={`cl${i}`} style={[i === club && styles.selected, styles.club]} >
        <Text key={`club${i}`} onPress={() => setClub(i)}>
          {clubArray[i]}
        </Text>
      </View>
      // </TouchableWithoutFeedback>
    )

  }
  return (
    <>
      <View style={styles.pickerContainer}>
        <View style={[styles.pickerHeader]}>
          <Text>
            Distance
        </Text>

        </View>

        <View style={[styles.pickerHeader]}>
          <Text style={styles.distanceHeader}>
            {distance} yds
        </Text>
        </View>
        <View style={styles.clubContainer}>
          {clubList}
        </View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            value={effort}
            onSlidingStart={(val) => setEffort(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Easy
        </Text>

          <Text>
            Hard
        </Text>
        </View>

        <View style={styles.pickerHeader}>
          <TouchableHighlight onPress={(event) => handleSubmit()}>
            <View style={[styles.checkSymbol]}>
              <Text >
                <CheckSymbol />
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </>
  )

}