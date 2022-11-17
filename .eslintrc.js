module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next/core-web-vitals', 'plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    /**
     * @inner: turn on errors for missing imports
     * @see: https://www.npmjs.com/package/eslint-import-resolver-typescript
     */
    'import/no-unresolved': 'error',
    /**
     * @inner: 제시한 extension의 생략을 허용한다.
     * @see: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
     */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    /**
     *
     */
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    /**
     * @inner: React를 끄고 싶지 않으나, 해당 에러가 나옴.
     * @see: https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    /**
     * @inner: Enum을 사용할 시 no-shadow 옵션이 acitve되어 에러가 발생함.
     * @see: https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    /**
     * @inner: `index.ts`에서 한 번에 가져오고 싶어서 이를 off 한다. 이는 트리쉐이킹을 용이하게 하기 위함이다. (Axel Rauschmayer commented)
     * @see: https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65
     */
    'import/prefer-default-export': 'off',

    /**
     * @inner: 이 패턴은 typescript-eslint에서 인정하고 허용되는 규칙이다.
     * @see: https://typescript-eslint.io/rules/no-unused-vars/
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'consistent-return': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        /**
         * @inner
         * always try to resolve types under `<root>@types` directory
         * even it doesn't contain any source code, like `@types/unist`,
         * @see: https://www.npmjs.com/package/eslint-import-resolver-typescript
         */
        alwaysTryTypes: true,
      },
      project: ['./tsconfig.json'],
    },
  },
  /**
   * typescript-eslint에서는 `no-undef` 옵션이 필요 없다. 이는 TS-eslint에서도 권장한다.
   * @see:
   * https://github.com/Chatie/eslint-config/issues/45
   * https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
   */
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
