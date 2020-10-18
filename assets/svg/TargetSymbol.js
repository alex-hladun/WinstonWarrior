import Svg, { Path, Line, Circle } from 'react-native-svg';
import React, { useState, useRef } from 'react';


export default function TargetSymbol(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-viewfinder" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Circle cx="12" cy="12" r="9" />
      <Line x1="12" y1="3" x2="12" y2="7" />
      <Line x1="12" y1="21" x2="12" y2="18" />
      <Line x1="3" y1="12" x2="7" y2="12" />
      <Line x1="21" y1="12" x2="18" y2="12" />
      <Line x1="12" y1="12" x2="12" y2="12.01" />
    </Svg>)
}

