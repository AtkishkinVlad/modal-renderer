import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalsProvider, useModals, useModal, useCreateModal } from '../index';
import { beforeEach, describe, expect, test } from 'vitest';

// Тестовый компонент модалки
const TestModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
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
const FormModal: React.FC<{
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
const TestApp: React.FC = () => {
  const { openModal, closeModal, closeAllModals, getOpenModals, isModalOpen } =
    useModals();
  const { close: closeTestModal, isOpen } = useModal('test-modal');
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

      <button data-testid="close-test-modal" onClick={closeTestModal}>
        Close Test Modal
      </button>

      <button data-testid="close-all" onClick={closeAllModals}>
        Close All
      </button>

      <div data-testid="modal-status">
        {isModalOpen('test-modal') ? 'Open' : 'Closed'}
      </div>

      <div data-testid="modal-count">{getOpenModals().length}</div>

      <div data-testid="test-modal-status">{isOpen ? 'Open' : 'Closed'}</div>
    </div>
  );
};

// Компонент с провайдером
const AppWithProvider: React.FC = () => (
  <ModalsProvider>
    <TestApp />
  </ModalsProvider>
);

describe('Modal Renderer', () => {
  beforeEach(() => {
    // Очищаем DOM перед каждым тестом
    document.body.innerHTML = '';
  });

  test('renders app without modals initially', () => {
    render(<AppWithProvider />);

    expect(screen.getByTestId('modal-status')).toHaveTextContent('Closed');
    expect(screen.getByTestId('modal-count')).toHaveTextContent('0');
    expect(screen.getByTestId('test-modal-status')).toHaveTextContent('Closed');
  });

  test('opens modal when open button is clicked', async () => {
    render(<AppWithProvider />);

    fireEvent.click(screen.getByTestId('open-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    expect(screen.getByTestId('modal-status')).toHaveTextContent('Open');
    expect(screen.getByTestId('modal-count')).toHaveTextContent('1');
    expect(screen.getByTestId('test-modal-status')).toHaveTextContent('Open');
  });

  test('closes modal when close button is clicked', async () => {
    render(<AppWithProvider />);

    // Открываем модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    // Закрываем модалку
    fireEvent.click(screen.getByTestId('close-modal'));

    await waitFor(() => {
      expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('modal-status')).toHaveTextContent('Closed');
    expect(screen.getByTestId('modal-count')).toHaveTextContent('0');
  });

  test('closes modal when close button inside modal is clicked', async () => {
    render(<AppWithProvider />);

    // Открываем модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    // Закрываем модалку через кнопку внутри
    fireEvent.click(screen.getByTestId('close-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument();
    });
  });

  test('closes all modals when close all button is clicked', async () => {
    render(<AppWithProvider />);

    // Открываем несколько модалок
    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-count')).toHaveTextContent('2');
    });

    // Закрываем все модалки
    fireEvent.click(screen.getByTestId('close-all'));

    await waitFor(() => {
      expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('form-modal')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('modal-count')).toHaveTextContent('0');
  });

  test('useModal hook works correctly', async () => {
    render(<AppWithProvider />);

    // Открываем модалку через хук
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    // Закрываем модалку через хук
    fireEvent.click(screen.getByTestId('close-test-modal'));

    await waitFor(() => {
      expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument();
    });
  });

  test('useCreateModal hook works correctly', async () => {
    render(<AppWithProvider />);

    // Создаем модалку через хук
    fireEvent.click(screen.getByTestId('create-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    expect(screen.getByTestId('modal-count')).toHaveTextContent('1');
  });

  test('form modal works correctly', async () => {
    const user = userEvent.setup();
    render(<AppWithProvider />);

    // Открываем модалку с формой
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('form-modal')).toBeInTheDocument();
    });

    // Заполняем форму
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');

    expect(screen.getByTestId('name-input')).toHaveValue('John Doe');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');

    // Отправляем форму
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('form-modal')).not.toBeInTheDocument();
    });
  });

  test('modal with custom options works correctly', async () => {
    render(<AppWithProvider />);

    // Открываем модалку с формой (которая имеет closeOnOverlayClick: false по умолчанию)
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('form-modal')).toBeInTheDocument();
    });

    // Пытаемся закрыть через кнопку отмены
    fireEvent.click(screen.getByTestId('cancel-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('form-modal')).not.toBeInTheDocument();
    });
  });

  test('multiple modals can be opened simultaneously', async () => {
    render(<AppWithProvider />);

    // Открываем первую модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    });

    // Открываем вторую модалку
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitFor(() => {
      expect(screen.getByTestId('form-modal')).toBeInTheDocument();
    });

    // Проверяем, что обе модалки открыты
    expect(screen.getByTestId('modal-count')).toHaveTextContent('2');
    expect(screen.getByTestId('test-modal')).toBeInTheDocument();
    expect(screen.getByTestId('form-modal')).toBeInTheDocument();
  });
});
