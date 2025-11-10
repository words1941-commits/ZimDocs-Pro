import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ZimDocs-Pro/',
  plugins: [react()],
  build: {
    target: 'es2018'
  }
})
