import Svg, { Path, Line, Rect } from "react-native-svg";
import React, { useState, useRef } from "react";
import { Theme } from "../styles/Theme";

export default function PenLogo({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      class="icon icon-tabler icon-tabler-pencil"
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
      <Path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <Line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
    </Svg>
  );
}
