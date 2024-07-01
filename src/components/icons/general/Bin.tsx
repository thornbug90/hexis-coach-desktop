import * as React from "react";

interface IProps {
  fillOpacity?: string;
  className?: string;
}

const SvgBin = ({ fillOpacity, className = "" }: IProps) => (
  <svg width="15.81px" height="16.68px" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M15.1478 3.66142H12.5134V1.99296C12.5134 1.25676 11.9227 0.658203 11.1962 0.658203H4.61019C3.88368 0.658203 3.293 1.25676 3.293 1.99296V3.66142H0.658599C0.294312 3.66142 0 3.95965 0 4.3288V4.99618C0 5.08794 0.0740924 5.16302 0.16465 5.16302H1.40776L1.91611 16.0705C1.94904 16.7817 2.52943 17.3427 3.23125 17.3427H12.5751C13.279 17.3427 13.8573 16.7838 13.8903 16.0705L14.3986 5.16302H15.6417C15.7323 5.16302 15.8064 5.08794 15.8064 4.99618V4.3288C15.8064 3.95965 15.5121 3.66142 15.1478 3.66142ZM11.0315 3.66142H4.77484V2.15981H11.0315V3.66142Z"
      fill="white"
      fillOpacity={fillOpacity || "0.6"}
    />
  </svg>
);

export default SvgBin;
