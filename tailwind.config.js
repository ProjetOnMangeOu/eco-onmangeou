/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1921px',
      ...defaultTheme.screens,
    },

    listStyleType: {
      roman: 'upper-roman',
    },

    extend: {
      fontFamily: {
        primary: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ],
      },

      transitionProperty: {
        'max-height': 'max-height',
      },

      colors: {
        "background": "#fffbf4",
        "primary": {
          "50": "#fffaed",
          "100": "#fff4d4",
          "200": "#ffe4a8",
          "300": "#ffd071",
          "400": "#ffb84c",
          "500": "#fe9611",
          "600": "#ef7b07",
          "700": "#c65c08",
          "800": "#9d490f",
          "900": "#7e3d10",
          "950": "#441c06"
        },
        "secondary": {
          "50": "#fff1f2",
          "100": "#ffdfe1",
          "200": "#ffc5c9",
          "300": "#ff9da3",
          "400": "#ff646e",
          "500": "#ff4d58",
          "600": "#ed1522",
          "700": "#c80d19",
          "800": "#a50f18",
          "900": "#88141b",
          "950": "#4b0408"
        },
        "accent": {
          "50": "#f0f8ff",
          "100": "#dfefff",
          "200": "#b8e0ff",
          "300": "#79c7ff",
          "400": "#38aefe",
          "500": "#0791f0",
          "600": "#0072cd",
          "700": "#005aa6",
          "800": "#034d89",
          "900": "#094171",
          "950": "#06284b"
        },
      }
    },
  },
  plugins: [],
};