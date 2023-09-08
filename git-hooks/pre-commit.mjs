#!/usr/bin/env zx

process.env.FORCE_COLOR = '1';

await $`pnpm tsc`;
await $`pnpm lint`;
await $`pnpm format:check`;
