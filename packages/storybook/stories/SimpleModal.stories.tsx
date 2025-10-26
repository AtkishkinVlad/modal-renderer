import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalsProvider, useModals } from '@atkvs/modal-renderer';
import React from 'react';

// Простая модалка для демонстрации
const SimpleModal: React.FC = () => {
  const { closeModal } = useModals();

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2 style={{ marginTop: 0 }}>Простая модалка</h2>
      <p>Это пример простой модалки с базовой функциональностью.</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => closeModal('simple-modal')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

// Компонент для демонстрации
const ModalDemo: React.FC = () => {
  const { openModal, closeAllModals, getOpenModals } = useModals();

  const handleOpenModal = () => {
    const closeModal = openModal({
      id: 'simple-modal',
      component: <SimpleModal />,
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      },
    });

    // Можно использовать возвращенную функцию закрытия
    setTimeout(() => {
      console.log('Автоматическое закрытие через 5 секунд');
      closeModal();
    }, 5000);
  };

  const openModals = getOpenModals();

  return (
    <div>
      <h3>Демонстрация модалок</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleOpenModal}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Открыть модалку
        </button>

        <button
          onClick={closeAllModals}
          disabled={openModals.length === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: openModals.length === 0 ? 0.5 : 1,
          }}
        >
          Закрыть все ({openModals.length})
        </button>
      </div>

      <div
        style={{
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        <strong>Статус:</strong> Открыто модалок: {openModals.length}
        {openModals.length > 0 && (
          <div style={{ marginTop: '5px' }}>
            <strong>ID модалок:</strong>{' '}
            {openModals.map((m) => m.id).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof ModalDemo> = {
  title: 'Modal Renderer/Simple Modal',
  component: ModalDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Простая демонстрация работы с модальными окнами. Модалка автоматически закроется через 5 секунд.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ModalsProvider>
        <Story />
      </ModalsProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ModalDemo>;

export const Default: Story = {
  name: 'Простая модалка',
};

// Компонент для демонстрации с кастомными опциями
const SimpleModalCustomDemo: React.FC = () => {
  const { openModal } = useModals();

  const handleOpenModal = () => {
    openModal({
      id: 'custom-modal',
      component: <SimpleModal />,
      options: {
        closeOnOverlayClick: false,
        closeOnEscape: true,
        animated: true,
        className: 'custom-modal',
        zIndex: 2000,
      },
    });
  };

  return (
    <div>
      <h3>Модалка с кастомными опциями</h3>
      <p>Эта модалка не закрывается при клике вне области.</p>
      <button
        onClick={handleOpenModal}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6f42c1',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Открыть модалку
      </button>
    </div>
  );
};

export const WithCustomOptions: Story = {
  name: 'С кастомными опциями',
  render: () => <SimpleModalCustomDemo />,
};
