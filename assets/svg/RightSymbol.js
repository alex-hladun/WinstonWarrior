import Svg, { Path, Polyline } from 'react-native-svg';
import React, { useState, useRef } from 'react';


export default function RightSymbol(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <Polyline points="7 7 12 12 7 17" />
  <Polyline points="13 7 18 12 13 17" />
</Svg>)
}

