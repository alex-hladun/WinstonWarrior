import Svg, { Path, Line } from "react-native-svg";
import React, { useState, useRef } from "react";

export default function MessageSymbol({ fill = false }) {
  let fillColor = "none";
  if (fill) {
    fillColor = "red";
  }
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      class="icon icon-tabler icon-tabler-message-circle"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
      <Line x1="12" y1="12" x2="12" y2="12.01" />
      <Line x1="8" y1="12" x2="8" y2="12.01" />
      <Line x1="16" y1="12" x2="16" y2="12.01" />
    </Svg>
  );
}
