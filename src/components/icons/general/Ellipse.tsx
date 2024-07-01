import * as React from "react";
import { SVGProps } from "react";

const Ellipse = ({ width = 5, height = 5, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6" fill="none" {...props}>
    <circle opacity="0.6" cx="2.5" cy="3" r="2.5" fill="#F9F9F9" />
  </svg>
);

export default Ellipse;
