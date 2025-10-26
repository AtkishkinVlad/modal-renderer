import { test, expect } from './fixtures/modal-fixtures';

test.describe('Confirm Modal Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to Confirm Modal default story', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.expectStoryTitleToContain('Демонстрация модалок подтверждения');
  });

  test('should test delete confirmation', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.testDeleteConfirmation();
  });

  test('should test save confirmation', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.testSaveConfirmation();
  });

  test('should test danger only scenario', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDangerOnlyStory();
    await confirmModalPage.testDangerOnlyScenario();
  });

  test('should test confirmation cancellation', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    await confirmModalPage.openConfirmModal();
    await confirmModalPage.expectModalToBeOpen();
    
    await confirmModalPage.cancelAction();
    await confirmModalPage.expectConfirmModalToBeClosed();
    
    await confirmModalPage.expectTextToBeVisible('Cancelled');
  });

  test('should test multiple confirmations', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    // Тестируем несколько подтверждений подряд
    await confirmModalPage.testDeleteConfirmation();
    await confirmModalPage.testSaveConfirmation();
  });

  test('should test keyboard navigation in confirm modal', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    await confirmModalPage.openConfirmModal();
    await confirmModalPage.expectModalToBeOpen();
    
    // Нажимаем Escape для закрытия
    await confirmModalPage.pressKey('Escape');
    await confirmModalPage.expectConfirmModalToBeClosed();
  });

  test('should test confirmation with different types', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    // Тестируем разные типы подтверждений
    await confirmModalPage.openConfirmModal();
    await confirmModalPage.expectModalToBeOpen();
    
    // Проверяем, что есть кнопки подтверждения и отмены
    await confirmModalPage.expectTextToBeVisible('Подтвердить');
    await confirmModalPage.expectTextToBeVisible('Отмена');
    
    await confirmModalPage.cancelAction();
    await confirmModalPage.expectConfirmModalToBeClosed();
  });

  test('should test danger confirmation styling', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDangerOnlyStory();
    
    await confirmModalPage.openDangerOnlyModal();
    await confirmModalPage.expectModalToBeOpen();
    
    // Проверяем, что кнопка отмены не видна в danger-only режиме
    await confirmModalPage.expectTextNotToBeVisible('Отмена');
    
    await confirmModalPage.confirmAction();
    await confirmModalPage.expectConfirmModalToBeClosed();
  });

  test('should test confirmation message content', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    await confirmModalPage.openConfirmModal();
    await confirmModalPage.expectModalToBeOpen();
    
    // Проверяем содержимое сообщения
    await confirmModalPage.expectTextToBeVisible('Вы уверены');
    await confirmModalPage.expectTextToBeVisible('Это действие нельзя отменить');
    
    await confirmModalPage.cancelAction();
    await confirmModalPage.expectConfirmModalToBeClosed();
  });

  test('should test confirmation accessibility', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    await confirmModalPage.openConfirmModal();
    await confirmModalPage.expectModalToBeOpen();
    
    // Проверяем доступность кнопок
    await confirmModalPage.expectButtonToBeEnabled('Отмена');
    await confirmModalPage.expectButtonToBeEnabled('Подтвердить');
    
    await confirmModalPage.cancelAction();
    await confirmModalPage.expectConfirmModalToBeClosed();
  });

  test('should test rapid confirmations', async ({ confirmModalPage }) => {
    await confirmModalPage.navigateToDefaultStory();
    
    // Быстро открываем и закрываем несколько подтверждений
    for (let i = 0; i < 3; i++) {
      await confirmModalPage.openConfirmModal();
      await confirmModalPage.expectModalToBeOpen();
      await confirmModalPage.cancelAction();
      await confirmModalPage.expectConfirmModalToBeClosed();
    }
  });
});
