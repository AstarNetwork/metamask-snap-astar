import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  input: resolve(__dirname, 'src/index.ts'),
  output: {path: "dist", filename: "bundle.js"},
  server: {
    port: 8081,
  },
  polyfills: {
    buffer: true,
  },
};

export default config;
