import * as React from "react";
import type { SVGProps } from "react";

interface IProps {
  props?: SVGProps<SVGSVGElement>;
  strokeWidth?: number;
  color?: string;
  width?: number;
  height?: number;
}

const SvgPlusIcon = ({ props, strokeWidth = 3, color = "#F9F9F9", width = 26, height = 26 }: IProps) => (
  <svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2 13H24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M13 24L13 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
export default SvgPlusIcon;
