import * as React from "react";
import type { SVGProps } from "react";
const SvgIntensityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={13} height={11} viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect y={6} width={3} height={5} fill="#359CEF" />
    <rect opacity={0.3} x={5} y={3} width={3} height={8} fill="#359CEF" />
    <rect opacity={0.5} x={10} width={3} height={11} fill="#359CEF" />
  </svg>
);
export default SvgIntensityIcon;
