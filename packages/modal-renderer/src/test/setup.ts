import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Мокаем createPortal для тестов
const mockCreatePortal = (children: React.ReactNode) => children;

vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: mockCreatePortal,
}));

// Мокаем document.body для тестов
Object.defineProperty(document, 'body', {
  value: document.createElement('body'),
  writable: true,
});

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
