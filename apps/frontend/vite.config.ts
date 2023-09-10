import solidPlugin from 'vite-plugin-solid';
import ssr from 'vite-plugin-ssr/plugin';
import path from 'node:path';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    solidPlugin({ ssr: true }),
    ssr({
      prerender: true,
    }),
  ],
  resolve: {
    alias: {
      '#backend': path.resolve(__dirname, '../backend/src'),
      '#': path.resolve(__dirname, 'src'),
    },
  },
};

export default config;
