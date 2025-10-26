import React from 'react';
import { useModals, useCreateModal } from '../index';

// Тестовый компонент модалки
export const TestModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { closeModal } = useModals();

  return (
    <div data-testid="test-modal">
      <h2>Test Modal</h2>
      <p>This is a test modal</p>
      <button
        data-testid="close-button"
        onClick={() => {
          closeModal('test-modal');
          onClose?.();
        }}
      >
        Close
      </button>
    </div>
  );
};

// Тестовый компонент с формой
export const FormModal: React.FC<{
  onSubmit: (data: { name: string; email: string }) => void;
}> = ({ onSubmit }) => {
  const { closeModal } = useModals();
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    closeModal('form-modal');
  };

  return (
    <form data-testid="form-modal" onSubmit={handleSubmit}>
      <h2>Form Modal</h2>
      <input
        data-testid="name-input"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        data-testid="email-input"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
      <button
        data-testid="cancel-button"
        type="button"
        onClick={() => closeModal('form-modal')}
      >
        Cancel
      </button>
    </form>
  );
};

// Основной тестовый компонент
export const TestApp: React.FC = () => {
  const { openModal, closeModal, closeAllModals, getOpenModals, isModalOpen } =
    useModals();
  const createModal = useCreateModal();

  const handleOpenSimpleModal = () => {
    openModal({
      id: 'test-modal',
      component: <TestModal />,
    });
  };

  const handleOpenFormModal = () => {
    openModal({
      id: 'form-modal',
      component: <FormModal onSubmit={console.log} />,
    });
  };

  const handleCreateModal = () => {
    createModal({
      component: <TestModal />,
    });
  };

  return (
    <div>
      <button data-testid="open-modal" onClick={handleOpenSimpleModal}>
        Open Modal
      </button>

      <button data-testid="open-form-modal" onClick={handleOpenFormModal}>
        Open Form Modal
      </button>

      <button data-testid="create-modal" onClick={handleCreateModal}>
        Create Modal
      </button>

      <button
        data-testid="close-modal"
        onClick={() => closeModal('test-modal')}
      >
        Close Modal
      </button>

      <button data-testid="close-all" onClick={closeAllModals}>
        Close All Modals
      </button>

      <div data-testid="modal-status">
        {getOpenModals().length > 0 ? 'Open' : 'Closed'}
      </div>

      <div data-testid="modal-count">{getOpenModals().length}</div>

      <div data-testid="test-modal-status">
        {isModalOpen('test-modal') ? 'Open' : 'Closed'}
      </div>
    </div>
  );
};

// Компонент с провайдером для тестов
export const AppWithProvider: React.FC = () => (
  <div>
    <TestApp />
  </div>
);
