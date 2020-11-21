




import Svg, { Path, Line, Rect } from 'react-native-svg';
import React, { useState, useRef } from 'react';
import { Theme } from '../styles/Theme'

export default function ChartLogo({color}) {
  return (<Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-bar" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Rect x="3" y="12" width="6" height="8" rx="1" />
  <Rect x="9" y="8" width="6" height="12" rx="1" />
  <Rect x="15" y="4" width="6" height="16" rx="1" />
  <Line x1="4" y1="20" x2="18" y2="20" />
</Svg>)
}

