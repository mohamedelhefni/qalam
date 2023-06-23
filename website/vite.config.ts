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
    manifest: {
      name: 'Khatat',
      short_name: 'Khatat',
      description: 'a note taking app for arabic',
      theme_color: '#888',
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
