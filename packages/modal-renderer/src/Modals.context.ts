import { createContext, type ReactElement } from 'react';

export type ModalConfig = {
  /** Уникальный идентификатор модалки */
  id: string;
  /** Компонент для рендера */
  component: ReactElement;
  /** Конфигурация поведения модалки */
  options?: {
    /** Закрывать ли модалку при клике вне её области */
    closeOnOverlayClick?: boolean;
    /** Закрывать ли модалку при нажатии ESC */
    closeOnEscape?: boolean;
    /** Показывать ли анимацию при открытии/закрытии */
    animated?: boolean;
    /** CSS класс для кастомной стилизации */
    className?: string;
    /** Порядок отображения (z-index) */
    zIndex?: number;
    /** Показывать ли модалку поверх всех остальных */
    alwaysOnTop?: boolean;
  };
  /** Данные для передачи в компонент */
  data?: unknown;
  /** Callback при закрытии модалки */
  onClose?: () => void;
};

export type ModalsContextModel = {
  /** Открыть модалку и получить функцию закрытия */
  openModal: (modal: ModalConfig) => () => void;
  /** Закрыть модалку по ID */
  closeModal: (id: string) => void;
  /** Закрыть последнюю открытую модалку */
  closeLastOpenedModal: () => void;
  /** Закрыть все модалки */
  closeAllModals: () => void;
  /** Получить список открытых модалок */
  getOpenModals: () => ModalConfig[];
  /** Проверить, открыта ли модалка */
  isModalOpen: (id: string) => boolean;
};

export const ModalsContext = createContext<ModalsContextModel>({
  openModal: () => () => {},
  closeModal: () => {},
  closeLastOpenedModal: () => {},
  closeAllModals: () => {},
  getOpenModals: () => [],
  isModalOpen: () => false,
});
