import * as React from "react";
const OutlinedCalendarIcon = ({ height = 17, width = 16, color = "#359CEF" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none">
    <path
      fill={color}
      d="M14.25 1.5h-1.875V.875a.625.625 0 1 0-1.25 0V1.5h-6.25V.875a.625.625 0 0 0-1.25 0V1.5H1.75A1.25 1.25 0 0 0 .5 2.75v12.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25V2.75a1.25 1.25 0 0 0-1.25-1.25ZM3.625 2.75v.625a.625.625 0 0 0 1.25 0V2.75h6.25v.625a.625.625 0 1 0 1.25 0V2.75h1.875v2.5H1.75v-2.5h1.875Zm10.625 12.5H1.75V6.5h12.5v8.75Z"
    />
  </svg>
);
export default OutlinedCalendarIcon;
