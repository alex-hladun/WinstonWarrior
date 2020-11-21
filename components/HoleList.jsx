import React, { useState, useRef, useCallback, useContext } from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Easing, TouchableOpacity, Dimensions, Image, TouchableHighlight, Animated, Alert, Modal } from 'react-native';
import holeListStyles from '../assets/styles/HoleSummaryStyles'
import { AppContext } from '../context/AppContext'

export default function HoleList({ setHole, handleRoundSummary, currentHole }) {
  const handleSave = () => {
    console.log('save game')
    handleRoundSummary()
  }


  let holeList;
  for (let i = 1; i <= 18; i++) {

  }

  return (
    <>
      <View style={holeListStyles.holeRow}>
        <View style={currentHole === 1 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
          <Text style={holeListStyles.hole} onPress={() => setHole(1)}>
            1
  </Text>
        </View>
        <View style={currentHole === 2 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(2)}>
          2
  </Text>
        </View>
        <View style={currentHole === 3 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(3)}>
          3
  </Text>
      </View>
      </View>
      <View style={holeListStyles.holeRow}>
      <View style={currentHole === 4 ? holeListStyles.holebgSelected : holeListStyles.holebg}>

        <Text style={holeListStyles.hole} onPress={() => setHole(4)}>
          4
  </Text>
  </View>
  <View style={currentHole === 5 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(5)}>
          5
  </Text>
  </View>
  <View style={currentHole === 6 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(6)}>
          6
  </Text>
  </View>
      </View>
      <View style={holeListStyles.holeRow}>
      <View style={currentHole === 7 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(7)}>
          7
  </Text>
  </View>
  <View style={currentHole === 8 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(8)}>
          8
  </Text>
  </View>
  <View style={currentHole === 9 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(9)}>
          9
  </Text>
  </View>
      </View>
      <View style={holeListStyles.holeRow}>
      <View style={currentHole === 10 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(10)}>
          10
  </Text>
  </View>
  <View style={currentHole === 11 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(11)}>
          11
  </Text>
  </View>
  <View style={currentHole === 12 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(12)}>
          12
  </Text>
  </View>
      </View>
      <View style={holeListStyles.holeRow}>
      <View style={currentHole === 13 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(13)}>
          13
  </Text>
  </View>
  <View style={currentHole === 14 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(14)}>
          14
  </Text>
  </View>
  <View style={currentHole === 15 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(15)}>
          15
  </Text>
  </View>
      </View>
      <View style={holeListStyles.holeRow}>
      <View style={currentHole === 16 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(16)}>
          16
  </Text>
  </View>
  <View style={currentHole === 17 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(17)}>
          17
  </Text>
  </View>
  <View style={currentHole === 18 ? holeListStyles.holebgSelected : holeListStyles.holebg}>
        <Text style={holeListStyles.hole} onPress={() => setHole(18)}>
          18
  </Text>
  </View>
      </View>
      <TouchableOpacity onPress={() => handleSave()}>
        <View style={holeListStyles.holeRow} >
          <View style={[holeListStyles.styledButton, holeListStyles.playButton]}>
            <Text style={holeListStyles.buttonText}>Finish Round</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )

}