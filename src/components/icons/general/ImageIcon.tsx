import * as React from "react";
import type { SVGProps } from "react";
interface IProps {
  fill?: string;
  props?: SVGProps<SVGSVGElement>;
}
const SvgImageIcon = ({ props, fill = "white" }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" {...props}>
    <g opacity="0.5">
      <path
        d="M40.5 8.25H13.5C12.9033 8.25 12.331 8.48705 11.909 8.90901C11.4871 9.33097 11.25 9.90326 11.25 10.5V14.25H7.5C6.90326 14.25 6.33097 14.4871 5.90901 14.909C5.48705 15.331 5.25 15.9033 5.25 16.5V37.5C5.25 38.0967 5.48705 38.669 5.90901 39.091C6.33097 39.5129 6.90326 39.75 7.5 39.75H34.5C35.0967 39.75 35.669 39.5129 36.091 39.091C36.5129 38.669 36.75 38.0967 36.75 37.5V33.75H40.5C41.0967 33.75 41.669 33.5129 42.091 33.091C42.5129 32.669 42.75 32.0967 42.75 31.5V10.5C42.75 9.90326 42.5129 9.33097 42.091 8.90901C41.669 8.48705 41.0967 8.25 40.5 8.25ZM12.75 10.5C12.75 10.3011 12.829 10.1103 12.9697 9.96967C13.1103 9.82902 13.3011 9.75 13.5 9.75H40.5C40.6989 9.75 40.8897 9.82902 41.0303 9.96967C41.171 10.1103 41.25 10.3011 41.25 10.5V24.075L38.0831 20.9081C37.8741 20.6984 37.6257 20.5319 37.3522 20.4184C37.0787 20.3048 36.7855 20.2464 36.4894 20.2464C36.1932 20.2464 35.9 20.3048 35.6265 20.4184C35.353 20.5319 35.1047 20.6984 34.8956 20.9081L30.615 25.1887L21.8419 16.4081C21.6328 16.1984 21.3845 16.0319 21.111 15.9184C20.8375 15.8048 20.5443 15.7464 20.2481 15.7464C19.952 15.7464 19.6588 15.8048 19.3853 15.9184C19.1118 16.0319 18.8634 16.1984 18.6544 16.4081L12.75 22.3125V10.5ZM35.25 37.5C35.25 37.6989 35.171 37.8897 35.0303 38.0303C34.8897 38.171 34.6989 38.25 34.5 38.25H7.5C7.30109 38.25 7.11032 38.171 6.96967 38.0303C6.82902 37.8897 6.75 37.6989 6.75 37.5V16.5C6.75 16.3011 6.82902 16.1103 6.96967 15.9697C7.11032 15.829 7.30109 15.75 7.5 15.75H11.25V31.5C11.25 32.0967 11.4871 32.669 11.909 33.091C12.331 33.5129 12.9033 33.75 13.5 33.75H35.25V37.5ZM40.5 32.25H13.5C13.3011 32.25 13.1103 32.171 12.9697 32.0303C12.829 31.8897 12.75 31.6989 12.75 31.5V24.4387L19.7194 17.4694C19.789 17.3996 19.8717 17.3443 19.9628 17.3066C20.0538 17.2688 20.1514 17.2494 20.25 17.2494C20.3486 17.2494 20.4462 17.2688 20.5372 17.3066C20.6283 17.3443 20.711 17.3996 20.7806 17.4694L30.0919 26.7806C30.2325 26.9209 30.423 26.9997 30.6216 26.9997C30.8202 26.9997 31.0107 26.9209 31.1512 26.7806L35.9625 21.9694C36.0322 21.8996 36.1149 21.8443 36.2059 21.8066C36.297 21.7688 36.3946 21.7494 36.4931 21.7494C36.5917 21.7494 36.6893 21.7688 36.7803 21.8066C36.8714 21.8443 36.9541 21.8996 37.0238 21.9694L41.25 26.1956V31.5C41.25 31.6989 41.171 31.8897 41.0303 32.0303C40.8897 32.171 40.6989 32.25 40.5 32.25ZM30.75 15.75C30.75 15.4533 30.838 15.1633 31.0028 14.9166C31.1676 14.67 31.4019 14.4777 31.676 14.3642C31.9501 14.2506 32.2517 14.2209 32.5426 14.2788C32.8336 14.3367 33.1009 14.4796 33.3107 14.6893C33.5204 14.8991 33.6633 15.1664 33.7212 15.4574C33.7791 15.7483 33.7494 16.0499 33.6358 16.324C33.5223 16.5981 33.33 16.8324 33.0834 16.9972C32.8367 17.162 32.5467 17.25 32.25 17.25C31.8522 17.25 31.4706 17.092 31.1893 16.8107C30.908 16.5294 30.75 16.1478 30.75 15.75Z"
        fill={fill}
      />
    </g>
  </svg>
);
export default SvgImageIcon;
