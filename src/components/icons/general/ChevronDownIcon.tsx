import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDownIcon = ({ width = 14, height = 8, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 0.999999L7 7L13 1" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default SvgChevronDownIcon;
