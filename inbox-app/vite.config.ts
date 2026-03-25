import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Required when serving behind Railway (or other) public hostnames.
    allowedHosts: [
      'proton-focus-demo-production.up.railway.app',
      '.up.railway.app',
    ],
  },
})
