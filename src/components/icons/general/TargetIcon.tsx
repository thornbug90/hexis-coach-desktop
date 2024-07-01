import * as React from "react";
import type { SVGProps } from "react";
const SvgTargetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={33} height={33} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_52_2176)">
      <circle cx={16.5} cy={16.5} r={8.13125} stroke="#F9F9F9" strokeWidth={0.7375} />
      <path
        d="M21.7986 16.4997C21.7986 19.4256 19.4266 21.7976 16.5007 21.7976C13.5747 21.7976 11.2027 19.4256 11.2027 16.4997C11.2027 13.5737 13.5747 11.2018 16.5007 11.2018C19.4266 11.2018 21.7986 13.5737 21.7986 16.4997Z"
        stroke="#F9F9F9"
        strokeWidth={0.7375}
      />
      <circle cx={16.5008} cy={16.4999} r={2.05982} fill="#F9F9F9" stroke="#F9F9F9" strokeWidth={0.7375} />
    </g>
    <defs>
      <filter id="filter0_d_52_2176" x={0} y={0} width={33} height={33} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_52_2176" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_52_2176" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default SvgTargetIcon;
