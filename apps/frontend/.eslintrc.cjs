module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  env: { browser: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
    'no-unused-vars': 0,
  },
};
