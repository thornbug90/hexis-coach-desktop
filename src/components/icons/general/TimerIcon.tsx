import * as React from "react";
const TimerIcon = ({ height = 19, width = 16, color = "#359CEF" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={19} viewBox={`0 0 ${width} ${height}`} fill="none">
    <path
      fill={color}
      d="M8 3.125a7.5 7.5 0 1 0 7.5 7.5 7.509 7.509 0 0 0-7.5-7.5Zm0 13.75a6.25 6.25 0 1 1 6.25-6.25A6.257 6.257 0 0 1 8 16.875Zm3.567-9.817a.626.626 0 0 1 0 .884l-3.125 3.125a.624.624 0 1 1-.884-.884l3.125-3.125a.625.625 0 0 1 .884 0ZM5.5 1.25a.625.625 0 0 1 .625-.625h3.75a.625.625 0 1 1 0 1.25h-3.75A.625.625 0 0 1 5.5 1.25Z"
    />
  </svg>
);
export default TimerIcon;
