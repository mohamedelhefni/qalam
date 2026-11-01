const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`

const shape = {
  "--rounded-box": "16px",
  "--rounded-btn": "12px",
  "--rounded-badge": "999px",
  "--tab-radius": "8px",
  "--btn-text-case": "none",
  "--btn-focus-scale": "1",
  "--animation-btn": "0.15s",
  "--animation-input": "0.15s",
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    // Mizan tokens (https://claude.ai/artifact/GiJH6fcgLqNXa1Qj1g78vi) mapped onto daisyUI's names.
    themes: [{
      light: {
        "color-scheme": "light",
        "primary": "#0a0a0a", "primary-focus": "#2e2e2e", "primary-content": "#ffffff",
        "secondary": "#ededed", "secondary-focus": "#e5e5e5", "secondary-content": "#0a0a0a",
        "accent": "#ededed", "accent-focus": "#e5e5e5", "accent-content": "#0a0a0a",
        "neutral": "#0a0a0a", "neutral-focus": "#262626", "neutral-content": "#fafafa",
        "base-100": "#ffffff", "base-200": "#f5f5f5", "base-300": "#e5e5e5", "base-content": "#0a0a0a",
        "info": "#0a0a0a", "info-content": "#ffffff",
        "success": "#256b38", "success-content": "#ffffff",
        "warning": "#8a5000", "warning-content": "#ffffff",
        "error": "#b02a22", "error-content": "#ffffff",
        "--ink-muted": "#595959",
        "--surface-raised": "#ffffff",
        "--app-ring": "#0a0a0a",
        "--line-strong": "#8a8a8a",
        "--shadow-sm": "0 1px 2px rgba(0,0,0,.06), 0 1px 1px rgba(0,0,0,.04)",
        "--shadow-md": "0 8px 24px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04)",
        ...shape,
      },
      dark: {
        "color-scheme": "dark",
        "primary": "#fafafa", "primary-focus": "#d4d4d4", "primary-content": "#0a0a0a",
        "secondary": "#262626", "secondary-focus": "#2e2e2e", "secondary-content": "#fafafa",
        "accent": "#262626", "accent-focus": "#2e2e2e", "accent-content": "#fafafa",
        "neutral": "#1f1f1f", "neutral-focus": "#2e2e2e", "neutral-content": "#fafafa",
        "base-100": "#0a0a0a", "base-200": "#000000", "base-300": "#262626", "base-content": "#fafafa",
        "info": "#fafafa", "info-content": "#0a0a0a",
        "success": "#86d39b", "success-content": "#10241a",
        "warning": "#f2b866", "warning-content": "#2b1f0d",
        "error": "#ff9e93", "error-content": "#1a0806",
        "--ink-muted": "#a3a3a3",
        "--surface-raised": "#141414",
        "--app-ring": "#404040",
        "--line-strong": "#737373",
        "--shadow-sm": "0 1px 2px rgba(0,0,0,.5)",
        "--shadow-md": "0 8px 28px rgba(0,0,0,.6)",
        ...shape,
      },
    }],
  },
  theme: {
    fontFamily: {
      sans: '"Thmanyah Sans", Almarai, Tahoma, system-ui, sans-serif',
      head: '"Thmanyah Serif Display", "Noto Naskh Arabic", Georgia, serif',
      text: '"Thmanyah Serif Text", "Noto Naskh Arabic", Georgia, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    },
    extend: {
      borderRadius: { DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px" },
      boxShadow: { DEFAULT: "var(--shadow-sm)", md: "var(--shadow-md)" },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
