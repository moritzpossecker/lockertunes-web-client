import react from 'eslint-plugin-react'
import tsEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['src/components/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      '@typescript-eslint': tsEslint
    },
    rules: {
      ...prettier.rules,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'variableLike',
          'format': ['camelCase'],
          'leadingUnderscore': 'allow',
        },
        {
          'selector': 'variable',
          'modifiers': ['const'],
          'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          'selector': 'function',
          'format': ['camelCase'],
        },
        {
          'selector': 'class',
          'format': ['PascalCase'],
        },
        {
          'selector': 'typeAlias',
          'format': ['PascalCase'],
        },
        {
          'selector': 'interface',
          'format': ['PascalCase'],
          'custom': {
            'regex': '^I[A-Z]',
            'match': true,
          },
        },
        {
          'selector': 'enum',
          'format': ['PascalCase'],
        },
        {
          'selector': 'enumMember',
          'format': ['UPPER_CASE'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@/semi': ['error', 'never'],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
  },
  prettier,
]
