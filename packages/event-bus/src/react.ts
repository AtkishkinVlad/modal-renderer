import { useEffect, useRef, useCallback } from 'react';
import { EventBus, type EventListener } from './index';

/**
 * Хук для подписки на события Event Bus
 * @param eventBus - экземпляр Event Bus (по умолчанию глобальный)
 * @param event - название события
 * @param listener - функция-обработчик
 * @param deps - зависимости для переподписки
 */
export function useEventBusListener<T = any>(
  eventBus: EventBus,
  event: string,
  listener: EventListener<T>,
  deps: any[] = [],
): void {
  const listenerRef = useRef(listener);

  // Обновляем ссылку на listener при изменении зависимостей
  useEffect(() => {
    listenerRef.current = listener;
  }, deps);

  useEffect(() => {
    const wrappedListener: EventListener<T> = (payload) => {
      listenerRef.current(payload);
    };

    const unsubscribe = eventBus.on(event, wrappedListener);

    return unsubscribe;
  }, [eventBus, event]);
}

/**
 * Хук для отправки событий через Event Bus
 * @param eventBus - экземпляр Event Bus (по умолчанию глобальный)
 * @returns функция для отправки событий
 */
export function useEventBusEmitter(eventBus: EventBus) {
  return useCallback(
    <T = any>(event: string, payload: T) => {
      eventBus.emit(event, payload);
    },
    [eventBus],
  );
}

/**
 * Хук для работы с Event Bus (подписка + отправка)
 * @param eventBus - экземпляр Event Bus (по умолчанию глобальный)
 * @returns объект с методами для работы с событиями
 */
export function useEventBus(eventBus: EventBus) {
  const emit = useEventBusEmitter(eventBus);

  return {
    emit,
    on: eventBus.on.bind(eventBus),
    off: eventBus.off.bind(eventBus),
    removeAllListeners: eventBus.removeAllListeners.bind(eventBus),
    getListenerCount: eventBus.getListenerCount.bind(eventBus),
    hasListeners: eventBus.hasListeners.bind(eventBus),
    getEventNames: eventBus.getEventNames.bind(eventBus),
  };
}
