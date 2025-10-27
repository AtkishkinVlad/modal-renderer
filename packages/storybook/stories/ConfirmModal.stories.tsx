import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalsProvider, useCreateModal } from '@atkvs/modal-renderer';
import React from 'react';

// Модалка подтверждения
const ConfirmModal: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}> = ({ message, onConfirm, onCancel, type = 'info' }) => {
  const getButtonStyle = (variant: 'primary' | 'secondary') => {
    const baseStyle = {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: type === 'danger' ? '#dc3545' : '#007bff',
        color: 'white',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: '#6c757d',
      color: 'white',
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2
        style={{ marginTop: 0, color: type === 'danger' ? '#dc3545' : '#333' }}
      >
        {type === 'danger' ? '⚠️ Подтверждение' : '❓ Подтверждение'}
      </h2>
      <p style={{ marginBottom: '20px', lineHeight: '1.5' }}>{message}</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={getButtonStyle('secondary')}>
          Отмена
        </button>
        <button onClick={onConfirm} style={getButtonStyle('primary')}>
          {type === 'danger' ? 'Да, удалить' : 'Подтвердить'}
        </button>
      </div>
    </div>
  );
};

// Компонент для демонстрации
const ConfirmModalDemo: React.FC = () => {
  const createModal = useCreateModal();
  const [lastAction, setLastAction] = React.useState<string>('');

  const handleDeleteItem = () => {
    const { closeModal } = createModal({
      component: (
        <ConfirmModal
          message="Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить."
          type="danger"
          onConfirm={() => {
            setLastAction('Элемент удален');
            closeModal();
          }}
          onCancel={() => {
            setLastAction('Удаление отменено');
            closeModal();
          }}
        />
      ),
      options: {
        closeOnOverlayClick: false,
        closeOnEscape: true,
        animated: true,
        alwaysOnTop: true,
      },
    });
  };

  const handleSaveChanges = () => {
    const { closeModal } = createModal({
      component: (
        <ConfirmModal
          message="Сохранить внесенные изменения?"
          type="info"
          onConfirm={() => {
            setLastAction('Изменения сохранены');
            closeModal();
          }}
          onCancel={() => {
            setLastAction('Сохранение отменено');
            closeModal();
          }}
        />
      ),
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      },
    });
  };

  const handleWarningAction = () => {
    const { closeModal } = createModal({
      component: (
        <ConfirmModal
          message="Это действие может повлиять на работу системы. Продолжить?"
          type="warning"
          onConfirm={() => {
            setLastAction('Предупреждение проигнорировано');
            closeModal();
          }}
          onCancel={() => {
            setLastAction('Действие отменено');
            closeModal();
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
      <h3>Демонстрация модалок подтверждения</h3>
      <p>
        Различные типы модалок подтверждения для разных сценариев использования.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleDeleteItem}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🗑️ Удалить элемент
        </button>

        <button
          onClick={handleSaveChanges}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          💾 Сохранить изменения
        </button>

        <button
          onClick={handleWarningAction}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ⚠️ Предупреждение
        </button>
      </div>

      {lastAction && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <h4 style={{ marginTop: 0, color: '#0c5460' }}>
            Последнее действие:
          </h4>
          <p style={{ margin: 0, color: '#0c5460' }}>{lastAction}</p>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof ConfirmModalDemo> = {
  title: 'Modal Renderer/Confirm Modal',
  component: ConfirmModalDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Модалки подтверждения для различных действий. Демонстрирует использование разных типов подтверждений.',
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
type Story = StoryObj<typeof ConfirmModalDemo>;

export const Default: Story = {
  name: 'Модалки подтверждения',
};

// Компонент для демонстрации только опасных действий
const ConfirmModalDangerDemo: React.FC = () => {
  const createModal = useCreateModal();
  const [deletedItems, setDeletedItems] = React.useState<string[]>([]);

  const handleDeleteItem = (itemName: string) => {
    const { closeModal } = createModal({
      component: (
        <ConfirmModal
          message={`Удалить "${itemName}"? Это действие нельзя отменить.`}
          type="danger"
          onConfirm={() => {
            setDeletedItems((prev) => [...prev, itemName]);
            closeModal();
          }}
          onCancel={() => {
            closeModal();
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

  const items = ['Важный документ', 'Пользователь', 'Настройки системы'];

  return (
    <div>
      <h3>Удаление элементов</h3>
      <p>Выберите элемент для удаления:</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => handleDeleteItem(item)}
              disabled={deletedItems.includes(item)}
              style={{
                padding: '5px 10px',
                backgroundColor: deletedItems.includes(item)
                  ? '#6c757d'
                  : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: deletedItems.includes(item) ? 'not-allowed' : 'pointer',
                opacity: deletedItems.includes(item) ? 0.6 : 1,
              }}
            >
              {deletedItems.includes(item) ? 'Удален' : 'Удалить'}
            </button>
          </div>
        ))}
      </div>

      {deletedItems.length > 0 && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
          }}
        >
          <h4 style={{ marginTop: 0, color: '#721c24' }}>
            Удаленные элементы:
          </h4>
          <ul style={{ margin: 0, color: '#721c24' }}>
            {deletedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const DangerOnly: Story = {
  name: 'Только опасные действия',
  render: () => <ConfirmModalDangerDemo />,
};
