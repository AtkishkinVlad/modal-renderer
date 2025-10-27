# @atkvs/event-bus

Легковесная система событий для React приложений с полной поддержкой TypeScript.

## Особенности

- полная поддержка TypeScript
- интуитивный API
- хуки для работы с событиями

## Установка

```bash
npm install @atkvs/event-bus
# или
yarn add @atkvs/event-bus
```

## Быстрый старт

### Базовое использование

```typescript
import { EventBus, createEventBus } from '@atkvs/event-bus';

// Создаем экземпляр Event Bus
const eventBus = createEventBus();

// Подписываемся на событие
const unsubscribe = eventBus.on('user-login', (user) => {
  console.log('Пользователь вошел:', user);
});

// Отправляем событие
eventBus.emit('user-login', { id: 1, name: 'John' });

// Отписываемся
unsubscribe();
```

### Использование с React

```tsx
import React from 'react';
import { useEventBusListener, useEventBusEmitter } from '@atkvs/event-bus';

function UserProfile() {
  const emit = useEventBusEmitter();

  const handleLogin = () => {
    emit('user-login', { id: 1, name: 'John' });
  };

  return <button onClick={handleLogin}>Войти</button>;
}

function NotificationCenter() {
  useEventBusListener('user-login', (user) => {
    console.log('Показать уведомление для:', user.name);
  });

  return <div>Уведомления</div>;
}
```
