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
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
  },
};
