import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalsProvider, useModals } from '@atkvs/modal-renderer';
import React from 'react';

// Модалка с формой
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
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2 style={{ marginTop: 0 }}>Форма в модалке</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
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
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
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
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div
          style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            onClick={() => closeModal('form-modal')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Отмена
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
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
  const { openModal } = useModals();
  const [submittedData, setSubmittedData] = React.useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleOpenFormModal = () => {
    openModal({
      id: 'form-modal',
      component: <FormModal onSubmit={setSubmittedData} />,
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
  const { openModal } = useModals();
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleOpenFormModal = () => {
    openModal({
      id: 'form-modal-validation',
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
