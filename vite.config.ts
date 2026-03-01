import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages: site is served from /foodlink-frontend/ not root /
  base: '/foodlink-frontend/',
  // Output to docs/ so GitHub Pages can serve directly from main branch
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
})
