import * as React from "react";
import { SVGProps } from "react";
const AddClientsIcon = ({ width = 16, height = 14, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.72168 3.58708C1.72168 4.26844 1.92372 4.93449 2.30227 5.50102C2.68081 6.06754 3.21884 6.5091 3.84833 6.76984C4.47782 7.03058 5.17049 7.09881 5.83876 6.96588C6.50702 6.83296 7.12086 6.50485 7.60265 6.02306C8.08444 5.54127 8.41255 4.92743 8.54547 4.25917C8.6784 3.5909 8.61017 2.89823 8.34943 2.26874C8.08869 1.63925 7.64713 1.10122 7.08061 0.722676C6.51408 0.344135 5.84803 0.14209 5.16667 0.14209C4.253 0.14209 3.37676 0.505043 2.73069 1.1511C2.08463 1.79717 1.72168 2.67341 1.72168 3.58708Z"
      fill={color}
    />
    <rect y={8.75391} width={10.335} height={5.16749} rx={2.58375} fill={color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7806 3.58691H12.0581V5.30957L10.3359 5.30957L10.3359 7.03207H12.0581V8.7544H13.7806V7.03207H15.5034V5.30957L13.7806 5.30957V3.58691Z"
      fill={color}
    />
  </svg>
);
export default AddClientsIcon;
