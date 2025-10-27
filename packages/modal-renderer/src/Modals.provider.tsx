import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ModalsContext, type ModalConfig } from './Modals.context';

export type ModalsProviderProps = PropsWithChildren<{
  /** Контейнер для рендера модалок (по умолчанию document.body) */
  container?: HTMLElement;
  /** Базовый z-index для модалок */
  baseZIndex?: number;
  /** Глобальные настройки по умолчанию */
  defaultOptions?: ModalConfig['options'];
}>;

export const ModalsProvider: FC<ModalsProviderProps> = ({
  children,
  container,
  baseZIndex = 1000,
  defaultOptions = {},
}) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  // Инициализация контейнера
  useEffect(() => {
    containerRef.current = container || document.body;
  }, [container]);

  // Генерация уникального ID
  const generateId = useCallback(() => {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Закрытие модалки по ID
  const closeModal = useCallback((id: string) => {
    setModals((prevModals: ModalConfig[]) => {
      const modal = prevModals.find((m: ModalConfig) => m.id === id);
      if (modal?.onClose) {
        modal.onClose();
      }
      return prevModals.filter((m: ModalConfig) => m.id !== id);
    });
  }, []);

  // Открытие модалки
  const openModal = useCallback(
    (modal: ModalConfig) => {
      const modalWithId = {
        ...modal,
        id: modal.id || generateId(),
        options: {
          closeOnOverlayClick: true,
          closeOnEscape: true,
          animated: true,
          zIndex: baseZIndex,
          ...defaultOptions,
          ...modal.options,
        },
      };

      setModals((prevModals: ModalConfig[]) => {
        // Если модалка с таким ID уже существует, заменяем её
        const existingIndex = prevModals.findIndex(
          (m: ModalConfig) => m.id === modalWithId.id,
        );
        if (existingIndex !== -1) {
          const newModals = [...prevModals];
          newModals[existingIndex] = modalWithId;
          return newModals;
        }
        return [...prevModals, modalWithId];
      });

      // Возвращаем функцию закрытия для этой конкретной модалки
      return () => closeModal(modalWithId.id);
    },
    [generateId, baseZIndex, defaultOptions, closeModal],
  );

  // Закрытие последней модалки
  const closeLastOpenedModal = useCallback(() => {
    setModals((prevModals: ModalConfig[]) => {
      if (prevModals.length === 0) return prevModals;
      const lastModal = prevModals[prevModals.length - 1];
      if (lastModal?.onClose) {
        lastModal.onClose();
      }
      return prevModals.slice(0, -1);
    });
  }, []);

  // Закрытие всех модалок
  const closeAllModals = useCallback(() => {
    setModals((prevModals: ModalConfig[]) => {
      prevModals.forEach((modal: ModalConfig) => {
        if (modal.onClose) {
          modal.onClose();
        }
      });
      return [];
    });
  }, []);

  // Получение списка открытых модалок
  const getOpenModals = useCallback(() => {
    return [...modals];
  }, [modals]);

  // Проверка открытости модалки
  const isModalOpen = useCallback(
    (id: string) => {
      return modals.some((modal: ModalConfig) => modal.id === id);
    },
    [modals],
  );

  // Обработка нажатия ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const topModal = modals[modals.length - 1];
        if (topModal?.options?.closeOnEscape) {
          closeModal(topModal.id);
        }
      }
    };

    if (modals.length > 0) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [modals, closeModal]);

  // Блокировка скролла при открытых модалках
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [modals.length]);

  // Рендер модалок через Portal
  const renderedModals = useMemo(() => {
    if (!containerRef.current) return null;

    return modals.map((modal: ModalConfig, index: number) => {
      const zIndex = modal.options?.alwaysOnTop
        ? baseZIndex + 10000
        : (modal.options?.zIndex || baseZIndex) + index;

      return createPortal(
        <ModalWrapper
          key={modal.id}
          modal={modal}
          zIndex={zIndex}
          onClose={() => closeModal(modal.id)}
        />,
        containerRef.current!,
      );
    });
  }, [modals, baseZIndex, closeModal]);

  const publicApi = useMemo(
    () => ({
      openModal,
      closeModal,
      closeLastOpenedModal,
      closeAllModals,
      getOpenModals,
      isModalOpen,
    }),
    [
      openModal,
      closeModal,
      closeLastOpenedModal,
      closeAllModals,
      getOpenModals,
      isModalOpen,
    ],
  );

  return (
    <ModalsContext.Provider value={publicApi}>
      {children}
      {renderedModals}
    </ModalsContext.Provider>
  );
};

// Компонент-обёртка для модалки
type ModalWrapperProps = {
  modal: ModalConfig;
  zIndex: number;
  onClose: () => void;
};

const ModalWrapper: FC<ModalWrapperProps> = ({ modal, zIndex, onClose }) => {
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        event.target === event.currentTarget &&
        modal.options?.closeOnOverlayClick
      ) {
        onClose();
      }
    },
    [modal.options?.closeOnOverlayClick, onClose],
  );

  return (
    <div
      className={`modal-overlay ${modal.options?.className || ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex,
        ...(modal.options?.animated && {
          animation: 'modalFadeIn 0.2s ease-out',
        }),
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content"
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          ...(modal.options?.animated && {
            animation: 'modalSlideIn 0.2s ease-out',
          }),
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {modal.component}
      </div>
    </div>
  );
};
