import React from 'react';
import {
  ModalsProvider,
  useModals,
  useCreateModal,
} from '@atkvs/modal-renderer';
import '@atkvs/modal-renderer/styles';
import './App.css';

// Пример простой модалки
const SimpleModal: React.FC = () => {
  const { closeModal } = useModals();

  return (
    <div className="modal-content">
      <h2>Простая модалка</h2>
      <p>Это пример простой модалки с базовой функциональностью.</p>
      <div className="modal-actions">
        <button
          className="btn btn-primary"
          onClick={() => closeModal('simple-modal')}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

// Пример модалки с формой
const FormModal: React.FC<{ onSubmit: (data: unknown) => void }> = ({
  onSubmit,
}) => {
  const { closeModal } = useModals();
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    closeModal('form-modal');
  };

  return (
    <div className="modal-content">
      <h2>Форма в модалке</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => closeModal('form-modal')}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

// Пример модалки с подтверждением
const ConfirmModal: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-content">
      <h2>Подтверждение</h2>
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className="btn btn-danger">
          Да, удалить
        </button>
        <button onClick={onCancel} className="btn btn-secondary">
          Отмена
        </button>
      </div>
    </div>
  );
};

// Пример модалки с настройками
const SettingsModal: React.FC = () => {
  const { closeModal } = useModals();
  const [settings, setSettings] = React.useState({
    theme: 'light',
    notifications: true,
    language: 'ru',
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    closeModal('settings-modal');
  };

  return (
    <div className="modal-content">
      <h2>Настройки</h2>
      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="theme">Тема:</label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value })
            }
          >
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="auto">Авто</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Язык:</label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.checked })
              }
            />
            Включить уведомления
          </label>
        </div>
      </div>

      <div className="modal-actions">
        <button onClick={handleSave} className="btn btn-primary">
          Сохранить
        </button>
        <button
          onClick={() => closeModal('settings-modal')}
          className="btn btn-secondary"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

// Основной компонент с примерами
const App: React.FC = () => {
  const { openModal, closeModal, closeAllModals, getOpenModals } = useModals();
  const createModal = useCreateModal();

  const handleOpenSimpleModal = () => {
    openModal({
      id: 'simple-modal',
      component: <SimpleModal />,
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      },
    });
  };

  const handleOpenFormModal = () => {
    openModal({
      id: 'form-modal',
      component: <FormModal onSubmit={console.log} />,
      options: {
        closeOnOverlayClick: false,
        closeOnEscape: true,
        animated: true,
        className: 'form-modal',
      },
    });
  };

  const handleOpenSettingsModal = () => {
    openModal({
      id: 'settings-modal',
      component: <SettingsModal />,
      options: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
        className: 'settings-modal',
      },
    });
  };

  const handleOpenConfirmModal = () => {
    const modalId = createModal({
      component: (
        <ConfirmModal
          message="Вы уверены, что хотите удалить этот элемент?"
          onConfirm={() => {
            console.log('Подтверждено');
            setTimeout(() => {
              closeModal(modalId);
            }, 1000);
          }}
          onCancel={() => {
            console.log('Отменено');
            closeModal(modalId);
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

  const openModals = getOpenModals();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Modal Renderer v2.0.0 - Примеры использования</h1>
        <p>Демонстрация возможностей библиотеки управления модальными окнами</p>
      </header>

      <main className="app-main">
        <section className="examples-section">
          <h2>Примеры модалок</h2>

          <div className="examples-grid">
            <div className="example-card">
              <h3>Простая модалка</h3>
              <p>Базовая модалка с кнопкой закрытия</p>
              <button
                className="btn btn-primary"
                onClick={handleOpenSimpleModal}
              >
                Открыть простую модалку
              </button>
            </div>

            <div className="example-card">
              <h3>Модалка с формой</h3>
              <p>Модалка с формой ввода данных</p>
              <button className="btn btn-primary" onClick={handleOpenFormModal}>
                Открыть модалку с формой
              </button>
            </div>

            <div className="example-card">
              <h3>Модалка настроек</h3>
              <p>Модалка с различными элементами управления</p>
              <button
                className="btn btn-primary"
                onClick={handleOpenSettingsModal}
              >
                Открыть настройки
              </button>
            </div>

            <div className="example-card">
              <h3>Модалка подтверждения</h3>
              <p>Модалка с подтверждением действия</p>
              <button
                className="btn btn-danger"
                onClick={handleOpenConfirmModal}
              >
                Удалить элемент
              </button>
            </div>
          </div>
        </section>

        <section className="controls-section">
          <h2>Управление модалками</h2>
          <div className="controls">
            <button
              className="btn btn-secondary"
              onClick={closeAllModals}
              disabled={openModals.length === 0}
            >
              Закрыть все модалки ({openModals.length})
            </button>
          </div>
        </section>

        <section className="status-section">
          <h2>Статус модалок</h2>
          <div className="status-info">
            <p>
              <strong>Открыто модалок:</strong> {openModals.length}
            </p>
            {openModals.length > 0 && (
              <div className="open-modals">
                <h4>Открытые модалки:</h4>
                <ul>
                  {openModals.map((modal) => (
                    <li key={modal.id}>
                      <code>{modal.id}</code>
                      <button
                        className="btn btn-small btn-secondary"
                        onClick={() => closeModal(modal.id)}
                      >
                        Закрыть
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Modal Renderer v2.0.0 - Современная библиотека для управления
          модальными окнами в React
        </p>
      </footer>
    </div>
  );
};

// Корневой компонент с провайдером
const RootApp: React.FC = () => {
  return (
    <ModalsProvider
      baseZIndex={1000}
      defaultOptions={{
        closeOnOverlayClick: true,
        closeOnEscape: true,
        animated: true,
      }}
    >
      <App />
    </ModalsProvider>
  );
};

export default RootApp;
