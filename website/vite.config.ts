import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate', injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    includeAssets: ['logo.svg'],
    workbox: { globPatterns: ['**/*.{js,css,html,woff2}'] },
    manifest: {
      name: 'Khatat',
      short_name: 'Khatat',
      description: 'a note taking app for arabic',
      theme_color: '#0a0a0a',
      icons: [
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
