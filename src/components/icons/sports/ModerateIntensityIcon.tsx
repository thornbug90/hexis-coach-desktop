import * as React from "react";
import type { SVGProps } from "react";
const SvgModerateIntensityIcon = ({ width = 14, height = 11, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect y={6} width={3.08599} height={4.90196} fill={props.color} />
    <rect x={5.14355} y={3} width={3.08599} height={7.84314} fill={props.color} />
    <rect opacity={0.3} x={10.2866} width={3.08599} height={10.7843} fill={props.color} />
  </svg>
);
export default SvgModerateIntensityIcon;
