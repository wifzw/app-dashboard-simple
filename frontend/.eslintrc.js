module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-tabs': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'class-methods-use-this': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-shadow': 'off',
    camelcase: 'off',
    'no-use-before-define': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-non-null-assertion': 'off',
  },
};
