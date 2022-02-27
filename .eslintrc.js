// @ts-check

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:typescript-sort-keys/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json',
  },
  plugins: ['sort-destructure-keys', 'sort-keys-fix', 'typescript-sort-keys'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-definitions': [2, 'type'],
    '@typescript-eslint/naming-convention': [
      2,
      {
        // "type" naming should be PascalCase
        custom: {
          match: false,
          regex: 'send|start|find',
        },
        format: ['PascalCase'],
        selector: 'typeAlias',
      },
    ],
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-misused-promises': 2,
    '@typescript-eslint/no-useless-constructor': 2,
    '@typescript-eslint/prefer-readonly': 2,
    '@typescript-eslint/require-await': 2,
    camelcase: 0,
    // TODO can use?
    // 'import/no-default-export': 2,
    'jest/prefer-strict-equal': 2,
    'no-console': 0,
    'no-restricted-syntax': [
      2,
      {
        message:
          'Do not use `enum`. Use `Plain Object` or `Literal Types` instead.',
        selector: 'TSEnumDeclaration',
      },
    ],
    // note you must disable the base rule as it can report incorrect errors
    'no-useless-constructor': 0,
    'prefer-template': 2,
    'require-await': 0,
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-keys-fix/sort-keys-fix': 2,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
    yoda: [2, 'never', { onlyEquality: true }],
  },
}

module.exports = config
