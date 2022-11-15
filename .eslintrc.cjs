module.exports = {
    env: {
      node: true,
      es6: true,
      jest: true
    },
    extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: ['prettier'],
    ignorePatterns: ['**/db/**', '**/_v1/**', '**/app/models/_v1/**', '**/docs/**'],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
      'max-len': ['error', 120],
      'no-underscore-dangle': 0,
      'import/no-extraneous-dependencies': 0,
      'import/prefer-default-export': 0,
      'no-unused-expressions': ['error', { allowShortCircuit: true }],
      'no-plusplus': 'off'
    }
  };
  