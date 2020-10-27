import Svg, { Path, Polyline, Circle } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'


export default function LocationSymbol(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Circle cx="12" cy="11" r="3" />
  <Path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
</Svg>)
}

