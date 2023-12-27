import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/knowledgebase/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})