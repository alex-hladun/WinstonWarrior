import Svg, { Path, Line } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'

export default function CheckSymbol(props) {
  return (<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke={Theme.iconStroke} fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Path d="M5 12l5 5l10 -10" />
</Svg>)
}
