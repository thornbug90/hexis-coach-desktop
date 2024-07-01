import * as React from "react";
import type { SVGProps } from "react";
const SvgBadmintonIcon = ({ width = 43, height = 44, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 43 44" fill="none" {...props}>
    <path
      d="M15.4912 4.29319L17.3385 7.98858C17.5203 8.37304 17.8203 8.68855 18.1942 8.88854C18.8136 9.20103 19.7977 9.25817 20.9114 7.67475C21.001 7.54508 21.0755 7.40547 21.1334 7.25869L22.3968 4.11015C22.6372 3.54186 22.6952 2.91232 22.5628 2.30929C22.3275 1.33075 21.4847 0.156287 18.8327 0.000935457C18.6333 -0.00569796 18.4343 0.0229869 18.2448 0.0857277C17.6955 0.252686 16.0245 0.474982 15.3513 2.73472C15.1989 3.25316 15.2489 3.81055 15.4912 4.29319Z"
      fill={props.color}
    />
    <path
      d="M26.2104 24.9978C26.1836 25.0138 26.1533 25.0227 26.1221 25.0234C26.091 25.0242 26.0603 25.0169 26.0328 25.0023C25.451 24.7255 24.8604 24.471 24.2787 24.1987C23.959 24.051 23.6437 23.8996 23.3284 23.7389C22.6978 23.4244 22.0973 23.0524 21.5344 22.6273C19.9624 21.431 18.5325 19.7658 17.1115 18.3194C16.9739 18.1766 16.7696 18.2704 16.6986 18.5114L15.171 23.7657C15.1133 23.9666 14.9578 24.0688 14.8202 24.0023L13.7056 23.4041C13.5679 23.3371 13.4081 23.4443 13.3503 23.6496L13.2793 23.9036C13.2216 24.1094 13.7456 24.4442 13.8877 24.5152C14.9401 25.0554 15.9481 25.725 17.005 26.2611C17.8398 26.6897 18.6702 27.1138 19.505 27.5379C20.0912 27.8414 21.3435 28.1272 21.752 28.7745C21.8328 28.9242 21.8912 29.0852 21.9252 29.2521C22.9421 33.2203 23.9812 37.1759 25.0114 41.1352C25.0299 41.2098 25.033 41.2874 25.0203 41.3633C24.856 42.39 24.5185 43.332 23.808 43.765C23.5536 43.9158 23.2642 43.9968 22.9689 43.9999C22.6735 44.003 22.3825 43.9282 22.125 43.7829C22.0044 43.7295 21.8991 43.6466 21.8186 43.5418C21.7274 43.3877 21.6601 43.2206 21.6188 43.0463C20.704 39.8901 19.767 36.7474 18.8389 33.6002C18.7977 33.4003 18.7144 33.2115 18.5947 33.0466C18.5065 32.9568 18.3962 32.8921 18.275 32.8591C15.8415 31.9172 13.2349 31.0199 11.019 29.3101C10.2534 28.703 9.70859 27.8587 9.46923 26.9084C8.9852 25.0643 10.0288 20.998 10.4773 19.2391C11.0323 17.0695 11.3565 16.5378 11.9649 14.4312C12.0226 14.2259 12.2979 14.1991 12.44 14.266L13.3415 14.6852C13.4791 14.7522 13.6345 14.6406 13.6878 14.4352L13.7811 14.208C13.8071 14.1204 13.7979 14.026 13.7556 13.9451C13.7133 13.8642 13.6411 13.8031 13.5546 13.775L12.0981 13.1946C12.0681 13.1839 12.036 13.1803 12.0044 13.1842C11.9728 13.188 11.9425 13.1993 11.916 13.217L7.73739 15.9039C7.72407 15.9128 7.71519 15.9218 7.70187 15.9312L4.31811 18.9623C4.28523 18.9922 4.24562 19.0137 4.20266 19.0248C2.55963 19.3016 2.72394 17.1811 2.80387 16.5557C2.81612 16.4578 2.85797 16.366 2.92376 16.2928C7.10682 12.0737 12.0537 8.52966 17.1293 9.94032C17.3963 10.0045 17.6502 10.1148 17.8798 10.2662C18.0996 10.3972 18.2883 10.5749 18.4325 10.787C18.5767 10.9991 18.673 11.2404 18.7146 11.4938C18.7114 11.771 18.6619 12.0456 18.5681 12.3063C18.5015 12.5648 18.4659 12.8331 18.4126 13.096C18.35 13.3379 18.3246 13.5879 18.3372 13.8375C18.5437 14.5369 18.9015 15.1818 19.3851 15.7258C19.9003 16.2838 20.4154 16.8374 20.9305 17.3954C21.6143 18.1358 22.2982 18.8754 22.982 19.6141C23.002 19.6346 23.0244 19.6526 23.0487 19.6676L26.7832 21.5957C26.7963 21.601 26.8073 21.6106 26.8143 21.6229C26.8538 21.649 26.8847 21.6863 26.9031 21.73C27.0157 21.9579 27.1079 22.1955 27.1784 22.4399C27.3596 22.9112 27.3609 23.4331 27.1822 23.9054C27.0035 24.3776 26.6573 24.7668 26.2104 24.9978Z"
      fill={props.color}
    />
    <path
      d="M10.0492 29.8847L12.2588 31.2279C12.3589 31.2955 12.4404 31.3875 12.4956 31.4953C12.5508 31.6031 12.578 31.7232 12.5746 31.8444L12.091 35.488C12.091 35.5076 12.091 35.5246 12.091 35.5443C12.1061 35.8023 11.8725 37.8152 10.3676 38.7933L3.08051 43.0016C0.564454 44.4551 0.52804 40.5244 1.60844 39.3749C1.80246 39.1879 2.02269 39.0304 2.26211 38.9075C3.72396 38.0669 5.3137 37.3224 6.69118 36.3438C7.9168 35.4733 8.67835 33.2247 8.79736 31.7739C8.81468 31.5641 8.9177 30.9877 8.97498 30.4181C8.98479 30.2972 9.02558 30.181 9.09337 30.0806C9.16116 29.9803 9.25365 29.8993 9.36182 29.8456C9.46999 29.7919 9.59015 29.7672 9.71061 29.7741C9.83107 29.7809 9.94771 29.819 10.0492 29.8847Z"
      fill={props.color}
    />
    <path
      d="M39.7894 17.9762C41.7232 16.8538 42.5937 14.7299 41.7336 13.2323C40.8735 11.7347 38.6086 11.4305 36.6748 12.5529C34.7409 13.6753 33.8705 15.7992 34.7306 17.2968C35.5907 18.7944 37.8556 19.0986 39.7894 17.9762Z"
      fill={props.color}
    />
    <path
      d="M34.8896 17.6119L27.0021 22.3251C26.9341 22.0905 26.8449 21.8626 26.7357 21.6443C26.7176 21.6023 26.6877 21.5666 26.6495 21.5417L34.4459 16.8838L34.8896 17.6119Z"
      fill={props.color}
    />
    <path
      d="M24.3249 24.0961L22.2182 25.3974L21.7635 24.6291L23.3799 23.6305C23.6934 23.793 24.0069 23.9465 24.3249 24.0961Z"
      fill={props.color}
    />
  </svg>
);
export default SvgBadmintonIcon;
