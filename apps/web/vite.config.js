import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  // clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
  },
  // envPrefix: ["VITE_", "TAURI_"],
  build: {
    outDir: '../dist/web',
    // target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // minify: process.env.TAURI_DEBUG ? false : "esbuild",
    // sourcemap: !!process.env.TAURI_DEBUG,
  },
});
