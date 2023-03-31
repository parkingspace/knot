import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

// clearScreen: false,
// envPrefix: ["VITE_", "TAURI_"],
// target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
// minify: process.env.TAURI_DEBUG ? false : "esbuild",
// sourcemap: !!process.env.TAURI_DEBUG,

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: '../../dist/web',
    target: 'esnext',
  },
})
