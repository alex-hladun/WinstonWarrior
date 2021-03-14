import Svg, { Path, Line } from "react-native-svg";
import React, { useState, useRef } from "react";
import { Theme } from "../styles/Theme";

export default function HeartSymbol({ fill = false }) {
  let fillColor = "none";
  if (fill) {
    fillColor = "red";
  }
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      class="icon icon-tabler icon-tabler-heart"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      fill={fillColor}
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </Svg>
  );
}
