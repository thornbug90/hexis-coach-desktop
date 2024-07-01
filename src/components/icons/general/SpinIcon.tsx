import React from "react";
import type { SVGProps } from "react";
const SpinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    role="status"
    className="inline w-5 h-5 text-white animate-spin"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="10" strokeDasharray="283" strokeDashoffset="0"></circle>
  </svg>
);

export default SpinIcon;
