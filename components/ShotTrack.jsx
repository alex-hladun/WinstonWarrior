import React, { useState, useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import styles from '../assets/styles/ScoreStyles'
import Slider from '@react-native-community/slider';
import CheckSymbol from '../assets/svg/CheckSymbol'
import { AppContext } from '../context/AppContext'
import { postShot } from '../db/dbSetup'


export default function ShotTrack({ distance, handleTrackViewClose }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext
  const [club, setClub] = useState(null)
  const [effort, setEffort] = useState(100)

  let clubArray
  let clubList;
  clubArray = appState.value.state.clubList
  if (clubArray) {
    clubList = clubArray.map((clb, i) => {
      // console.log('map', clb)
      // console.log('map', i)
      return (
        <View key={`cl${i}`} style={[clb.club_id === club && styles.selected, styles.club]} >
          <Text key={`club${i}`} onPress={() => setClub(clb.club_id)}>
            {clb.name}
          </Text>
        </View>
      )
    })
  }

  useEffect(() => {
    // console.log('appstate in shottrack', appState.value.state)
  }, [])


  const handleSubmit = async () => {
    console.log('handle distance submit')

    await postShot(1, club, effort, distance)

    handleTrackViewClose()
  }
  // const clubArray = ['D', '2W', '3W', '4W', '5W', 'HY', 'DI', '3I', '4I', '5I', '6I', '7I', '8I', '9I', 'PW', 'AW', '52', '54', '56', '58', '60']

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
            onSlidingComplete={(val) => setEffort(val)}
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