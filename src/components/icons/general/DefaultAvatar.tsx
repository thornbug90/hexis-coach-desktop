import * as React from "react";
import type { SVGProps } from "react";
const SvgDefaultAvatar = ({ width = 16, height = 16, color = "#fff", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.875 3.89209C1.875 4.63377 2.09493 5.35879 2.50699 5.97548C2.91904 6.59216 3.50471 7.07281 4.18994 7.35664C4.87516 7.64046 5.62916 7.71473 6.35659 7.57003C7.08402 7.42534 7.7522 7.06819 8.27665 6.54374C8.8011 6.01929 9.15825 5.35111 9.30294 4.62368C9.44764 3.89625 9.37338 3.14225 9.08955 2.45703C8.80572 1.7718 8.32507 1.18613 7.70839 0.774079C7.0917 0.362023 6.36668 0.14209 5.625 0.14209C4.63044 0.14209 3.67661 0.537178 2.97335 1.24044C2.27009 1.9437 1.875 2.89753 1.875 3.89209Z"
      fill={color}
    />
    <rect y="9.51709" width="11.25" height="5.625" rx="2.8125" fill={color} />
  </svg>
);
export default SvgDefaultAvatar;
