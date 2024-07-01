import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeftIcon = ({ width = 15, height = 15, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 11.8379L3.48837 11.8379" stroke={color} strokeOpacity={1} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M9.76758 18.1172L3.48851 11.8381L9.76758 5.55905"
      stroke={color}
      strokeOpacity={1}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgArrowLeftIcon;
