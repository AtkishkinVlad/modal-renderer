import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Простой мок для createPortal - просто возвращаем children
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

// Очищаем DOM перед каждым тестом
beforeEach(() => {
  document.body.innerHTML = '';
});
