#!/usr/bin/env zx

/* globals $ */
import { build, context } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  plugins: [nodeExternalsPlugin()],
  tsconfig: './tsconfig.json',
  minify: true,
  outdir: 'dist',
  format: 'cjs',
  sourcemap: true,
};

await $`rm -rf dist`;

const mode = process.argv[3];

if (mode === 'watch') {
  const ctx = await context(config);
  await ctx.watch();
} else {
  await build({ ...config, sourcemap: false });
}
