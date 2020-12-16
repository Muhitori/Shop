module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.base.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'standard', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'prettier/standard',
    'prettier-standard/lib/base',
    'plugin:jest/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        printWidth: 80,
        tabWidth: 2,
        parser: 'typescript',
        trailingComma: 'none',
        jsxBracketSameLine: false,
        endOfLine: 'auto',
        'space-before-function-paren': 'off'
      }
    ]
  }
}
