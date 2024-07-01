import * as React from "react";
import type { SVGProps } from "react";
const SvgTrophyIcon = ({ width = 21, height = 22, color = "#FCFDFF", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask id="path-1-outside-1_1076_5953" maskUnits="userSpaceOnUse" x={0} y={-0.000976562} width={21} height={22} fill={color}>
      <rect fill={color} y={-0.000976562} width={21} height={22} />
      <path d="M14.3617 20.6833C14.3839 20.7154 14.3963 20.7537 14.3974 20.793C14.3985 20.8323 14.3883 20.8711 14.368 20.9045C14.3477 20.9379 14.3182 20.9643 14.2832 20.9807C14.2483 20.997 14.2094 21.0026 14.1714 20.9965H7.0637C7.02568 21.0027 6.98672 20.9973 6.9517 20.981C6.91668 20.9646 6.88716 20.9379 6.86681 20.9045C6.84647 20.8711 6.83622 20.8323 6.83734 20.793C6.83845 20.7536 6.85088 20.7154 6.87309 20.6833L7.67604 19.014C7.72552 18.9236 7.79654 18.8475 7.88251 18.7927C7.96848 18.738 8.06659 18.7063 8.16772 18.7007H13.0671C13.1682 18.7063 13.2663 18.738 13.3523 18.7927C13.4382 18.8475 13.5093 18.9236 13.5587 19.014L14.3617 20.6833Z" />
      <path d="M19.2682 3.4525C18.7669 3.21305 17.9625 3.18898 17.2991 3.18898L17.3472 2.7285C17.3749 2.51013 17.3563 2.28799 17.2926 2.07764C17.2288 1.8673 17.1215 1.67362 16.978 1.50953C16.8344 1.34544 16.6579 1.21502 16.4605 1.12699C16.2632 1.03897 16.0496 0.995239 15.8343 0.99928H5.40046C5.18519 0.995239 4.9716 1.03897 4.77424 1.12699C4.57688 1.21502 4.40039 1.34544 4.25681 1.50953C4.11322 1.67362 4.00592 1.8673 3.94221 2.07764C3.8785 2.28799 3.85989 2.51013 3.88762 2.7285L3.92064 3.0166L3.92964 3.10264L3.93865 3.18538L3.76755 3.18898C3.15669 3.14483 2.54366 3.23456 1.96955 3.4525C1.31818 3.7687 1 4.40126 1 5.39008C1.03781 6.56038 1.32355 7.70833 1.83747 8.75467C2.46482 10.0314 3.26027 10.7342 4.07973 10.7342C4.25114 10.7353 4.42219 10.7178 4.59002 10.6821L4.73709 10.6575L4.88718 11.8369C4.96089 12.3006 5.1261 12.744 5.37277 13.1404C5.61944 13.5367 5.94239 13.8777 6.32198 14.1423L9.31165 16.0118C9.45472 16.1004 9.60798 16.1704 9.76791 16.2205C9.76791 16.2205 9.90899 16.256 9.93901 16.2624V15.6898H11.2988V16.2585C11.3288 16.2527 11.4669 16.2208 11.4669 16.2208C11.6263 16.1694 11.7794 16.0995 11.9231 16.0121L14.9128 14.1426C15.2924 13.878 15.6153 13.537 15.862 13.1407C16.1087 12.7443 16.2739 12.3009 16.3476 11.8372L16.4586 10.8206L16.4677 10.7285L16.4797 10.6425C16.5063 10.651 16.5334 10.6583 16.5607 10.6641C16.589 10.6732 16.6182 10.6793 16.6478 10.6824C16.8148 10.7168 16.9847 10.7342 17.155 10.7345C17.9745 10.7345 18.7699 10.0317 19.3973 8.75497C19.9112 7.70863 20.197 6.56068 20.2348 5.39038C20.236 4.40125 19.9196 3.7687 19.2682 3.4525ZM4.49696 9.99133C4.35992 10.0221 4.22002 10.0376 4.07973 10.0375C2.84303 10.0375 1.68439 7.13655 1.68439 5.38978C1.68439 4.48109 1.99056 4.214 2.26071 4.08507C2.76198 3.91393 3.29166 3.84684 3.81858 3.8881H4.02269L4.0347 4.06049L4.68006 9.95115L4.49696 9.99133ZM15.8223 10.3505L15.8013 10.5501L15.6692 11.7565C15.5449 12.4798 15.1456 13.1233 14.5586 13.5463L11.5659 15.4158C11.5044 15.4535 11.4402 15.4864 11.3738 15.5141C11.2841 15.5501 11.1917 15.5789 11.0977 15.6002C10.951 15.6348 10.8009 15.6523 10.6504 15.6524L10.6204 15.6554H10.6174C10.4567 15.6561 10.2966 15.6376 10.1401 15.6002C10.0456 15.5807 9.95308 15.5519 9.86397 15.5141C9.7961 15.4876 9.73078 15.4547 9.66885 15.4158L6.67618 13.5463C6.08919 13.1233 5.68988 12.4798 5.56556 11.7565L4.566 2.65175C4.55086 2.53103 4.56096 2.40812 4.59563 2.2917C4.6303 2.17527 4.68875 2.06791 4.76711 1.97631C4.84684 1.88592 4.94469 1.81407 5.05399 1.76586C5.16329 1.71765 5.28146 1.69416 5.40046 1.6969H15.8343C15.9533 1.69416 16.0715 1.71765 16.1808 1.76586C16.2901 1.81407 16.3879 1.88592 16.4677 1.97631C16.546 2.06791 16.6045 2.17527 16.6391 2.2917C16.6738 2.40812 16.6839 2.53103 16.6688 2.65175L15.8223 10.3505ZM17.155 10.0375C17.0097 10.0368 16.8648 10.0202 16.7228 9.98833C16.6958 9.97881 16.6658 9.97296 16.6388 9.96375C16.6103 9.95709 16.5823 9.94887 16.5547 9.93916L16.5667 9.85012L16.5757 9.76108L17.2001 4.06079L17.2181 3.8884C17.8634 3.8884 18.5988 3.90087 18.9741 4.08537C19.2442 4.2143 19.5534 4.48139 19.5534 5.39008C19.5534 7.13654 18.3917 10.0375 17.155 10.0375Z" />
      <path d="M11.2988 15.689H9.93901V19.2316H11.2988V15.689Z" />
    </mask>
    <path
      d="M14.3617 20.6833C14.3839 20.7154 14.3963 20.7537 14.3974 20.793C14.3985 20.8323 14.3883 20.8711 14.368 20.9045C14.3477 20.9379 14.3182 20.9643 14.2832 20.9807C14.2483 20.997 14.2094 21.0026 14.1714 20.9965H7.0637C7.02568 21.0027 6.98672 20.9973 6.9517 20.981C6.91668 20.9646 6.88716 20.9379 6.86681 20.9045C6.84647 20.8711 6.83622 20.8323 6.83734 20.793C6.83845 20.7536 6.85088 20.7154 6.87309 20.6833L7.67604 19.014C7.72552 18.9236 7.79654 18.8475 7.88251 18.7927C7.96848 18.738 8.06659 18.7063 8.16772 18.7007H13.0671C13.1682 18.7063 13.2663 18.738 13.3523 18.7927C13.4382 18.8475 13.5093 18.9236 13.5587 19.014L14.3617 20.6833Z"
      fill={color}
    />
    <path
      d="M19.2682 3.4525C18.7669 3.21305 17.9625 3.18898 17.2991 3.18898L17.3472 2.7285C17.3749 2.51013 17.3563 2.28799 17.2926 2.07764C17.2288 1.8673 17.1215 1.67362 16.978 1.50953C16.8344 1.34544 16.6579 1.21502 16.4605 1.12699C16.2632 1.03897 16.0496 0.995239 15.8343 0.99928H5.40046C5.18519 0.995239 4.9716 1.03897 4.77424 1.12699C4.57688 1.21502 4.40039 1.34544 4.25681 1.50953C4.11322 1.67362 4.00592 1.8673 3.94221 2.07764C3.8785 2.28799 3.85989 2.51013 3.88762 2.7285L3.92064 3.0166L3.92964 3.10264L3.93865 3.18538L3.76755 3.18898C3.15669 3.14483 2.54366 3.23456 1.96955 3.4525C1.31818 3.7687 1 4.40126 1 5.39008C1.03781 6.56038 1.32355 7.70833 1.83747 8.75467C2.46482 10.0314 3.26027 10.7342 4.07973 10.7342C4.25114 10.7353 4.42219 10.7178 4.59002 10.6821L4.73709 10.6575L4.88718 11.8369C4.96089 12.3006 5.1261 12.744 5.37277 13.1404C5.61944 13.5367 5.94239 13.8777 6.32198 14.1423L9.31165 16.0118C9.45472 16.1004 9.60798 16.1704 9.76791 16.2205C9.76791 16.2205 9.90899 16.256 9.93901 16.2624V15.6898H11.2988V16.2585C11.3288 16.2527 11.4669 16.2208 11.4669 16.2208C11.6263 16.1694 11.7794 16.0995 11.9231 16.0121L14.9128 14.1426C15.2924 13.878 15.6153 13.537 15.862 13.1407C16.1087 12.7443 16.2739 12.3009 16.3476 11.8372L16.4586 10.8206L16.4677 10.7285L16.4797 10.6425C16.5063 10.651 16.5334 10.6583 16.5607 10.6641C16.589 10.6732 16.6182 10.6793 16.6478 10.6824C16.8148 10.7168 16.9847 10.7342 17.155 10.7345C17.9745 10.7345 18.7699 10.0317 19.3973 8.75497C19.9112 7.70863 20.197 6.56068 20.2348 5.39038C20.236 4.40125 19.9196 3.7687 19.2682 3.4525ZM4.49696 9.99133C4.35992 10.0221 4.22002 10.0376 4.07973 10.0375C2.84303 10.0375 1.68439 7.13655 1.68439 5.38978C1.68439 4.48109 1.99056 4.214 2.26071 4.08507C2.76198 3.91393 3.29166 3.84684 3.81858 3.8881H4.02269L4.0347 4.06049L4.68006 9.95115L4.49696 9.99133ZM15.8223 10.3505L15.8013 10.5501L15.6692 11.7565C15.5449 12.4798 15.1456 13.1233 14.5586 13.5463L11.5659 15.4158C11.5044 15.4535 11.4402 15.4864 11.3738 15.5141C11.2841 15.5501 11.1917 15.5789 11.0977 15.6002C10.951 15.6348 10.8009 15.6523 10.6504 15.6524L10.6204 15.6554H10.6174C10.4567 15.6561 10.2966 15.6376 10.1401 15.6002C10.0456 15.5807 9.95308 15.5519 9.86397 15.5141C9.7961 15.4876 9.73078 15.4547 9.66885 15.4158L6.67618 13.5463C6.08919 13.1233 5.68988 12.4798 5.56556 11.7565L4.566 2.65175C4.55086 2.53103 4.56096 2.40812 4.59563 2.2917C4.6303 2.17527 4.68875 2.06791 4.76711 1.97631C4.84684 1.88592 4.94469 1.81407 5.05399 1.76586C5.16329 1.71765 5.28146 1.69416 5.40046 1.6969H15.8343C15.9533 1.69416 16.0715 1.71765 16.1808 1.76586C16.2901 1.81407 16.3879 1.88592 16.4677 1.97631C16.546 2.06791 16.6045 2.17527 16.6391 2.2917C16.6738 2.40812 16.6839 2.53103 16.6688 2.65175L15.8223 10.3505ZM17.155 10.0375C17.0097 10.0368 16.8648 10.0202 16.7228 9.98833C16.6958 9.97881 16.6658 9.97296 16.6388 9.96375C16.6103 9.95709 16.5823 9.94887 16.5547 9.93916L16.5667 9.85012L16.5757 9.76108L17.2001 4.06079L17.2181 3.8884C17.8634 3.8884 18.5988 3.90087 18.9741 4.08537C19.2442 4.2143 19.5534 4.48139 19.5534 5.39008C19.5534 7.13654 18.3917 10.0375 17.155 10.0375Z"
      fill={color}
    />
    <path d="M11.2988 15.689H9.93901V19.2316H11.2988V15.689Z" fill={color} />
    <path
      d="M14.3617 20.6833C14.3839 20.7154 14.3963 20.7537 14.3974 20.793C14.3985 20.8323 14.3883 20.8711 14.368 20.9045C14.3477 20.9379 14.3182 20.9643 14.2832 20.9807C14.2483 20.997 14.2094 21.0026 14.1714 20.9965H7.0637C7.02568 21.0027 6.98672 20.9973 6.9517 20.981C6.91668 20.9646 6.88716 20.9379 6.86681 20.9045C6.84647 20.8711 6.83622 20.8323 6.83734 20.793C6.83845 20.7536 6.85088 20.7154 6.87309 20.6833L7.67604 19.014C7.72552 18.9236 7.79654 18.8475 7.88251 18.7927C7.96848 18.738 8.06659 18.7063 8.16772 18.7007H13.0671C13.1682 18.7063 13.2663 18.738 13.3523 18.7927C13.4382 18.8475 13.5093 18.9236 13.5587 19.014L14.3617 20.6833Z"
      stroke={color}
      strokeWidth={0.601087}
      mask="url(#path-1-outside-1_1076_5953)"
    />
    <path
      d="M19.2682 3.4525C18.7669 3.21305 17.9625 3.18898 17.2991 3.18898L17.3472 2.7285C17.3749 2.51013 17.3563 2.28799 17.2926 2.07764C17.2288 1.8673 17.1215 1.67362 16.978 1.50953C16.8344 1.34544 16.6579 1.21502 16.4605 1.12699C16.2632 1.03897 16.0496 0.995239 15.8343 0.99928H5.40046C5.18519 0.995239 4.9716 1.03897 4.77424 1.12699C4.57688 1.21502 4.40039 1.34544 4.25681 1.50953C4.11322 1.67362 4.00592 1.8673 3.94221 2.07764C3.8785 2.28799 3.85989 2.51013 3.88762 2.7285L3.92064 3.0166L3.92964 3.10264L3.93865 3.18538L3.76755 3.18898C3.15669 3.14483 2.54366 3.23456 1.96955 3.4525C1.31818 3.7687 1 4.40126 1 5.39008C1.03781 6.56038 1.32355 7.70833 1.83747 8.75467C2.46482 10.0314 3.26027 10.7342 4.07973 10.7342C4.25114 10.7353 4.42219 10.7178 4.59002 10.6821L4.73709 10.6575L4.88718 11.8369C4.96089 12.3006 5.1261 12.744 5.37277 13.1404C5.61944 13.5367 5.94239 13.8777 6.32198 14.1423L9.31165 16.0118C9.45472 16.1004 9.60798 16.1704 9.76791 16.2205C9.76791 16.2205 9.90899 16.256 9.93901 16.2624V15.6898H11.2988V16.2585C11.3288 16.2527 11.4669 16.2208 11.4669 16.2208C11.6263 16.1694 11.7794 16.0995 11.9231 16.0121L14.9128 14.1426C15.2924 13.878 15.6153 13.537 15.862 13.1407C16.1087 12.7443 16.2739 12.3009 16.3476 11.8372L16.4586 10.8206L16.4677 10.7285L16.4797 10.6425C16.5063 10.651 16.5334 10.6583 16.5607 10.6641C16.589 10.6732 16.6182 10.6793 16.6478 10.6824C16.8148 10.7168 16.9847 10.7342 17.155 10.7345C17.9745 10.7345 18.7699 10.0317 19.3973 8.75497C19.9112 7.70863 20.197 6.56068 20.2348 5.39038C20.236 4.40125 19.9196 3.7687 19.2682 3.4525ZM4.49696 9.99133C4.35992 10.0221 4.22002 10.0376 4.07973 10.0375C2.84303 10.0375 1.68439 7.13655 1.68439 5.38978C1.68439 4.48109 1.99056 4.214 2.26071 4.08507C2.76198 3.91393 3.29166 3.84684 3.81858 3.8881H4.02269L4.0347 4.06049L4.68006 9.95115L4.49696 9.99133ZM15.8223 10.3505L15.8013 10.5501L15.6692 11.7565C15.5449 12.4798 15.1456 13.1233 14.5586 13.5463L11.5659 15.4158C11.5044 15.4535 11.4402 15.4864 11.3738 15.5141C11.2841 15.5501 11.1917 15.5789 11.0977 15.6002C10.951 15.6348 10.8009 15.6523 10.6504 15.6524L10.6204 15.6554H10.6174C10.4567 15.6561 10.2966 15.6376 10.1401 15.6002C10.0456 15.5807 9.95308 15.5519 9.86397 15.5141C9.7961 15.4876 9.73078 15.4547 9.66885 15.4158L6.67618 13.5463C6.08919 13.1233 5.68988 12.4798 5.56556 11.7565L4.566 2.65175C4.55086 2.53103 4.56096 2.40812 4.59563 2.2917C4.6303 2.17527 4.68875 2.06791 4.76711 1.97631C4.84684 1.88592 4.94469 1.81407 5.05399 1.76586C5.16329 1.71765 5.28146 1.69416 5.40046 1.6969H15.8343C15.9533 1.69416 16.0715 1.71765 16.1808 1.76586C16.2901 1.81407 16.3879 1.88592 16.4677 1.97631C16.546 2.06791 16.6045 2.17527 16.6391 2.2917C16.6738 2.40812 16.6839 2.53103 16.6688 2.65175L15.8223 10.3505ZM17.155 10.0375C17.0097 10.0368 16.8648 10.0202 16.7228 9.98833C16.6958 9.97881 16.6658 9.97296 16.6388 9.96375C16.6103 9.95709 16.5823 9.94887 16.5547 9.93916L16.5667 9.85012L16.5757 9.76108L17.2001 4.06079L17.2181 3.8884C17.8634 3.8884 18.5988 3.90087 18.9741 4.08537C19.2442 4.2143 19.5534 4.48139 19.5534 5.39008C19.5534 7.13654 18.3917 10.0375 17.155 10.0375Z"
      stroke={color}
      strokeWidth={0.601087}
      mask="url(#path-1-outside-1_1076_5953)"
    />
    <path
      d="M11.2988 15.689H9.93901V19.2316H11.2988V15.689Z"
      stroke={color}
      strokeWidth={0.601087}
      mask="url(#path-1-outside-1_1076_5953)"
    />
  </svg>
);
export default SvgTrophyIcon;