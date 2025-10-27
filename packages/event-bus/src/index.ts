/**
 * Event Bus - легковесная система событий для React приложений
 *
 * Предоставляет типизированную систему pub-sub для обмена сообщениями
 * между компонентами без ререндеров.
 */

export type EventListener<T = any> = (payload: T) => void;

/**
 * Основной класс Event Bus
 */
export class EventBus {
  private listeners = new Map<string, Set<EventListener>>();

  /**
   * Подписаться на событие
   * @param event - название события
   * @param listener - функция-обработчик
   * @returns функция для отписки
   */
  on<T = any>(event: string, listener: EventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener);

    // Возвращаем функцию для отписки
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  /**
   * Отправить событие
   * @param event - название события
   * @param payload - данные события
   */
  emit<T = any>(event: string, payload: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(payload));
    }
  }

  /**
   * Отписаться от события
   * @param event - название события
   * @param listener - функция-обработчик
   */
  off(event: string, listener: EventListener): void {
    this.listeners.get(event)?.delete(listener);
  }

  /**
   * Удалить все подписки
   * @param event - название события (опционально)
   */
  removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Получить количество подписчиков на событие
   * @param event - название события
   * @returns количество подписчиков
   */
  getListenerCount(event: string): number {
    return this.listeners.get(event)?.size || 0;
  }

  /**
   * Проверить, есть ли подписчики на событие
   * @param event - название события
   * @returns true, если есть подписчики
   */
  hasListeners(event: string): boolean {
    return this.getListenerCount(event) > 0;
  }

  /**
   * Получить список всех событий с подписчиками
   * @returns массив названий событий
   */
  getEventNames(): string[] {
    return Array.from(this.listeners.keys());
  }
}

/**
 * Глобальный экземпляр Event Bus
 */
export const eventBus = new EventBus();

/**
 * Создать новый экземпляр Event Bus
 * @returns новый экземпляр EventBus
 */
export const createEventBus = (): EventBus => new EventBus();

// Экспортируем React хуки
export * from './react';
