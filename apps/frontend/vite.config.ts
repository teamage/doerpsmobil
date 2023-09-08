import solidPlugin from 'vite-plugin-solid';
import ssr from 'vite-plugin-ssr/plugin';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    solidPlugin(),
    ssr({
      prerender: true,
    }),
  ],
};

export default config;
