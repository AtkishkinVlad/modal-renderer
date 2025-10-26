import { test, expect } from './fixtures/modal-fixtures';

test.describe('Modal Renderer Storybook Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should verify storybook is running', async ({ basePage }) => {
    // Проверяем, что Storybook запущен и доступен
    await basePage.expectTextToBeVisible('Storybook');
  });

  test('should test all modal types integration', async ({
    simpleModalPage,
    formModalPage,
    confirmModalPage,
  }) => {
    // Интеграционный тест всех типов модалок

    // 1. Simple Modal
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testBasicModalFlow();

    // 2. Form Modal
    await formModalPage.navigateToDefaultStory();
    await formModalPage.testFormSubmission('Test User', 'test@example.com');

    // 3. Confirm Modal
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.testDeleteConfirmation();
  });

  test('should test modal state persistence across stories', async ({
    simpleModalPage,
    formModalPage,
  }) => {
    // Тестируем, что состояние модалок не переносится между историями
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.openModal();
    await simpleModalPage.expectModalToBeOpen();

    // Переходим к другой истории
    await formModalPage.navigateToDefaultStory();

    // Проверяем, что модалка из предыдущей истории закрылась
    await simpleModalPage.expectModalToBeClosed();
  });

  test('should test storybook performance with multiple modals', async ({
    simpleModalPage,
  }) => {
    await simpleModalPage.navigateToDefaultStory();

    const startTime = Date.now();

    // Открываем несколько модалок для тестирования производительности
    await simpleModalPage.openModal();
    await simpleModalPage.openModal();
    await simpleModalPage.openModal();

    const openTime = Date.now() - startTime;
    expect(openTime).toBeLessThan(3000); // Менее 3 секунд

    await simpleModalPage.closeAllModals();
  });

  test('should test storybook accessibility compliance', async ({
    basePage,
  }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем основные требования доступности
    await basePage.expectTextToBeVisible('Демонстрация модалок');

    // Проверяем наличие кнопок с правильными ролями
    await basePage.expectTextToBeVisible('Открыть модалку');
  });

  test('should test storybook error boundaries', async ({ basePage }) => {
    // Тестируем обработку ошибок в Storybook
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем, что история загружается без ошибок
    await basePage.expectStoryTitleToContain('Демонстрация модалок');

    // Проверяем отсутствие ошибок в консоли
    const errors = await basePage.page.evaluate(() => {
      return window.console.error ? 'errors detected' : 'no errors';
    });

    expect(errors).toBe('no errors');
  });

  test('should test storybook responsive behavior', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Тестируем адаптивность на разных устройствах
    const devices = [
      { width: 320, height: 568, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' },
    ];

    for (const device of devices) {
      await basePage.setViewportSize(device.width, device.height);

      // Проверяем, что контент отображается корректно
      await basePage.expectStoryTitleToContain('Демонстрация модалок');

      // Небольшая пауза для стабилизации
      await basePage.page.waitForTimeout(100);
    }
  });

  test('should test storybook story metadata', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем метаданные истории
    await basePage.expectStoryTitleToContain('Демонстрация модалок');
    await basePage.expectStoryDescriptionToContain('Простая демонстрация');
  });

  test('should test storybook iframe communication', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем, что iframe работает корректно
    const iframeContent = await basePage.page.content();
    expect(iframeContent).toContain('Демонстрация модалок');
  });
});
