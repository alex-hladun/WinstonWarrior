import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreStyles'
import holeInfo from '../assets/holeInfo'
import { Picker } from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import CheckSymbol from '../assets/svg/CheckSymbol'
import db, { getUsers, postScore } from '../db/dbSetup'
import { AppContext } from '../context/AppContext'

export default function Score({ holeNum, setHole }) {
  const appContext = React.useContext(AppContext)
  const [playerArray, setPlayerArray] = useState([])
  const [score, setScore] = useState(holeInfo[holeNum].par)
  const [p2score, setP2Score] = useState(holeInfo[holeNum].par)
  const [p3score, setP3Score] = useState(holeInfo[holeNum].par)
  const [p4score, setP4Score] = useState(holeInfo[holeNum].par)
  const [putts, setPutts] = useState(2)
  const [penalty, setPenalty] = useState(0)
  const [teeShot, setTeeShot] = useState(50)
  const [approach, setApproach] = useState(50)
  const [chip, setChip] = useState(50)
  const [putting, setPutting] = useState(50)

  const holes = new Array(9)
  let holeID = null
  let appState = appContext.value.state


  useEffect(() => {
    holeID = appState.hole_id
    console.log('appstate in score', appState)

    let newArr = [appState.user_name];
    if (appState["user_2_name"]) {
      newArr.push(appState["user_2_name"])
    }
    if (appState.user_3_name) {
      newArr.push(appState.user_3_name)
    }
    if (appState.user_4_name) {
      newArr.push(appState.user_4_name)
    }

    setPlayerArray(newArr)
  }, [appContext.value.state])

  const players = playerArray.map((player, index) => {
    if (index !== 0) {
      return (
        <Text key={`${index}player`}>
          {player}
        </Text>
      )
    }
  })


  const handleScoreSubmit = async () => {

    await postScore(holeID, holeNum, appState.round_id, score, putts, penalty, teeShot, approach, chip, putting)
    
    if (appState["user_2_name"]) {
      await postScore(holeID, holeNum, appState.user_2_rd_id, p2score)
    }
    if (appState.user_3_name) {
      await postScore(holeID, holeNum, appState.user_3_rd_id, p3score)
    }
    if (appState.user_4_name) {
      await postScore(holeID, holeNum, appState.user_4_rd_id, p4score)

    }

    setHole(holeNum + 1)
    console.log('entered scores')
  }

  const pickWidth = 50

  console.log(playerArray)
  // console.log(players)

  return (
    <>
      <View style={styles.pickerContainer}>
        <View style={[styles.pickerHeader]}>
          <Text>
            {playerArray[0]}
          </Text>
          <Text>
            Putts
        </Text>
          <Text>
            Penalty
        </Text>
          {players}
        </View>
        <View style={styles.pickerRow}>

          <Picker
            style={[{ height: 200, width: pickWidth }]}
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
            style={{ height: 200, width: pickWidth }}
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
          <Picker
            style={{ height: 200, width: pickWidth }}
            onValueChange={(itemValue, itemIndex) => {
              setPenalty(itemValue)
            }
            }
            selectedValue={penalty}
          >
            <Picker.Item label="0" value={0} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5+" value={5} />
          </Picker>

          {appState.user_2_name &&
            <Picker
              style={[{ height: 200, width: pickWidth }]}
              onValueChange={(itemValue, itemIndex) => {
                setP2Score(itemValue)
              }
              }
              selectedValue={p2score}
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
          }

          {appState.user_3_name &&
            <Picker
              style={[{ height: 200, width: pickWidth }]}
              onValueChange={(itemValue, itemIndex) => {
                setP3Score(itemValue)
              }
              }
              selectedValue={p3score}
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
          }
          {appState.user_4_name &&
            <Picker
              style={[{ height: 200, width: pickWidth }]}
              onValueChange={(itemValue, itemIndex) => {
                setP4Score(itemValue)
              }
              }
              selectedValue={p4score}
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
          }
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
            onSlidingStart={(val) => setTeeShot(val)}
          />
        </View>
        <View style={[styles.pickerHeader]}>
          <Text>
            Left
        </Text>
          <Text>
            Fairway
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
            onSlidingStart={(val) => setApproach(val)}
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
            onSlidingStart={(val) => setChip(val)}
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
            onSlidingStart={(val) => setPutting(val)}
          />
        </View>
        <View style={styles.pickerHeader}>
          <TouchableHighlight onPress={(event) => handleScoreSubmit()}>
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