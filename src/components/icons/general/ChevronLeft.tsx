import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronLeft = ({ width = 10, height = 17, color = "#fff", strokeWidth = 2.24286, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.06427 15.4286L1.33569 8.70001L8.06427 1.97144"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgChevronLeft;
