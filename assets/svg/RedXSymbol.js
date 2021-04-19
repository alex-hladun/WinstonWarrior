import Svg, { Path, Line } from "react-native-svg";
import React from "react";

export default function RedXSymbol({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-x"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={color}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}
