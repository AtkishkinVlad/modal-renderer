# E2E Tests Structure

## Обзор

Этот пакет содержит End-to-End тесты для библиотеки modal-renderer, использующие Playwright и интегрированные с Storybook.

## Структура файлов

```
tests/
├── fixtures/
│   └── modal-fixtures.ts          # Fixture с page-objects для удобной работы
├── page-objects/
│   ├── BaseStoryPage.ts           # Базовый класс с общими локаторами и методами
│   ├── SimpleModalPage.ts         # Page Object для Simple Modal историй
│   ├── FormModalPage.ts           # Page Object для Form Modal историй
│   └── ConfirmModalPage.ts        # Page Object для Confirm Modal историй
├── simple-modal.spec.ts           # Тесты для Simple Modal
├── form-modal.spec.ts             # Тесты для Form Modal
├── confirm-modal.spec.ts          # Тесты для Confirm Modal
├── navigation.spec.ts             # Тесты навигации и интеграции
└── storybook.spec.ts              # Интеграционные тесты Storybook
```

## Ключевые особенности

### 1. Fixture с Page Objects
- **modal-fixtures.ts** предоставляет готовые page-objects для каждого типа модалок
- Автоматическая инициализация всех необходимых объектов
- Удобный доступ к `basePage`, `simpleModalPage`, `formModalPage`, `confirmModalPage`

### 2. Базовые локаторы с заголовками
- **BaseStoryPage** содержит общие локаторы для всех модальных окон
- Локаторы для заголовков, описаний, кнопок модалок
- Методы для проверки состояния элементов

### 3. Разделение тестов по типам модалок
- **simple-modal.spec.ts** - тесты простых модалок
- **form-modal.spec.ts** - тесты модалок с формами
- **confirm-modal.spec.ts** - тесты модалок подтверждения
- **navigation.spec.ts** - тесты навигации между историями
- **storybook.spec.ts** - интеграционные тесты

## Использование

### Запуск всех тестов
```bash
npm run test:e2e
```

### Запуск конкретного файла тестов
```bash
npm run test:e2e -- simple-modal.spec.ts
```

### Запуск с UI
```bash
npm run test:e2e:ui
```

### Запуск в headed режиме
```bash
npm run test:e2e:headed
```

## Пример использования fixture

```typescript
import { test, expect } from './fixtures/modal-fixtures';

test('should test simple modal', async ({ simpleModalPage }) => {
  await simpleModalPage.navigateToDefaultStory();
  await simpleModalPage.testBasicModalFlow();
});

test('should test form modal', async ({ formModalPage }) => {
  await formModalPage.navigateToDefaultStory();
  await formModalPage.testFormSubmission('John Doe', 'john@example.com');
});
```

## Браузеры

Тесты запускаются на следующих браузерах:
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Desktop)
- Mobile Chrome
- Mobile Safari

## Конфигурация

Конфигурация Playwright находится в `playwright.config.ts`:
- Автоматический запуск Storybook сервера
- Настройка базового URL для iframe
- Конфигурация скриншотов и видео
- Настройка репортеров
