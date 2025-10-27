import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

// Утилиты для тестирования модалок
export const waitForModal = async (testId: string, timeout = 3000) => {
  await waitFor(
    () => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    },
    { timeout },
  );
};

export const waitForModalToClose = async (testId: string, timeout = 3000) => {
  await waitFor(
    () => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    },
    { timeout },
  );
};

// Утилиты для получения элементов
export const getModalStatus = () => screen.getByTestId('modal-status');
export const getModalCount = () => screen.getByTestId('modal-count');
export const getTestModalStatus = () => screen.getByTestId('test-modal-status');
export const getModal = (testId: string) => screen.getByTestId(testId);
export const queryModal = (testId: string) => screen.queryByTestId(testId);
