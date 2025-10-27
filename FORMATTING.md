# Code Formatting with Prettier

## Обзор

Проект использует Prettier для автоматического форматирования кода во всех пакетах монорепозитория.

## Конфигурация

Конфигурация Prettier находится в `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## Команды

### Корневые команды

```bash
# Форматировать все файлы
npm run format

# Проверить форматирование
npm run format:check

# Линтинг всех пакетов
npm run lint

# Исправить ошибки линтинга
npm run lint:fix
```

### Команды для отдельных пакетов

```bash
# Modal Renderer
cd packages/modal-renderer
npm run format
npm run format:check
npm run lint
npm run lint:fix

# Storybook
cd packages/storybook
npm run format
npm run format:check
npm run lint
npm run lint:fix

# E2E Tests
cd packages/e2e-tests
npm run format
npm run format:check
```

## Pre-commit хуки

Lefthook настроен для автоматической проверки форматирования и линтинга при коммите:

- **lint** - проверка ESLint во всех пакетах
- **format-check** - проверка форматирования Prettier

Если проверки не проходят, коммит будет отклонен.

## Игнорируемые файлы

Файлы, которые не форматируются Prettier, указаны в `.prettierignore`:

- `node_modules/`
- `dist/`, `build/`, `out/`
- `storybook-static/`
- `test-results/`, `playwright-report/`
- `coverage/`
- Лок-файлы (`package-lock.json`, `yarn.lock`)
- И другие временные/сгенерированные файлы

## Интеграция с IDE

Рекомендуется настроить ваш редактор для автоматического форматирования при сохранении:

### VS Code

1. Установите расширение "Prettier - Code formatter"
2. Добавьте в настройки:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### WebStorm/IntelliJ

1. Включите "Reformat code" в настройках
2. Выберите Prettier как форматтер по умолчанию
3. Включите ESLint интеграцию

## Troubleshooting

### Если форматирование не работает

1. Проверьте, что Prettier установлен: `npm list prettier`
2. Проверьте конфигурацию: `npx prettier --check .`
3. Попробуйте отформатировать вручную: `npm run format`

### Если pre-commit хук не работает

1. Проверьте установку lefthook: `npx lefthook install`
2. Проверьте конфигурацию: `cat lefthook.yml`
3. Запустите хук вручную: `npx lefthook run pre-commit`
