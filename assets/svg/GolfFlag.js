



import Svg, { Path, Line } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'

export default function GolfFlag({color}) {
  return (<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-golf" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Path d="M12 18v-15l7 4l-7 4" />
  <Path d="M9 17.67c-.62 .36 -1 .82 -1 1.33c0 1.1 1.8 2 4 2s4 -.9 4 -2c0 -.5 -.38 -.97 -1 -1.33" />
</Svg>)
}
