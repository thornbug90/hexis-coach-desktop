import * as React from "react";
import type { SVGProps } from "react";
const SvgKeyPerformanceIcon = ({ width = 20, height = 22, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line x1={0.833333} y1={8.10677} x2={0.833333} y2={13.7128} stroke={props.color} strokeWidth={1.66667} strokeLinecap="round" />
    <line x1={17.8997} y1={8.10677} x2={17.8997} y2={13.7128} stroke={props.color} strokeWidth={1.66667} strokeLinecap="round" />
    <line x1={5.56657} y1={16.1344} x2={5.56657} y2={5.67989} stroke={props.color} strokeWidth={1.66667} strokeLinecap="round" />
    <line x1={14.1} y1={16.1344} x2={14.1} y2={5.67989} stroke={props.color} strokeWidth={1.66667} strokeLinecap="round" />
    <line x1={9.83317} y1={20.985} x2={9.83317} y2={0.833511} stroke={props.color} strokeWidth={1.66667} strokeLinecap="round" />
  </svg>
);
export default SvgKeyPerformanceIcon;
