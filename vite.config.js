import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // 代理到 Laravel（Sail 的 nginx 在 80）
      '/api': {
        target: 'http://host.docker.internal',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://host.docker.internal',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
