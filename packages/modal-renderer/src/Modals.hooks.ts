import { useContext, useCallback } from 'react';
import { ModalsContext, type ModalConfig } from './Modals.context';

export const useModals = () => {
  return useContext(ModalsContext);
};

// Хук для удобного управления конкретной модалкой
export const useModal = (id: string) => {
  const { openModal, closeModal, isModalOpen } = useModals();

  const open = useCallback(
    (modal: Omit<ModalConfig, 'id'>) => {
      return openModal({ ...modal, id });
    },
    [openModal, id],
  );

  const close = useCallback(() => {
    closeModal(id);
  }, [closeModal, id]);

  const isOpen = isModalOpen(id);

  return {
    open,
    close,
    isOpen,
  };
};

// Хук для создания модалки с автоматическим ID
export const useCreateModal = () => {
  const { openModal } = useModals();

  const createModal = useCallback(
    (modal: Omit<ModalConfig, 'id'>) => {
      const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const closeModal = openModal({ ...modal, id });
      return { id, closeModal };
    },
    [openModal],
  );

  return createModal;
};
