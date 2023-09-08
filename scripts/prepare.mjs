#!/usr/bin/env zx

await $`echo ./git-hooks/pre-commit.mjs >.git/hooks/pre-commit`;

await $`chmod +x .git/hooks/pre-commit`;

await $`find . -type f -name "*.mjs" -exec chmod +x {} \\;`;
