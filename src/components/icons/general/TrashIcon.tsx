import * as React from "react";
const TrashIcon = ({ height = 24, width = 24, color = "#F9F9F9" }: { height?: number; width?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} clipPath="url(#a)">
      <path d="M20.25 5.25H3.75M9.75 9.75v6M14.25 9.75v6M18.75 5.25V19.5a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V5.25M15.75 5.25v-1.5a1.5 1.5 0 0 0-1.5-1.5h-4.5a1.5 1.5 0 0 0-1.5 1.5v1.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={color} d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default TrashIcon;
