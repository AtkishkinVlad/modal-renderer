import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalsProvider } from '../index';
import { beforeEach, describe, test, expect } from 'vitest';
import { AppWithProvider } from './test-components';
import {
  waitForModal,
  waitForModalToClose,
  getModalStatus,
  getModalCount,
  getTestModalStatus,
} from './test-utils';

describe('Modal Renderer', () => {
  beforeEach(() => {
    // Очищаем DOM перед каждым тестом
    document.body.innerHTML = '';
  });

  test('renders app without modals initially', () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    expect(getModalStatus()).toHaveTextContent('Closed');
    expect(getModalCount()).toHaveTextContent('0');
    expect(getTestModalStatus()).toHaveTextContent('Closed');
  });

  test('opens modal when open button is clicked', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    fireEvent.click(screen.getByTestId('open-modal'));

    await waitForModal('test-modal');

    expect(getModalStatus()).toHaveTextContent('Open');
    expect(getModalCount()).toHaveTextContent('1');
    expect(getTestModalStatus()).toHaveTextContent('Open');
  });

  test('closes modal when close button is clicked', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    // Открываем модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitForModal('test-modal');

    // Закрываем модалку
    fireEvent.click(screen.getByTestId('close-modal'));

    await waitForModalToClose('test-modal');

    expect(getModalStatus()).toHaveTextContent('Closed');
    expect(getModalCount()).toHaveTextContent('0');
  });

  test('closes modal when close button inside modal is clicked', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    // Открываем модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitForModal('test-modal');

    // Закрываем модалку через кнопку внутри модалки
    fireEvent.click(screen.getByTestId('close-button'));

    await waitForModalToClose('test-modal');

    expect(getModalStatus()).toHaveTextContent('Closed');
    expect(getModalCount()).toHaveTextContent('0');
  });

  test('closes all modals when close all button is clicked', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    // Открываем несколько модалок
    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitForModal('test-modal');
    await waitForModal('form-modal');

    // Закрываем все модалки
    fireEvent.click(screen.getByTestId('close-all'));

    await waitForModalToClose('test-modal');
    await waitForModalToClose('form-modal');

    expect(getModalCount()).toHaveTextContent('0');
  });

  test('useModal hook works correctly', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    fireEvent.click(screen.getByTestId('open-modal'));

    await waitForModal('test-modal');

    expect(getModalStatus()).toHaveTextContent('Open');
    expect(getModalCount()).toHaveTextContent('1');
    expect(getTestModalStatus()).toHaveTextContent('Open');
  });

  test('useCreateModal hook works correctly', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    fireEvent.click(screen.getByTestId('create-modal'));

    await waitForModal('test-modal');

    expect(getModalStatus()).toHaveTextContent('Open');
    expect(getModalCount()).toHaveTextContent('1');
  });

  test('form modal works correctly', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitForModal('form-modal');

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitForModalToClose('form-modal');

    expect(getModalStatus()).toHaveTextContent('Closed');
    expect(getModalCount()).toHaveTextContent('0');
  });

  test('modal with custom options works correctly', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitForModal('form-modal');

    expect(getModalStatus()).toHaveTextContent('Open');
    expect(getModalCount()).toHaveTextContent('1');
  });

  test('multiple modals can be opened simultaneously', async () => {
    render(
      <ModalsProvider>
        <AppWithProvider />
      </ModalsProvider>,
    );

    // Открываем первую модалку
    fireEvent.click(screen.getByTestId('open-modal'));

    await waitForModal('test-modal');

    // Открываем вторую модалку
    fireEvent.click(screen.getByTestId('open-form-modal'));

    await waitForModal('form-modal');

    expect(getModalStatus()).toHaveTextContent('Open');
    expect(getModalCount()).toHaveTextContent('2');

    // Закрываем все модалки
    fireEvent.click(screen.getByTestId('close-all'));

    await waitForModalToClose('test-modal');
    await waitForModalToClose('form-modal');

    expect(getModalCount()).toHaveTextContent('0');
  });
});
