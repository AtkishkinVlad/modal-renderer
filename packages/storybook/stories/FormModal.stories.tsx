import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalsProvider, useCreateModal } from '@atkvs/modal-renderer';
import React from 'react';

// Модалка с формой
const FormModal: React.FC<{
  onSubmit: (data: { name: string; email: string }) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <h2
        style={{
          marginTop: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '20px',
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Форма в модалке
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              fontSize: '14px',
              color: '#111827',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Имя:
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0066cc';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              fontSize: '14px',
              color: '#111827',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0066cc';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div
          style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '12px 24px',
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6268';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6c757d';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Отмена
          </button>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004499';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0066cc';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

// Компонент для демонстрации
const FormModalDemo: React.FC = () => {
  const createModal = useCreateModal();
  const [submittedData, setSubmittedData] = React.useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleOpenFormModal = () => {
    const { closeModal } = createModal({
      component: <FormModal onSubmit={setSubmittedData} onClose={closeModal} />,
      options: {
        closeOnOverlayClick: false,
        closeOnEscape: true,
        animated: true,
        className: 'form-modal',
      },
    });
  };

  return (
    <div>
      <h3>Демонстрация модалки с формой</h3>
      <p>
        Эта модалка содержит форму с валидацией и не закрывается при клике вне
        области.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleOpenFormModal}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Открыть форму
        </button>
      </div>

      {submittedData && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <h4 style={{ marginTop: 0, color: '#155724' }}>Данные формы:</h4>
          <pre style={{ margin: 0, fontSize: '14px' }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof FormModalDemo> = {
  title: 'Modal Renderer/Form Modal',
  component: FormModalDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Модалка с формой ввода данных. Демонстрирует работу с формами внутри модальных окон.',
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
type Story = StoryObj<typeof FormModalDemo>;

export const Default: Story = {
  name: 'Модалка с формой',
};

// Компонент для демонстрации с валидацией
const FormModalValidationDemo: React.FC = () => {
  const createModal = useCreateModal();
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleOpenFormModal = () => {
    const { closeModal } = createModal({
      component: (
        <FormModal
          onSubmit={(data) => {
            const newErrors = [];
            if (!data.name || data.name.length < 2) {
              newErrors.push('Имя должно содержать минимум 2 символа');
            }
            if (!data.email || !data.email.includes('@')) {
              newErrors.push('Email должен быть корректным');
            }
            setErrors(newErrors);
            if (newErrors.length === 0) {
              console.log('Форма валидна:', data);
            }
          }}
          onClose={closeModal}
        />
      ),
      options: {
        closeOnOverlayClick: false,
        closeOnEscape: true,
        animated: true,
      },
    });
  };

  return (
    <div>
      <h3>Модалка с валидацией</h3>
      <p>Попробуйте отправить форму с некорректными данными.</p>

      <button
        onClick={handleOpenFormModal}
        style={{
          padding: '10px 20px',
          backgroundColor: '#fd7e14',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Открыть форму с валидацией
      </button>

      {errors.length > 0 && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <h4 style={{ marginTop: 0, color: '#721c24' }}>Ошибки валидации:</h4>
          <ul style={{ margin: 0, color: '#721c24' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const WithValidation: Story = {
  name: 'С валидацией',
  render: () => <FormModalValidationDemo />,
};
