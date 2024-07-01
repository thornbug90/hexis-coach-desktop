import * as React from "react";
import type { SVGProps } from "react";
const SvgSoftballIcon = ({ width = 30, height = 48, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 30 48" fill="none" {...props}>
    <path
      d="M5.28383 36.2814C6.61795 39.2282 7.71698 42.2798 8.57026 45.4069C8.79298 46.2194 9.01687 47.0725 9.68087 47.6297C9.89844 47.8137 10.1603 47.9349 10.4393 47.9808C11.4617 48.1405 11.9548 47.2736 11.9622 46.4734C11.9362 45.9325 11.8174 45.4003 11.6112 44.9013C10.621 42.0546 9.62073 39.2115 8.61039 36.3722L14.3389 31.2994C14.4341 31.2106 14.556 31.1573 14.6848 31.1482C14.8136 31.1392 14.9416 31.1748 15.0479 31.2495C15.1162 31.2906 15.1731 31.3487 15.2133 31.4185C15.2534 31.4882 15.2756 31.5672 15.2776 31.6481C15.2797 31.7289 15.2615 31.809 15.2249 31.8808C15.1883 31.9525 15.1343 32.0136 15.0682 32.0582C14.7901 32.3286 14.2486 32.764 14.167 33.1472C14.0722 33.5938 14.4265 33.997 14.7519 34.3109C19.1818 38.5873 23.6502 42.8217 28.1569 47.0141C28.3513 47.203 28.6032 47.3185 28.8707 47.3415C29.1382 47.3646 29.4053 47.2937 29.6281 47.1408C30.4055 46.5662 29.8135 45.4931 29.2224 44.8349C26.4633 41.7714 23.5764 38.7824 21.3985 35.2644C19.2207 31.7463 17.783 27.5798 18.2731 23.4492C18.5186 21.379 19.2377 19.3822 19.4024 17.3031C19.498 16.0965 19.2993 14.6864 18.2917 14.0481C17.8455 13.8035 17.3532 13.6594 16.8478 13.6256C15.6651 13.4734 14.4729 13.411 13.2811 13.4391C12.6217 13.4543 11.8737 13.5456 11.4858 14.0906C9.7324 13.425 8.11846 12.4264 6.72937 11.1476L5.32183 12.8109L8.86952 15.9651C9.22759 16.2837 9.62379 16.703 9.45903 17.1905C9.40965 17.3208 9.32818 17.4357 9.22254 17.5245C9.11689 17.6133 8.99062 17.6729 8.85587 17.6974C8.38282 17.7509 7.90767 17.6173 7.52828 17.324C6.20584 16.4757 5.08472 15.3378 4.246 13.993C3.83617 13.9757 3.54223 14.4633 3.4495 14.871C3.38433 15.2866 3.43242 15.7125 3.58857 16.1021C4.15818 17.8542 5.32729 19.482 6.99598 20.1956C8.66466 20.9091 10.8392 20.4913 11.8654 18.9704C12.1941 18.4837 12.6863 16.9572 13.5759 18.0916C13.7415 18.3028 13.3689 18.5563 13.2828 18.6645C11.9437 20.3967 12.5165 22.6392 12.228 24.687C11.9242 26.8391 10.6715 28.7234 9.30299 30.3905C8.60794 31.2355 7.87483 32.0493 7.18103 32.8963C6.51651 33.7483 5.89647 34.6355 5.32355 35.5542"
      fill={props.color}
    />
    <path
      d="M2.14349 15.3233L1.66131 15.8945C1.43611 16.1615 1.2419 16.5228 0.874717 16.5963C0.553483 16.6605 0.00248377 16.4494 0 16.0548C0 15.762 0.274463 15.5736 0.461159 15.3945C0.723392 15.1551 0.957034 14.8849 1.15709 14.5895C1.34586 14.2917 1.18478 14.1607 0.995187 13.9135C0.962684 13.8765 0.937423 13.8335 0.920702 13.7868C0.909147 13.7201 0.91528 13.6513 0.938489 13.5878C1.07788 12.9038 1.40392 12.2741 1.879 11.7712C1.92246 11.7236 1.97096 11.681 2.02352 11.6443C2.3845 11.4119 3.13087 11.6503 3.05843 10.9448C3.01864 10.7999 2.99446 10.6511 2.98637 10.5008C3.01209 10.3795 3.06776 10.2667 3.14817 10.1736C3.32903 9.90114 3.54529 9.65501 3.79105 9.44191C3.95654 9.31337 4.14912 9.2259 4.35347 9.18652C4.55783 9.14714 4.76833 9.15688 4.96835 9.21499C5.14573 9.27682 5.32788 9.32361 5.51279 9.35486L9.53528 4.82345C10.86 3.32996 12.2458 1.8707 13.5093 0.325667C13.7016 0.124217 13.9634 0.00744888 14.2389 0.000344585C14.5144 -0.00675971 14.7817 0.0962226 14.9838 0.287503C15.2756 0.535358 15.5113 0.844809 15.6747 1.19457C15.7729 1.39306 15.8039 1.61924 15.7625 1.83758C15.6524 2.31161 15.1784 2.47948 14.8704 2.79086L12.5845 5.10215C10.884 6.82124 9.10019 8.45839 7.48325 10.2594C7.12187 10.6621 6.90364 11.1889 6.47271 11.5269L5.26276 12.927L4.25928 14.0412L3.68392 16.381L2.14349 15.3233Z"
      fill={props.color}
    />
    <path
      d="M13.8934 7.5492L14.7272 11.0174C14.805 11.376 14.9936 11.6997 15.2653 11.9405C15.7207 12.3233 16.525 12.5621 17.747 11.4454C17.8457 11.3535 17.9337 11.2505 18.0095 11.1383L19.6512 8.73311C19.9577 8.30136 20.1247 7.78277 20.1289 7.24967C20.1182 6.38061 19.6413 5.22845 17.4734 4.58458C17.3093 4.54034 17.139 4.5262 16.9701 4.5425C16.3798 4.49896 15.79 4.6339 15.2746 4.93074C14.7592 5.22758 14.341 5.673 14.0723 6.21119C13.8483 6.61782 13.7843 7.09621 13.8934 7.5492Z"
      fill={props.color}
    />
  </svg>
);
export default SvgSoftballIcon;
