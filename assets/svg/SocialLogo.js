import Svg, { Path, Polyline } from "react-native-svg";
import React, { useState, useRef } from "react";
import { Theme } from "../styles/Theme";

export default function SocialLogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-share"
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
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="6" r="3" />
      <Circle cx="18" cy="18" r="3" />
      <Line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
      <Line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
    </Svg>
  );
}
