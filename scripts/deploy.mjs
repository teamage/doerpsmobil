#!/usr/bin/env zx

import { format } from 'date-fns';

$.verbose = true;
process.env.FORCE_COLOR = '1';

await deployAllowed();

let deployMssg = await question('deploy mssg: ');

const currentHash = await $`git rev-parse HEAD`;
const latestTag = await $`git tag -l --sort=-taggerdate v* | head -n 1`;

let deployCmd = '';
let changedPackages = [];
if (!latestTag.stdout.trim()) {
  // initial deploy
  await buildFrontend();
  await buildBackend();
} else {
  const changedPackagesCmd =
    await $`git diff --name-only ${currentHash} ${latestTag} | grep 'apps/' | cut -d '/' -f 2 | sort -u`;
  changedPackages = changedPackagesCmd.stdout.trim().split('\n');
  if (changedPackages.includes('frontend')) {
    deployCmd = '--only=hosting';
    await buildFrontend();
  }
  if (changedPackages.includes('backend')) {
    deployCmd = '--only=functions';
    await buildBackend();
  }
}

await deployAllowed();
await $`firebase deploy ${deployCmd} --project doerpsmobil-65d16`;

// commit deploy tag
await $`git tag -a v-${format(new Date(), 'dd.MM.yy-HH_mm')} -m ${deployMssg}`;
await $`git push --tags`;

async function buildBackend() {
  await $`pnpm --filter backend i --frozen-lockfile`;
  await $`pnpm --filter backend build`;
}

async function buildFrontend() {
  await $`pnpm --filter frontend i --frozen-lockfile`;
  await $`pnpm --filter frontend build`;
}

async function deployAllowed() {
  const localCommit = await $`git rev-parse main`;
  const remoteCommit = await $`git rev-parse origin/main`;

  if (localCommit.stdout !== remoteCommit.stdout)
    throw Error('push changes before deploying');

  // only from main branch and no changes
  const branch = await $`git rev-parse --abbrev-ref HEAD`;
  if (branch.stdout.trim() !== 'main') throw Error('not on main branch');
  await $`git diff --quiet && git diff --cached --quiet`;
}
