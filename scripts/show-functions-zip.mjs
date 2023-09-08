#!/usr/bin/env zx

// exit if firebase.json not found in pwd dir

// "/" is passed as first argument to minimatch
// so, we need to write pattern from the root of the firebase.json file
// to ignore something ONLY from the root, use "*/file|folder"

$.verbose = false;

const node_modules_path = await $`pnpm root -g`;

const { prepareFunctionsUpload } = require(
  path.join(
    node_modules_path.stdout.trim(),
    'firebase-tools/lib/deploy/functions/prepareFunctionsUpload',
  ),
);

const firebaseConfig = require(path.join(process.cwd(), 'firebase.json'))
  .functions[0];

const { pathToSource } = await prepareFunctionsUpload(
  path.join(process.cwd(), firebaseConfig.source),
  firebaseConfig,
);

const zipPreviewPath = path.join(process.cwd(), `${firebaseConfig.source}-zip`);

await $`unzip -o ${pathToSource} -d ${zipPreviewPath}`;
await $`rm -rf ${pathToSource}`;

echo`\n--------------- hit enter to remove---------------`;
await $`read`;

await $`rm -rf ${zipPreviewPath}`;
