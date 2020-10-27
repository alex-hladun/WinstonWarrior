import Svg, { Path, Polyline } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'


export default function LeftSymbol(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke={Theme.iconStroke} fill="none" stroke-linecap="round" stroke-linejoin="round">
    <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <Polyline points="11 7 6 12 11 17" />
    <Polyline points="17 7 12 12 17 17" />
  </Svg>)
}

