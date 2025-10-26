# Modal Renderer v2.0.0

Современная библиотека для управления модальными окнами в React с поддержкой React Portal, TypeScript и продвинутыми возможностями.

## Установка

```bash
npm install @atkvs/modal-renderer
# или
yarn add @atkvs/modal-renderer
```

## Быстрый старт

### 1. Оберните приложение в провайдер

```tsx
import React from 'react';
import { ModalsProvider } from '@atkvs/modal-renderer';
import '@atkvs/modal-renderer/dist/styles.css'; // Опционально для стилей

function App() {
  return (
    <ModalsProvider>
      <YourApp />
    </ModalsProvider>
  );
}
```

### 2. Используйте хуки для управления модалками

```tsx
import React from 'react';
import { useModals, useModal } from '@atkvs/modal-renderer';

function MyComponent() {
  const { openModal, closeModal } = useModals();
  
  const handleOpenModal = () => {
    openModal({
      id: 'my-modal',
      component: <MyModalComponent />,
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      },
    });
  };

  return (
    <button onClick={handleOpenModal}>
      Открыть модалку
    </button>
  );
}
```

## API Reference

### ModalsProvider

Основной провайдер для управления модалками.

```tsx
interface ModalsProviderProps {
  children: React.ReactNode;
  container?: HTMLElement; // Контейнер для рендера (по умолчанию document.body)
  baseZIndex?: number; // Базовый z-index (по умолчанию 1000)
  defaultOptions?: ModalConfig['options']; // Глобальные настройки
}
```

### useModals

Основной хук для управления модалками.

```tsx
const {
  openModal,           // Открыть модалку
  closeModal,          // Закрыть модалку по ID
  closeLastOpenedModal, // Закрыть последнюю модалку
  closeAllModals,      // Закрыть все модалки
  getOpenModals,       // Получить список открытых модалок
  isModalOpen,         // Проверить, открыта ли модалка
} = useModals();
```

### useModal

Хук для управления конкретной модалкой.

```tsx
const { open, close, isOpen } = useModal('modal-id');
```

### useCreateModal

Хук для создания модалки с автоматическим ID.

```tsx
const createModal = useCreateModal();
const modalId = createModal({
  component: <MyComponent />,
  options: { animated: true }
});
```

## Примеры использования

Хранятся внутри пакета storybook

## Стилизация

### CSS переменные

```css
:root {
  --modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --modal-bg: white;
  --modal-border-radius: 8px;
  --modal-padding: 24px;
  --modal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 🔧 Продвинутые возможности

### Глобальная конфигурация

```tsx
<ModalsProvider
  baseZIndex={2000}
  defaultOptions={{
    closeOnOverlayClick: false,
    animated: true,
    className: 'global-modal',
  }}
>
  <App />
</ModalsProvider>
```

## 🤝 Contributing

Мы приветствуем вклад в развитие библиотеки! Пожалуйста, ознакомьтесь с нашими [правилами контрибуции](CONTRIBUTING.md).

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для подробностей.