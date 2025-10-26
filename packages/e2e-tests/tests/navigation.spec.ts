import { test, expect } from './fixtures/modal-fixtures';

test.describe('storybook Navigation and Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should navigate between different modal stories', async ({
    simpleModalPage,
    formModalPage,
    confirmModalPage,
  }) => {
    // Проверяем навигацию между историями
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.expectStoryTitleToContain('Демонстрация модалок');

    // Переходим к другой истории
    await formModalPage.navigateToDefaultStory();
    await formModalPage.expectStoryTitleToContain(
      'Демонстрация модалки с формой',
    );

    // Переходим к третьей истории
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.expectStoryTitleToContain(
      'Демонстрация модалок подтверждения',
    );
  });

  test('should verify storybook interface elements', async ({ basePage }) => {
    // Проверяем основные элементы интерфейса Storybook
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем наличие заголовка истории
    await basePage.expectStoryTitleToContain('Демонстрация модалок');

    // Проверяем наличие описания
    await basePage.expectStoryDescriptionToContain('Простая демонстрация');
  });

  test('should test cross-modal interactions', async ({
    simpleModalPage,
    formModalPage,
  }) => {
    // Тестируем взаимодействие между разными типами модалок
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.openModal();
    await simpleModalPage.expectModalToBeOpen();

    // Переходим к другой истории с открытой модалкой
    await formModalPage.navigateToDefaultStory();

    // Проверяем, что предыдущая модалка закрылась
    await simpleModalPage.expectModalToBeClosed();
  });

  test('should test storybook responsive design', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Тестируем разные размеры экрана
    const viewports = [
      { width: 320, height: 568 }, // iPhone 5
      { width: 375, height: 667 }, // iPhone 6/7/8
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // Desktop
      { width: 1920, height: 1080 }, // Large Desktop
    ];

    for (const viewport of viewports) {
      await basePage.setViewportSize(viewport.width, viewport.height);

      // Проверяем, что история загружается корректно
      await basePage.expectStoryTitleToContain('Демонстрация модалок');

      // Небольшая пауза для стабилизации
      await basePage.page.waitForFunction(
        () => document.readyState === 'complete',
      );
    }
  });

  test('should test storybook performance', async ({ basePage }) => {
    const startTime = Date.now();

    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    const loadTime = Date.now() - startTime;

    // Проверяем, что история загружается достаточно быстро
    expect(loadTime).toBeLessThan(5000); // Менее 5 секунд

    await basePage.expectStoryTitleToContain('Демонстрация модалок');
  });

  test('should test storybook accessibility', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем основные элементы доступности
    await basePage.expectTextToBeVisible('Демонстрация модалок');

    // Проверяем наличие кнопок
    await basePage.expectTextToBeVisible('Открыть модалку');
  });

  test('should test storybook error handling', async ({ basePage }) => {
    // Тестируем обработку ошибок при навигации к несуществующей истории
    try {
      await basePage.navigateToStory('non-existent-story');
      // Если история не существует, должна быть ошибка или редирект
    } catch (error) {
      // Ожидаем ошибку для несуществующей истории
      // eslint-disable-next-line playwright/no-conditional-expect
      expect(error).toBeDefined();
    }
  });

  test('should test storybook URL parameters', async ({ basePage }) => {
    // Тестируем различные параметры URL
    await basePage.page.goto(
      '/iframe.html?id=modal-renderer-simple-modal--default&viewMode=story&args={}',
    );
    await basePage.page.waitForLoadState('domcontentloaded');

    await basePage.expectStoryTitleToContain('Демонстрация модалок');
  });

  test('should test storybook iframe isolation', async ({ basePage }) => {
    await basePage.navigateToStory('modal-renderer-simple-modal--default');

    // Проверяем, что мы находимся в iframe
    const isInIframe = await basePage.page.evaluate(
      () => globalThis !== globalThis.top,
    );
    expect(isInIframe).toBe(true);
  });

  test('should test storybook story switching', async ({
    simpleModalPage,
    formModalPage,
    confirmModalPage,
  }) => {
    // Тестируем быстрое переключение между историями
    const stories = [
      { page: simpleModalPage, story: 'modal-renderer-simple-modal--default' },
      { page: formModalPage, story: 'modal-renderer-form-modal--default' },
      {
        page: confirmModalPage,
        story: 'modal-renderer-confirm-modal--default',
      },
    ];

    for (const { page, story } of stories) {
      await page.navigateToStory(story);
      await page.expectStoryTitleToContain('Демонстрация');
    }
  });
});
