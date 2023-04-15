const { defineConfig } = require('vite')
const solidPlugin = require('vite-plugin-solid')
const path = require('path')

module.exports = defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UI',
      fileName: (format) => `ui.${format}.js`,
    },
    target: 'esnext',
  },
})
