import * as React from "react";
import type { SVGProps } from "react";
const SvgTableTennisIcon = ({ width = 37, height = 45, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 37 45" fill="none" {...props}>
    <path
      d="M30.0696 15.344L29.5388 16.0174C28.5436 17.2888 27.0449 17.5353 25.8525 16.7625C25.7715 16.7118 25.6738 16.6949 25.5803 16.7152C25.4869 16.7355 25.4052 16.7916 25.3528 16.8713L23.983 18.7021C24.0165 18.8517 24.0343 19.0044 24.0361 19.1577C24.0361 20.1633 23.3939 20.9745 22.6085 20.9745H19.5028C18.2577 20.9745 16.7896 21.2969 15.7765 20.1394C15.4061 19.7219 15.1605 19.1483 14.817 18.6928C14.7308 18.5523 14.6007 18.4439 14.4466 18.3844C13.9022 18.2326 13.7324 19.5607 13.5997 19.9927C13.1578 21.4108 12.8143 22.8714 12.3903 24.2993C12.1357 25.1578 11.6271 26.2347 11.5466 27.1499C11.5377 27.2071 11.5335 27.2544 11.5287 27.2971C11.4887 27.7657 11.5019 27.7005 11.8995 28.1748C12.6054 29.0183 13.3051 29.9012 14.0415 30.6978C15.0631 31.7986 16.2771 32.733 16.0899 34.6726C15.9247 36.3423 15.1487 37.8461 14.6838 39.3925L13.4387 43.5758C13.3592 43.9554 13.1585 44.2992 12.8665 44.5557C12.5746 44.8122 12.2071 44.9677 11.8191 44.999C11.7366 44.9981 11.6545 44.9901 11.5734 44.9752C11.3305 44.9262 11.1027 44.8207 10.9086 44.6673C10.19 44.1167 9.92034 42.9498 10.2215 41.9493C10.8685 39.7815 12.6312 37.2294 12.0421 34.7771C11.8071 33.9778 11.3492 33.2614 10.7217 32.711C10.35 32.3398 9.03433 30.15 8.60706 31.0446C8.29837 31.6922 8.68705 32.5647 8.56565 33.2471C8.39969 34.2112 8.0929 35.146 7.65509 36.0217L4.31742 42.6339C4.1197 43.1054 3.83334 43.5348 3.47372 43.8992C2.97822 44.3022 2.34438 44.0984 1.90299 43.4011C1.42958 42.5246 1.23789 41.5245 1.35386 40.536C1.47194 39.6863 1.75552 38.8678 2.18865 38.1263L4.95972 32.7569C5.34445 31.9661 5.56029 31.1045 5.59359 30.2264C5.62691 28.9413 5.56492 27.6555 5.40817 26.3795C5.29523 25.1719 5.08396 23.863 5.41523 22.6774C5.73615 21.5996 6.03073 20.5148 6.33894 19.4332C6.50411 18.8545 7.98122 15.2119 7.09751 15.1927L5.86557 15.1641C5.62553 15.1393 5.38323 15.1802 5.1649 15.2826C4.8533 15.5147 4.63762 15.8522 4.55838 16.2316C4.38851 16.7911 4.27605 17.3746 4.08782 17.9252C3.64597 19.2148 3.1909 20.496 2.74904 21.7814C2.67294 22.0766 2.50588 22.3405 2.27131 22.5361C2.03673 22.7317 1.74649 22.8492 1.4414 22.8719C1.24134 22.8693 1.04507 22.8173 0.870146 22.7206C0.497727 22.4594 0.223206 22.0821 0.089866 21.6484C-0.0434738 21.2146 -0.0280753 20.749 0.133694 20.325C0.861175 18.1998 1.48136 16.0418 2.17308 13.9049C3.01679 11.3055 4.33769 11.5951 6.2298 11.5759C7.83205 11.5618 9.42061 11.5093 11.0182 11.4953C11.5669 11.4633 12.1174 11.5129 12.6515 11.6425C14.0396 12.0408 15.2443 14.2985 16.1948 15.5127C16.6682 16.1154 17.007 17.0592 17.6898 17.3104C17.9094 17.3768 18.1396 17.4009 18.3683 17.3816C19.7828 17.353 21.1977 17.3348 22.6122 17.3437C22.7132 17.3456 22.8136 17.3601 22.911 17.3867L24.3698 15.6266C24.437 15.5366 24.4801 15.431 24.4949 15.3198C24.5097 15.2086 24.4959 15.0955 24.4545 14.9912C24.1482 14.2234 24.0412 13.3911 24.1434 12.5712C24.2455 11.7513 24.5535 10.9703 25.0389 10.3003L25.5702 9.62644C25.8198 9.26149 26.1552 8.96283 26.5471 8.75642C26.9391 8.55001 27.3758 8.44211 27.8192 8.44211C28.2626 8.44211 28.6993 8.55001 29.0912 8.75642C29.4832 8.96283 29.8186 9.26149 30.0682 9.62644C30.6727 10.458 30.9983 11.4584 30.9985 12.485C30.9988 13.5116 30.6737 14.5121 30.0696 15.344Z"
      fill={props.color}
    />
    <path
      d="M28.6222 21.5818C29.111 21.5818 29.5073 21.0776 29.5073 20.4557C29.5073 19.8338 29.111 19.3296 28.6222 19.3296C28.1333 19.3296 27.737 19.8338 27.737 20.4557C27.737 21.0776 28.1333 21.5818 28.6222 21.5818Z"
      fill={props.color}
    />
    <path
      d="M15.6894 5.21301L12.8806 8.20699C12.5983 8.52106 12.2223 8.73658 11.8078 8.82182C11.1259 8.9446 10.1655 8.72295 9.54155 6.90565C9.49268 6.75713 9.46112 6.60352 9.44746 6.44782L9.11804 3.10049C9.04691 2.4929 9.16764 1.87833 9.46343 1.34223C9.96411 0.478571 11.1019 -0.401033 13.6886 0.195516C13.8818 0.245054 14.0646 0.328205 14.2287 0.441094C14.859 0.735419 15.388 1.20836 15.7496 1.80069C16.1112 2.39303 16.2893 3.07841 16.2616 3.77106C16.2622 4.30674 16.0575 4.82247 15.6894 5.21301Z"
      fill={props.color}
    />
    <path
      d="M20.5465 26.7193V27.7779C20.5464 27.8364 20.5579 27.8943 20.5803 27.9483C20.6028 28.0024 20.6357 28.0516 20.6772 28.093C20.7188 28.1343 20.7681 28.1672 20.8223 28.1896C20.8766 28.212 20.9348 28.2235 20.9935 28.2235H23.3642C23.4827 28.2235 23.5964 28.2704 23.6803 28.3539C23.7641 28.4374 23.8112 28.5506 23.8112 28.6687V44.5548C23.8112 44.6728 23.8583 44.7861 23.9421 44.8696C24.026 44.9531 24.1397 45 24.2582 45H25.0713C25.1899 45 25.3036 44.9531 25.3874 44.8696C25.4713 44.7861 25.5184 44.6728 25.5184 44.5548V28.6687C25.5184 28.5506 25.5655 28.4374 25.6493 28.3539C25.7331 28.2704 25.8468 28.2235 25.9654 28.2235H36.5529C36.6715 28.2234 36.7853 28.1764 36.8691 28.0928C36.9529 28.0093 37 27.896 37 27.7779V26.7193C37 26.6011 36.9529 26.4879 36.8691 26.4043C36.7853 26.3207 36.6715 26.2737 36.5529 26.2736H20.9954C20.9365 26.2734 20.8782 26.2848 20.8237 26.3071C20.7693 26.3294 20.7198 26.3622 20.6781 26.4036C20.6363 26.445 20.6033 26.4942 20.5807 26.5484C20.5581 26.6025 20.5465 26.6606 20.5465 26.7193Z"
      fill={props.color}
    />
  </svg>
);
export default SvgTableTennisIcon;