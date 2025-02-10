import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "src": path.resolve(__dirname, './src'),
      "assets": path.resolve(__dirname, './src/assets'),
      "components": path.resolve(__dirname, './src/components'),
      "libs": path.resolve(__dirname, './src/libs'),
      "middleware": path.resolve(__dirname, './src/middleware'),
      "hooks": path.resolve(__dirname, './src/hooks'),
      "utils": path.resolve(__dirname, './src/utils'),
      "pages": path.resolve(__dirname, './src/pages'),
      "router": path.resolve(__dirname, './src/router'),
      "styles": path.resolve(__dirname, './src/styles'),
      "store": path.resolve(__dirname, './src/store'),
    }
  }
})
