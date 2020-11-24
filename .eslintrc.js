module.exports = {
  root:true,
  env: {
    node: true
  },
  parser: "@typescript-eslint/parser",
  plugins:['@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}