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
import { PlayContext } from '../context/PlayContext'

export default function Score({ holeNum, setHole }) {
  const appContext = React.useContext(AppContext)
  const playContext = React.useContext(PlayContext)
  let playState = playContext.value.state
  const [playerArray, setPlayerArray] = useState([])

  const p1ps = playState.p1score[holeNum]
  const p2ps = playState.p2score[holeNum]
  const p3ps = playState.p3score[holeNum]
  const p4ps = playState.p4score[holeNum]
  // console.log('prev score', p1ps)
  // console.log('playstate in score', playState)
  const [score, setScore] = useState(p1ps ? p1ps : holeInfo[holeNum].par)
  const [p2score, setP2Score] = useState(p2ps ? p2ps : holeInfo[holeNum].par)
  const [p3score, setP3Score] = useState(p3ps ? p3ps : holeInfo[holeNum].par)
  const [p4score, setP4Score] = useState(p4ps ? p4ps : holeInfo[holeNum].par)
  const [putts, setPutts] = useState(2)
  const [penalty, setPenalty] = useState(0)
  const [teeShot, setTeeShot] = useState(50)
  const [approach, setApproach] = useState(50)
  const [chip, setChip] = useState(50)
  const [putting, setPutting] = useState(50)

  let holeID = null
  let appState = appContext.value.state

  useEffect(() => {
    holeID = appState.hole_id
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
        <Text style={styles.header} key={`${index}player`}>
          {player}
        </Text>
      )
    }
  })


  const handleScoreSubmit = async () => {

    await postScore(holeID, holeNum, appState.round_id, score, putts, penalty, teeShot, approach, chip, putting)
    console.log(playContext.value.state.p1score)
    playContext.dispatch({
      type: 'set_p1_score',
      hole: holeNum,
      score: score
    })

    if (appState["user_2_name"]) {
      await postScore(holeID, holeNum, appState.user_2_rd_id, p2score)
      playContext.dispatch({
        type: 'set_p2_score',
        hole: holeNum,
        score: p2score
      })
    }
    if (appState.user_3_name) {
      await postScore(holeID, holeNum, appState.user_3_rd_id, p3score)
      playContext.dispatch({
        type: 'set_p3_score',
        hole: holeNum,
        score: p3score
      })
    }
    if (appState.user_4_name) {
      await postScore(holeID, holeNum, appState.user_4_rd_id, p4score)
      playContext.dispatch({
        type: 'set_p4_score',
        hole: holeNum,
        score: p4score
      })
    }

    setHole(holeNum + 1)
    console.log('entered scores')
  }

  const pickWidth = 50

  // console.log(playerArray)
  // console.log(players)

  return (
    <>
      <View style={styles.pickerContainer}>
        <View style={[styles.holeHeader]}>
          <Text style={styles.holeNumber}>
          Hole {holeNum}
            </Text>
          </View>
        <View style={[styles.scoreHeader]}>
          <Text style={styles.header}>
            {playerArray[0]}
          </Text>
          <Text style={styles.header}>
            Putts
        </Text>
          <Text style={styles.header}>
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
            <Picker.Item color={p1ps === 1 ? 'blue' : ''} style={[styles.pickerStyle, styles.prevScore]} label="1" value={1} />
            <Picker.Item color={p1ps === 2 ? 'blue' : ''} style={styles.pickerStyle} label="2" value={2} />
            <Picker.Item color={p1ps === 3 ? 'blue' : ''} label='3' value={3} />
            <Picker.Item color={p1ps === 4 ? 'blue' : ''} label="4" value={4} />
            <Picker.Item color={p1ps === 5 ? 'blue' : ''} label="5" value={5} />
            <Picker.Item color={p1ps === 6 ? 'blue' : ''} label="6" value={6} />
            <Picker.Item color={p1ps === 7 ? 'blue' : ''} label="7" value={7} />
            <Picker.Item color={p1ps === 8 ? 'blue' : ''} label="8" value={8} />
            <Picker.Item color={p1ps === 9 ? 'blue' : ''} label="9" value={9} />
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
            <Picker.Item color={'red'} label="1" value={1} />
            <Picker.Item color={'red'} label="2" value={2} />
            <Picker.Item color={'red'} label="3" value={3} />
            <Picker.Item color={'red'} label="4" value={4} />
            <Picker.Item color={'red'} label="5+" value={5} />
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
              <Picker.Item color={p2ps === 1 ? 'blue' : ''} style={styles.pickerStyle} label="1" value={1} />
              <Picker.Item color={p2ps === 2 ? 'blue' : ''} label="2" value={2} />
              <Picker.Item color={p2ps === 3 ? 'blue' : ''} label="3" value={3} />
              <Picker.Item color={p2ps === 4 ? 'blue' : ''} label="4" value={4} />
              <Picker.Item color={p2ps === 5 ? 'blue' : ''} label="5" value={5} />
              <Picker.Item color={p2ps === 6 ? 'blue' : ''} label="6" value={6} />
              <Picker.Item color={p2ps === 7 ? 'blue' : ''} label="7" value={7} />
              <Picker.Item color={p2ps === 8 ? 'blue' : ''} label="8" value={8} />
              <Picker.Item color={p2ps === 9 ? 'blue' : ''} label="9" value={9} />
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
              <Picker.Item color={p3ps === 1 ? 'blue' : ''} style={styles.pickerStyle} label="1" value={1} />
              <Picker.Item color={p3ps === 2 ? 'blue' : ''} label="2" value={2} />
              <Picker.Item color={p3ps === 3 ? 'blue' : ''} label="3" value={3} />
              <Picker.Item color={p3ps === 4 ? 'blue' : ''} label="4" value={4} />
              <Picker.Item color={p3ps === 5 ? 'blue' : ''} label="5" value={5} />
              <Picker.Item color={p3ps === 6 ? 'blue' : ''} label="6" value={6} />
              <Picker.Item color={p3ps === 7 ? 'blue' : ''} label="7" value={7} />
              <Picker.Item color={p3ps === 8 ? 'blue' : ''} label="8" value={8} />
              <Picker.Item color={p3ps === 9 ? 'blue' : ''} label="9" value={9} />
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
              <Picker.Item color={p4ps === 1 ? 'blue' : ''} style={styles.pickerStyle} label="1" value={1} />
              <Picker.Item color={p4ps === 2 ? 'blue' : ''} label="2" value={2} />
              <Picker.Item color={p4ps === 3 ? 'blue' : ''} label="3" value={3} />
              <Picker.Item color={p4ps === 4 ? 'blue' : ''} label="4" value={4} />
              <Picker.Item color={p4ps === 5 ? 'blue' : ''} label="5" value={5} />
              <Picker.Item color={p4ps === 6 ? 'blue' : ''} label="6" value={6} />
              <Picker.Item color={p4ps === 7 ? 'blue' : ''} label="7" value={7} />
              <Picker.Item color={p4ps === 8 ? 'blue' : ''} label="8" value={8} />
              <Picker.Item color={p4ps === 9 ? 'blue' : ''} label="9" value={9} />
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