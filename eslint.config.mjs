// eslint.config.mjs
// Flat config (ESLint 9+) — https://eslint.org/docs/latest/use/configure/configuration-files
//
// Note: eslint-plugin-tailwindcss is intentionally excluded — it imports
// tailwindcss/resolveConfig which does not exist in Tailwind v4's package
// exports. Class ordering is handled by prettier-plugin-tailwindcss instead.

import { FlatCompat } from '@eslint/eslintrc'
import pluginImport from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// FlatCompat bridges legacy shareable configs (next/core-web-vitals) into flat config
const compat = new FlatCompat({ baseDirectory: __dirname })

export default tseslint.config(
  // ── Ignored paths ─────────────────────────────────────────────────────────
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'dist/**', 'build/**', 'archive/**'],
  },

  // ── Next.js + Core Web Vitals (via compat shim) ───────────────────────────
  ...compat.extends('next/core-web-vitals'),

  // ── TypeScript type-checked rules ─────────────────────────────────────────
  ...tseslint.configs.recommendedTypeChecked,

  // ── Main rule set ─────────────────────────────────────────────────────────
  {
    plugins: {
      import: pluginImport,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // ── General code quality ───────────────────────────────────────────────
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-implicit-coercion': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      complexity: ['warn', { max: 10 }],
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // ── TypeScript-specific ────────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
        },
      ],

      // ── React ─────────────────────────────────────────────────────────────
      'react/self-closing-comp': 'error',

      // ── Import ordering ───────────────────────────────────────────────────
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // ── Relax rules for config files at project root ──────────────────────────
  {
    files: ['*.config.{ts,mjs,js}', 'postcss.config.mjs'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
)
