import React, { useState, useRef, useCallback } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreStyles'
import holeInfo from '../assets/holeInfo'
import { Picker } from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import CheckSymbol from '../assets/svg/CheckSymbol'
import db from '../db/dbSetup'



export default function Score({ holeNum }) {
  const [score, setScore] = useState(holeInfo[holeNum].par)
  const [putts, setPutts] = useState(2)
  const [teeShot, setTeeShot] = useState(50)
  const [approach, setApproach] = useState(75)
  const [chip, setChip] = useState(75)
  const [putting, setPutting] = useState(75)

  const holes = new Array(9)
  const pickerItems = holes.map((arr, index) => {
    return (
      <Picker.Item label={`${index}`} value={index} />
    )
  })

  const handleScoreSubmit = async() => {
    await db.transaction(tx => {
      tx.executeSql(
        `
          INSERT INTO scores (
            hole_number,
            date_time,
            total_shots,
            total_putts,
            driver_direction,
            approach_rtg,
            chip_rtg,
            putt_rtg
          ) VALUES (?, strftime('%Y-%m-%d %H-%M','now'), ?, ?, ?, ?, ?, ?);
          `
        , [holeNum, score, putts, teeShot, approach, chip, putting], (txObj, result) => {
          console.log('result', result.rows._array)
          console.log('transObj', txObj)
          // console.log('txObj', txObj)
        }, err => console.log('err', err))
    })
    console.log('entered score')
  }

  return (
    <>
      <View style={styles.pickerContainer}>

        <View style={[styles.pickerHeader]}>
          <Text>
            Shots
        </Text>
          <Text>
            Putts
        </Text>

        </View>
        <View style={styles.pickerRow}>

          <Picker
            style={[{ height: 200, width: 100 }]}
            onValueChange={(itemValue, itemIndex) => {
              setScore(itemValue)
            }
            }
            selectedValue={score}
          >
            <Picker.Item color={'blue'} style={styles.pickerStyle} label="1" value={1} />
            <Picker.Item style={styles.pickerStyle} label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
          </Picker>

          <Picker
            style={{ height: 200, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              setPutts(itemValue)
            }
            }
            selectedValue={putts}
          >
            <Picker.Item label="0" value={0} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5+" value={5} />
          </Picker>
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Tee Shot
        </Text>
        </View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            value={teeShot}
            step={25}
            onSlidingComplete={(val) => setTeeShot(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Left
        </Text>
          <Text>
            Middle
        </Text>
          <Text>
            Right
        </Text>
        </View>
        <View style={[styles.pickerHeader, { marginTop: 40 }]}>
          <Text>
            Approach
        </Text>
        </View>
        <View style={[styles.pickerHeader]}>

          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#4dc951"
            maximumTrackTintColor="#000000"
            value={approach}
            // step={0.25}
            onSlidingComplete={(val) => setApproach(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Chipping
        </Text>
        </View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#4dc951"
            maximumTrackTintColor="#000000"
            value={chip}
            // step={0.25}
            onSlidingComplete={(val) => setChip(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Putting
        </Text>
        </View>
        <View style={[styles.pickerHeader]}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#4dc951"
            maximumTrackTintColor="#000000"
            value={putting}
            // step={0.25}
            onSlidingComplete={(val) => setPutting(val)}
          />
        </View>
        <View style={styles.pickerHeader}>
          <View style={[styles.checkSymbol]}>
            <TouchableHighlight>
              <Text onPress={(event) => handleScoreSubmit()}>
                <CheckSymbol />
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  )

}