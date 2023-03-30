import suidPlugin from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  build: {
    target: 'esnext',
  },
});
