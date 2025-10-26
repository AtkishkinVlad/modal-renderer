import { type ReactElement, type ReactNode } from 'react';

// Базовые типы для модалок
export type ModalId = string;

export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen' | 'auto';

export type ModalAnimation = 'fade' | 'slide' | 'scale' | 'none';

// Расширенная конфигурация модалки
export interface ExtendedModalConfig {
  /** Уникальный идентификатор модалки */
  id: ModalId;
  /** Компонент для рендера */
  component: ReactElement;
  /** Заголовок модалки */
  title?: string;
  /** Описание модалки */
  description?: string;
  /** Конфигурация поведения модалки */
  options?: {
    /** Закрывать ли модалку при клике вне её области */
    closeOnOverlayClick?: boolean;
    /** Закрывать ли модалку при нажатии ESC */
    closeOnEscape?: boolean;
    /** Показывать ли анимацию при открытии/закрытии */
    animated?: boolean;
    /** Тип анимации */
    animation?: ModalAnimation;
    /** CSS класс для кастомной стилизации */
    className?: string;
    /** Порядок отображения (z-index) */
    zIndex?: number;
    /** Показывать ли модалку поверх всех остальных */
    alwaysOnTop?: boolean;
    /** Позиция модалки */
    position?: ModalPosition;
    /** Размер модалки */
    size?: ModalSize;
    /** Показывать ли кнопку закрытия */
    showCloseButton?: boolean;
    /** Кастомная кнопка закрытия */
    closeButton?: ReactNode;
    /** Блокировать ли скролл страницы */
    blockScroll?: boolean;
    /** Фокус на модалке при открытии */
    autoFocus?: boolean;
    /** Восстанавливать фокус после закрытия */
    restoreFocus?: boolean;
  };
  /** Данные для передачи в компонент */
  data?: unknown;
  /** Callback при закрытии модалки */
  onClose?: () => void;
  /** Callback при открытии модалки */
  onOpen?: () => void;
  /** Callback при изменении состояния */
  onStateChange?: (isOpen: boolean) => void;
}

// Типы для событий модалок
export type ModalEvent = 'open' | 'close' | 'focus' | 'blur';

export type ModalEventListener = (event: ModalEvent, modalId: ModalId) => void;

// Конфигурация провайдера
export interface ModalsProviderConfig {
  /** Контейнер для рендера модалок */
  container?: HTMLElement;
  /** Базовый z-index для модалок */
  baseZIndex?: number;
  /** Глобальные настройки по умолчанию */
  defaultOptions?: ExtendedModalConfig['options'];
  /** Максимальное количество одновременно открытых модалок */
  maxModals?: number;
  /** Автоматически закрывать старые модалки при превышении лимита */
  autoCloseOldModals?: boolean;
}

// Результат операций с модалками
export type ModalOperationResult = {
  success: boolean;
  modalId?: ModalId;
  error?: string;
};

// Статистика модалок
export interface ModalStats {
  totalOpened: number;
  currentlyOpen: number;
  averageOpenTime: number;
  mostUsedModal: ModalId | null;
}

// Утилиты для работы с модалками
export const ModalUtils = {
  /** Генерация уникального ID */
  generateId: (prefix = 'modal'): ModalId => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /** Проверка валидности ID модалки */
  isValidId: (id: unknown): id is ModalId => {
    return typeof id === 'string' && id.length > 0;
  },

  /** Создание дефолтной конфигурации */
  createDefaultConfig: (): ExtendedModalConfig['options'] => ({
    closeOnOverlayClick: true,
    closeOnEscape: true,
    animated: true,
    animation: 'fade',
    position: 'center',
    size: 'medium',
    showCloseButton: true,
    blockScroll: true,
    autoFocus: true,
    restoreFocus: true,
  }),

  /** Получение z-index для модалки */
  getZIndex: (
    baseZIndex: number,
    index: number,
    alwaysOnTop = false,
  ): number => {
    return alwaysOnTop ? baseZIndex + 10000 : baseZIndex + index;
  },
} as const;
