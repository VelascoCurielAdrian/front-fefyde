module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/function-component-definition': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    curly: 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
  },
};
