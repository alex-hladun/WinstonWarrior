import Svg, { Path, Line, Circle } from "react-native-svg";
import React, { useState, useRef } from "react";
import { Theme } from "../styles/Theme";

export default function FollowLogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Svg"
      class="icon icon-tabler icon-tabler-user-check"
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
      <Circle cx="9" cy="7" r="4" />
      <Path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <Path d="M16 11l2 2l4 -4" />
    </Svg>
  );
}
