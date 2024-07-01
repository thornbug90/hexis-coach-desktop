import * as React from "react";
import type { SVGProps } from "react";
const SvgOtherIcon = ({ width = 44, height = 40, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M41.4205 20.0758H32.8826L26.4792 37.1516L17.9413 3L11.5379 20.0758H3"
      stroke={props.color}
      stroke-width="4.26895"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default SvgOtherIcon;
