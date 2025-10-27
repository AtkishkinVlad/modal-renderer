import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalsProvider, useModals } from '@atkvs/modal-renderer';
import React from 'react';

// Утилитарные стили для кнопок
const buttonStyles = {
  primary: {
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  secondary: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  success: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  info: {
    padding: '10px 20px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  warning: {
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: '#212529',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  danger: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
};

const handleButtonHover = (
  e: React.MouseEvent<HTMLButtonElement>,
  variant: keyof typeof buttonStyles,
) => {
  const button = e.currentTarget;
  const baseColor = buttonStyles[variant].backgroundColor;
  const hoverColor =
    variant === 'primary'
      ? '#004499'
      : variant === 'secondary'
        ? '#5a6268'
        : variant === 'success'
          ? '#218838'
          : variant === 'info'
            ? '#138496'
            : variant === 'warning'
              ? '#e0a800'
              : variant === 'danger'
                ? '#c82333'
                : baseColor;

  button.style.backgroundColor = hoverColor;
  button.style.transform = 'translateY(-1px)';
  button.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
};

const handleButtonLeave = (
  e: React.MouseEvent<HTMLButtonElement>,
  variant: keyof typeof buttonStyles,
) => {
  const button = e.currentTarget;
  button.style.backgroundColor = buttonStyles[variant].backgroundColor;
  button.style.transform = 'translateY(0)';
  button.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
};

// Простая модалка для демонстрации
const SimpleModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      <h2
        style={{
          marginTop: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Простая модалка
      </h2>
      <p
        style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#374151',
          marginBottom: '24px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Это пример простой модалки с базовой функциональностью.
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={buttonStyles.primary}
          onMouseEnter={(e) => handleButtonHover(e, 'primary')}
          onMouseLeave={(e) => handleButtonLeave(e, 'primary')}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

// Компонент для демонстрации
const ModalDemo: React.FC = () => {
  const { openModal, closeAllModals, getOpenModals, closeModal } = useModals();

  const handleOpenModal = () => {
    const closeModal = openModal({
      id: 'simple-modal',
      component: <SimpleModal onClose={closeModal} />,
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

  const handleOpenAnotherModal = () => {
    const closeModal = openModal({
      id: 'another-modal',
      component: <SimpleModal onClose={closeModal} />,
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      },
    });
  };

  const handleCloseLastModal = () => {
    const openModals = getOpenModals();
    if (openModals.length > 0) {
      const lastModal = openModals[openModals.length - 1];
      // Используем closeModal из контекста для закрытия по ID
      closeModal(lastModal.id);
    }
  };

  const openModals = getOpenModals();

  return (
    <div>
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Демонстрация модалок
      </h3>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleOpenModal}
          style={buttonStyles.success}
          onMouseEnter={(e) => handleButtonHover(e, 'success')}
          onMouseLeave={(e) => handleButtonLeave(e, 'success')}
        >
          Открыть модалку
        </button>

        <button
          onClick={handleOpenAnotherModal}
          style={buttonStyles.info}
          onMouseEnter={(e) => handleButtonHover(e, 'info')}
          onMouseLeave={(e) => handleButtonLeave(e, 'info')}
        >
          Open Another Simple Modal
        </button>

        <button
          onClick={handleCloseLastModal}
          disabled={openModals.length === 0}
          style={{
            ...buttonStyles.warning,
            opacity: openModals.length === 0 ? 0.5 : 1,
            cursor: openModals.length === 0 ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) =>
            openModals.length > 0 && handleButtonHover(e, 'warning')
          }
          onMouseLeave={(e) =>
            openModals.length > 0 && handleButtonLeave(e, 'warning')
          }
        >
          Close Last Modal
        </button>

        <button
          onClick={closeAllModals}
          disabled={openModals.length === 0}
          style={{
            ...buttonStyles.danger,
            opacity: openModals.length === 0 ? 0.5 : 1,
            cursor: openModals.length === 0 ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) =>
            openModals.length > 0 && handleButtonHover(e, 'danger')
          }
          onMouseLeave={(e) =>
            openModals.length > 0 && handleButtonLeave(e, 'danger')
          }
        >
          Закрыть все ({openModals.length})
        </button>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <strong
          style={{
            color: '#111827',
            fontWeight: '600',
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Статус:
        </strong>{' '}
        Открыто модалок:{' '}
        <span
          data-testid="modal-count"
          style={{
            color: '#ffffff',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {openModals.length}
        </span>
        {openModals.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <strong
              style={{
                color: '#374151',
                fontWeight: '500',
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              ID модалок:
            </strong>{' '}
            <span
              style={{
                color: '#6b7280',
                fontFamily:
                  'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
                fontSize: '13px',
              }}
            >
              {openModals.map((m) => m.id).join(', ')}
            </span>
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
    const closeModal = openModal({
      id: 'custom-modal',
      component: <SimpleModal onClose={closeModal} />,
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
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Модалка с кастомными опциями
      </h3>
      <p
        style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#374151',
          marginBottom: '20px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Эта модалка не закрывается при клике вне области.
      </p>
      <button
        onClick={handleOpenModal}
        style={{
          ...buttonStyles.primary,
          backgroundColor: '#7c3aed',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#6d28d9';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#7c3aed';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
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
