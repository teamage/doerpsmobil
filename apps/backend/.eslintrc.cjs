module.exports = {
  root: true,
  env: {
    node: true,
  },
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
