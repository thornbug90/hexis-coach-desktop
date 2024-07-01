import * as React from "react";
import type { SVGProps } from "react";
const SvgHurlingIcon = ({ width = 32, height = 54, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 32 54" fill="none" {...props}>
    <path
      d="M5.63681 41.7108C7.05993 44.801 8.23223 48.0014 9.14228 51.2808C9.37983 52.1332 9.6187 53.0273 10.3269 53.6117C10.5589 53.8049 10.8382 53.9321 11.1358 53.9799C12.2265 54.1474 12.7524 53.2382 12.7603 52.3995C12.7326 51.8322 12.6058 51.2742 12.3859 50.7509C11.3297 47.7656 10.2628 44.7841 9.1851 41.8065L15.2953 36.4863C15.3968 36.3931 15.5268 36.3372 15.6641 36.3277C15.8014 36.3182 15.9378 36.3557 16.0512 36.434C16.1241 36.477 16.1849 36.538 16.2278 36.6111C16.2707 36.6843 16.2944 36.7671 16.2965 36.852C16.2987 36.9368 16.2793 37.0208 16.2402 37.0961C16.201 37.1713 16.1434 37.2353 16.0728 37.282C15.7765 37.5656 15.199 38.0228 15.112 38.4242C15.0104 38.8925 15.3889 39.3152 15.7355 39.6448C20.4609 44.1291 25.2271 48.5697 30.0341 52.9666C30.2415 53.1647 30.5101 53.2859 30.7954 53.3101C31.0808 53.3343 31.3658 53.26 31.6034 53.0995C32.4326 52.497 31.8007 51.3716 31.1702 50.6818C28.2277 47.4692 25.1484 44.3346 22.825 40.6453C20.5016 36.9559 18.9685 32.5861 19.4913 28.2543C19.7536 26.0834 20.5205 23.9899 20.6963 21.8096C20.7983 20.5438 20.5863 19.0627 19.5112 18.3955C19.0354 18.1387 18.5101 17.9876 17.971 17.9524C16.7095 17.7928 15.4378 17.7274 14.1666 17.7566C13.4637 17.773 12.6654 17.8682 12.2521 18.4398C10.3817 17.7422 8.66009 16.6949 7.1787 15.3534L5.67743 17.0982L9.46107 20.4056C9.84345 20.7397 10.266 21.1796 10.0903 21.6904C10.0374 21.827 9.95054 21.9476 9.83788 22.0407C9.72522 22.1338 9.59061 22.1963 9.44694 22.2221C8.94217 22.2782 8.43518 22.1379 8.03045 21.83C6.62129 20.9402 5.42668 19.7474 4.53294 18.3379C4.09581 18.3197 3.7823 18.8314 3.6834 19.2585C3.61392 19.6944 3.6651 20.141 3.83133 20.5496C4.43934 22.3874 5.68583 24.094 7.46615 24.8424C9.24647 25.5907 11.5655 25.1525 12.6601 23.5575C13.0102 23.0475 13.5357 21.4463 14.4846 22.6364C14.6612 22.8579 14.2616 23.1237 14.1719 23.2367C12.7435 25.0532 13.3546 27.4054 13.0464 29.5525C12.7228 31.8094 11.3867 33.7859 9.92647 35.5337C9.18555 36.4198 8.40357 37.2727 7.66353 38.161C6.95479 39.0546 6.29346 39.9849 5.6823 40.9483"
      fill={props.color}
    />
    <path
      d="M14.8201 11.5799L15.7094 15.217C15.7924 15.593 15.9937 15.9324 16.2834 16.185C16.7691 16.5864 17.627 16.8368 18.9327 15.6653C19.0379 15.5691 19.1317 15.4611 19.2122 15.3432L20.9638 12.8209C21.2906 12.3681 21.4687 11.8244 21.4734 11.2654C21.4619 10.354 20.9532 9.14622 18.6408 8.47056C18.4658 8.42418 18.2841 8.40918 18.1039 8.42626C17.4743 8.3806 16.8452 8.52227 16.2954 8.83356C15.7457 9.14485 15.2996 9.61193 15.0131 10.1763C14.773 10.6025 14.704 11.1045 14.8201 11.5799Z"
      fill={props.color}
    />
    <path
      d="M17.2928 3.24783C17.1515 4.45604 16.7704 6.08117 15.8419 6.79449C14.5484 7.87643 13.3172 9.03111 12.1541 10.253C10.7411 11.618 9.3105 12.968 7.9832 14.4177C7.59905 14.8386 7.36945 15.3924 6.90582 15.7469L5.61648 17.2134L4.54794 18.383L3.93418 20.8376L2.28722 19.7299L1.77061 20.3281C1.53218 20.6116 1.32464 20.9882 0.93608 21.068C0.591673 21.1344 0.00441548 20.9129 0 20.4964C0 20.1907 0.295835 19.9913 0.494532 19.8053C0.773771 19.5547 1.02274 19.2722 1.23633 18.9634C1.43503 18.6489 1.26723 18.5115 1.06412 18.2501C1.02791 18.2124 1.00074 18.167 0.984644 18.1172C0.970688 18.0475 0.976832 17.9753 1.00232 17.909C1.15148 17.1921 1.49883 16.5318 2.00462 16.0038C2.05083 15.9537 2.1027 15.9091 2.15918 15.8709C2.54332 15.6272 3.34253 15.8753 3.26305 15.1354C3.22303 14.9832 3.19787 14.8274 3.18797 14.6702C3.21631 14.544 3.27549 14.4267 3.36018 14.3291C3.55365 14.0431 3.78375 13.7839 4.04457 13.5582C4.2221 13.4243 4.42806 13.3335 4.64636 13.2928C4.86466 13.252 5.0894 13.2625 5.303 13.3234C5.49156 13.3877 5.685 13.4365 5.88143 13.4696C7.31204 11.8834 8.74265 10.2988 10.1733 8.71558C10.8104 8.01023 11.4582 7.31463 12.1011 6.61416C12.5784 6.09401 13.3635 5.48481 13.6831 4.85169C13.8849 4.45294 13.7348 3.96203 13.6681 3.54733C13.4637 2.2833 14.0496 -0.194715 15.7739 0.0121916C16.8071 0.137576 17.4871 1.58637 17.2928 3.24783Z"
      fill={props.color}
    />
  </svg>
);
export default SvgHurlingIcon;
