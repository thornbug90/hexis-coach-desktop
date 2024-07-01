import * as React from "react";
import { SVGProps } from "react";
const ResourcesIcon = ({ width = 15, height = 16, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.7557 9.2024V14.0338C12.7557 14.1137 12.7397 14.1927 12.7086 14.2665C12.6775 14.3403 12.6319 14.4075 12.5745 14.464C12.517 14.5205 12.4488 14.5654 12.3738 14.596C12.2987 14.6265 12.2182 14.6421 12.137 14.6421H1.61866C1.53742 14.6421 1.45698 14.6265 1.38192 14.596C1.30687 14.5654 1.23867 14.5205 1.18122 14.464C1.12377 14.4075 1.07819 14.3403 1.04709 14.2665C1.016 14.1927 1 14.1137 1 14.0338V5.55033M5.94974 0.64209H12.137C12.3011 0.64209 12.4585 0.706216 12.5745 0.82036C12.6905 0.934503 12.7557 1.08938 12.7557 1.2508V4.29416M12.9725 7.5935L11.6545 6.30305M8.74651 11.7512L7.43484 10.4545M4.09353 4.29438H1L4.71241 0.64209V3.68567C4.71241 3.84715 4.64722 4.00192 4.53115 4.11611C4.41509 4.2303 4.25767 4.29438 4.09353 4.29438ZM8.75025 11.7477L6.34391 12.8238L7.43764 10.4566L12.6876 5.29166L14 6.583L8.75025 11.7477Z"
      stroke={color}
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ResourcesIcon;
