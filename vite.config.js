import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind ke liye alag plugin import karne ki zarurat nahi hai.
// Tailwind postcss.config.js ke through automatically apply hoga.

export default defineConfig({
  plugins: [react()],
})
