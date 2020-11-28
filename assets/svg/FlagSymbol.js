import Svg, { Path, Line } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'


export default function FlagSymbol(props) {
  return (<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flag" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke={Theme.iconStroke} fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Line x1="5" y1="5" x2="5" y2="21" />
  <Line x1="19" y1="5" x2="19" y2="14" />
  <Path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0" />
  <Path d="M5 14a5 5 0 0 1 7 0a5 5 0 0 0 7 0" />
  </Svg>)
}
