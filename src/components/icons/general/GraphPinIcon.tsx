import * as React from "react";
import type { SVGProps } from "react";
const GraphPinIcon = ({ width = 32, height = 32, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.9399 29.9999C23.705 29.9999 29.9999 23.705 29.9999 15.9399C29.9999 8.17476 23.705 1.87988 15.9399 1.87988C8.17476 1.87988 1.87988 8.17476 1.87988 15.9399C1.87988 23.705 8.17476 29.9999 15.9399 29.9999Z"
      stroke={color}
      strokeWidth={3.21724}
      strokeMiterlimit={10}
    />
  </svg>
);
export default GraphPinIcon;
