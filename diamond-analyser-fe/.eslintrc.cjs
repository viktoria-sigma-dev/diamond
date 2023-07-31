module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'import', 'unused-imports', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'arrow-body-style': 'off',
    'react/jsx-no-bind': 0,
    'react/jsx-props-no-spreading': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'max-len': ['error', { code: 160 }],
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-imports-ts': 2,
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-assertions': 2,
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/ban-types': 0,
    'no-param-reassign': ['error', {props: false}],
    'no-restricted-globals': [
      'error',
      {
        name: 'event',
        message: 'Use local parameter instead.',
      },
      {
        name: 'fdescribe',
        message: 'Do not commit fdescribe. Use describe instead.',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-extraneous-dependencies': ['error', {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false, "packageDir": "./"}],
    'no-plusplus': 'off',
  }
};
