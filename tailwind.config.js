/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#359CEF',
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        calc: 'calc(93% - 12px)',
      },
      colors: {
        transparent: 'rgba(0,0,0,0)',
        white: '#ffffff',
        black: '#000000',
        gray: {
          100: '#F4F4F7',
          200: '#D2D2D2',
          300: '#717171',
          400: '#CBCBCB',
          500: '#E7E7E7',
          400: '#C4C4C4',
        },
        darkgrey1: {
          100: '#3A3941',
          200: '#494957',
          300: '#323249',
          400: '#1F1F3B',
          500: '#131330',
          600: '#252238',
        },
        darkgrey2: {
          100: '#7F8086',
          200: '#606272',
          300: '#424458',
          400: '#262943',
          500: '#191B37',
        },
        lightgrey1: {
          100: '#D8D9DA',
          200: '#B9BDC1',
          300: '#8B929C',
          400: '#606774',
          500: '#404859',
          600: '#F9F9F9',
          700: '#FCFDFF',
          800: '#8B8D9E',
        },
        lightgrey2: {
          100: '#EBECF0',
          200: '#DADCE3',
          300: '#C3C4CC',
          400: '#9EA0A7',
          500: '#75767B',
          600: '#C4C4C4',
          700: '#4E4B66',
        },
        carbcodelow: {
          100: '#E63D5B',
          200: '#C43653',
          300: '#A1304C',
          400: '#7F2944',
          500: '#5D223C',
          600: '#E73D5B',
        },
        carbcodemedium: {
          100: '#FE9201',
          200: '#D87D08',
          300: '#B16810',
          400: '#8B5417',
          500: '#653F1E',
        },
        carbcodehigh: {
          100: '#00A398',
          200: '#048B86',
          300: '#087474',
          400: '#0C5C63',
          500: '#104451',
          600: '#00A499',
        },
        activeblue: {
          100: '#359CEF',
          200: '#2679CD',
          300: '#1A5BAC',
          400: '#10408A',
          500: '#0A2D72',
        },
        background: {
          100: '#7476A6',
          200: '#46486F',
          300: '#30314C',
          400: '#252642',
          500: '#18162D',
          600: '#242543',
          700: '#20213C',
          800: '#07060E',
          900: '#18152D',
        },
        energyblue: {
          100: '#608CFA',
          200: '#2D61F8',
          300: '#204AD5',
          400: '#0E258F',
          500: '#081977',
        },
        blue1: {
          100: '#5B80E8',
          200: '#4261C7',
          300: '#2D47A7',
          400: '#1D3086',
          500: '#111F6F',
        },
        blue2: {
          100: '#AED5ED',
          200: '#7FAACB',
          300: '#5781AA',
          400: '#375B89',
          500: '#213F71',
        },
        blue3: {
          100: '#D5EDF7',
          200: '#9BBFD4',
          300: '#6B93B1',
          400: '#43698F',
          500: '#284A76',
        },
      },
      fontSize: {
        xxs: '10px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '22px',
        '2xl': '32px',
        '3xl': '46px',
        '4xl': '58px',
      },
      borderWidth: {
        dropdown: '2px',
        5: '7px',
        6: '6px',
        16: '16px',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#359CEF',

          secondary: '#8d9e12',

          accent: '#c1d3ff',

          neutral: '#20182a',

          'base-100': '#f4f1f4',

          info: '#3baade',

          success: '#3be3c7',

          warning: '#fbb956',

          error: '#ea7699',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
