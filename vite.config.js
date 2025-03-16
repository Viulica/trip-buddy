import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This allows external access
    port: 5173   // Keep the same port as localhost
  },
  // ... other config options
}) 