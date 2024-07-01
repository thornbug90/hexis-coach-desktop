import * as React from "react";
import type { SVGProps } from "react";

interface IProps {
  width?: number;
  height?: number;
  color?: string;
  opacity1?: string;
  opacity2?: string;
  opacity3?: string;
  props?: SVGProps<SVGSVGElement>;
}

const BarChartIcon = ({
  width = 14,
  height = 12,
  color = "#359CEF",
  opacity1 = "1",
  opacity2 = "1",
  opacity3 = "0.3",
  ...props
}: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 12" fill="none" {...props}>
    <rect opacity={opacity1} x="0.285645" y="6.54883" width="3.08599" height="4.90196" fill={color} />
    <rect opacity={opacity2} x="5.4292" y="3.54883" width="3.08599" height="7.84314" fill={color} />
    <rect opacity={opacity3} x="10.5723" y="0.548828" width="3.08599" height="10.7843" fill={color} />
  </svg>
);
export default BarChartIcon;
