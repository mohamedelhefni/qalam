const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",]
  },
  theme: {
    extend: {
      spacing: {
        7: '1.75rem',
      },
      typography: {
        DEFAULT: {
          css: [
            {
              blockquote: {
                borderRightWidth: '0.25rem',
                borderLeftWidth: 0,
              },
              'ol > li': {
                paddingRight: em(80, 100),
                paddingLeft: 0,
              },
              'ol > li::before': {
                right: em(4, 16),
                left: `auto`,
              },
              'ul > li': {
                paddingRight: em(80, 100),
                paddingLeft: 0,
              },
              'ul > li::before': {
                right: em(4, 16),
                left: `auto`,
              },
            },
            {
              blockquote: {
                paddingRight: em(20, 20),
                paddingLeft: 0,
              },
              'thead th:first-child': {
                paddingRight: '0',
              },
              'thead th:last-child': {
                paddingLeft: '0',
              },
              'tbody td:first-child': {
                paddingRight: '0',
              },
              'tbody td:last-child': {
                paddingLeft: '0',
              },
            },
          ],
        },
        sm: {
          css: [
            {
              blockquote: {
                borderRightWidth: '0.25rem',
                borderLeftWidth: 0,
              },
              'ol > li': {
                paddingRight: em(22, 14),
                paddingLeft: 0,
              },
              'ol > li::before': {
                right: em(3, 14),
                left: `auto`,
              },
              'ul > li': {
                paddingRight: em(22, 14),
                paddingLeft: 0,
              },
              'ul > li::before': {
                right: em(3, 14),
                left: `auto`,
              },
            },
            {
              blockquote: {
                paddingRight: em(20, 18),
                paddingLeft: 0,
              },
              'thead th:first-child': {
                paddingRight: '0',
              },
              'thead th:last-child': {
                paddingLeft: '0',
              },
              'tbody td:first-child': {
                paddingRight: '0',
              },
              'tbody td:last-child': {
                paddingLeft: '0',
              },
            },
          ],
        },
        lg: {
          css: [
            {
              blockquote: {
                borderRightWidth: '0.25rem',
                borderLeftWidth: 0,
              },
              'ol > li': {
                paddingRight: em(30, 18),
                paddingLeft: 0,
              },
              'ol > li::before': {
                right: em(4, 18),
                left: `auto`,
              },
              'ul > li': {
                paddingRight: em(30, 18),
                paddingLeft: 0,
              },
              'ul > li::before': {
                right: em(4, 18),
                left: `auto`,
              },
            },
            {
              blockquote: {
                paddingRight: em(24, 24),
                paddingLeft: 0,
              },
              'thead th:first-child': {
                paddingRight: '0',
              },
              'thead th:last-child': {
                paddingLeft: '0',
              },
              'tbody td:first-child': {
                paddingRight: '0',
              },
              'tbody td:last-child': {
                paddingLeft: '0',
              },
            },
          ],
        },
        xl: {
          css: [
            {
              blockquote: {
                borderRightWidth: '0.25rem',
                borderLeftWidth: 0,
              },
              'ol > li': {
                paddingRight: em(36, 20),
                paddingLeft: 0,
              },
              'ol > li::before': {
                right: em(5, 20),
                left: `auto`,
              },
              'ul > li': {
                paddingRight: em(36, 20),
                paddingLeft: 0,
              },
              'ul > li::before': {
                right: em(5, 20),
                left: `auto`,
              },
            },
            {
              blockquote: {
                paddingRight: em(32, 30),
                paddingLeft: 0,
              },
              'thead th:first-child': {
                paddingRight: '0',
              },
              'thead th:last-child': {
                paddingLeft: '0',
              },
              'tbody td:first-child': {
                paddingRight: '0',
              },
              'tbody td:last-child': {
                paddingLeft: '0',
              },
            },
          ],
        },
        '2xl': {
          css: [
            {
              blockquote: {
                borderRightWidth: '0.25rem',
                borderLeftWidth: 0,
              },
              'ol > li': {
                paddingRight: em(40, 24),
                paddingLeft: 0,
              },
              'ol > li::before': {
                right: em(6, 24),
                left: `auto`,
              },
              'ul > li': {
                paddingRight: em(40, 24),
                paddingLeft: 0,
              },
              'ul > li::before': {
                right: em(6, 24),
                left: `auto`,
              },
            },
            {
              blockquote: {
                paddingRight: em(40, 36),
                paddingLeft: 0,
              },
              'thead th:first-child': {
                paddingRight: '0',
              },
              'thead th:last-child': {
                paddingLeft: '0',
              },
              'tbody td:first-child': {
                paddingRight: '0',
              },
              'tbody td:last-child': {
                paddingLeft: '0',
              },
            },
          ],
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
