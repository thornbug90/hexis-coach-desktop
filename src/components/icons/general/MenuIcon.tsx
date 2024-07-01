import * as React from "react";
import { SVGProps } from "react";
const MenuIcon = ({ width = 24, height = 24, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    stroke={color}
    transform="rotate(90)"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill={color}>
      <path d="M7 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </g>
  </svg>
);
export default MenuIcon;
