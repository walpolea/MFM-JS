const path = require('path');
const { defineConfig } = require('vite');
import dts from 'vite-plugin-dts';

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'MFM-JS',
      fileName: (format) => `mfm.${format}.js`
    }
  },
  plugins: [dts()],
});