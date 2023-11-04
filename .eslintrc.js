module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:perfectionist/recommended-natural',
    'airbnb',
    'airbnb-typescript',
    'next',
    'prettier',
  ],
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'zod'
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-restricted-exports': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'react/function-component-definition': 'off',
    'react/display-name': 'off',
    'react/button-has-type': 'off', // allow reset button
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
