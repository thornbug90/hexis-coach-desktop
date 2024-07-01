import * as React from "react";
import type { SVGProps } from "react";
const SvgClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19.2858 11.168C19.2858 15.8435 15.3328 19.668 10.4134 19.668C5.49403 19.668 1.54102 15.8435 1.54102 11.168C1.54102 6.49246 5.49403 2.66797 10.4134 2.66797C15.3328 2.66797 19.2858 6.49246 19.2858 11.168Z"
      stroke="white"
      strokeMiterlimit={10}
    />
    <path d="M10.4141 11.168L14.5796 7.16797" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.29004 1.16797H13.5383" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default SvgClockIcon;