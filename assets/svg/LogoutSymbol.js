import Svg, { Path, Line } from "react-native-svg";
import React, { useState, useRef } from "react";
import { Theme } from "../styles/Theme";

export default function GolfFlag({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      class="icon icon-tabler icon-tabler-logout"
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
      <Path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <Path d="M7 12h14l-3 -3m0 6l3 -3" />
    </Svg>
  );
}
