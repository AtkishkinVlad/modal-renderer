import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'test-results', 'playwright-report'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
        ...globals.browser, // Для Playwright тестов
      },
    },
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
      // Дополнительные правила для лучшего качества кода
      'playwright/expect-expect': 'off', // Отключаем, так как у нас есть expect в fixture
      'playwright/max-nested-describe': ['error', { max: 3 }],
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-nested-step': 'error',
      'playwright/no-networkidle': 'warn', // Предупреждение вместо ошибки
      'playwright/no-page-pause': 'error',
      'playwright/no-restricted-matchers': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-useless-await': 'error',
      'playwright/no-useless-not': 'error',
      'playwright/no-wait-for-timeout': 'warn', // Предупреждение вместо ошибки
      'playwright/prefer-lowercase-title': 'warn', // Предупреждение вместо ошибки
      'playwright/prefer-strict-equal': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-count': 'error',
      'playwright/require-top-level-describe': 'error',
      'playwright/valid-describe-callback': 'error',
      'playwright/valid-expect': 'error',
      'playwright/valid-title': 'error',
      // TypeScript правила
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-undef': 'off', // TypeScript обрабатывает это
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      // Специальные правила для тестовых файлов
      'playwright/max-nested-describe': ['error', { max: 4 }],
      'playwright/no-skipped-test': 'error', // В тестах не должно быть пропущенных тестов
      'playwright/no-networkidle': 'off', // Разрешаем в тестах
      'playwright/no-wait-for-timeout': 'off', // Разрешаем в тестах
    },
  },
);
