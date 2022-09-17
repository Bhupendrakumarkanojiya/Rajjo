const path = require('path');

module.exports = {
  extends: [ 'eslint:recommended', 'plugin:jest/recommended' ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    document: false,
    jest: true,
    process: true,
    burningGlassToken: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  plugins: [ 'jest' ],
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      settings: {
        'import/resolver': {
          alias: {
            extensions: [ '.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json' ],
            map: [ [ '@app', path.resolve(__dirname, './app') ] ],
          },
        },
      },
      parser: '@typescript-eslint/parser',
      plugins: [ '@typescript-eslint' ],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-empty-function': 1,
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier/@typescript-eslint',
      ],
    },
  ],
};
