import { test } from './fixtures/modal-fixtures';

test.describe('simple Modal Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should navigate to Simple Modal default story', async ({
    simpleModalPage,
  }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.expectStoryTitleToContain('Демонстрация модалок');
  });

  test('should open and close simple modal', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testBasicModalFlow();
  });

  test('should test custom options story', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToCustomOptionsStory();
    await simpleModalPage.testCustomOptionsModal();
  });

  test('should test keyboard navigation', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testKeyboardNavigation();
  });

  test('should test multiple modals', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testMultipleModals();
  });

  test('should test overlay click', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testOverlayClick();
  });

  test('should test mobile responsiveness', async ({ simpleModalPage }) => {
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.testMobileResponsiveness();
  });

  test('should verify modal count updates correctly', async ({
    simpleModalPage,
  }) => {
    await simpleModalPage.navigateToDefaultStory();

    // Проверяем начальное состояние
    await simpleModalPage.expectModalCountToBe(0);

    // Открываем модалку
    await simpleModalPage.openModal();
    await simpleModalPage.expectModalCountToBe(1);

    // Закрываем модалку
    await simpleModalPage.closeModal();
    await simpleModalPage.expectModalCountToBe(0);
  });

  test('should handle rapid modal opening and closing', async ({
    simpleModalPage,
  }) => {
    await simpleModalPage.navigateToDefaultStory();

    // Быстро открываем и закрываем несколько модалок
    for (let i = 0; i < 3; i++) {
      await simpleModalPage.openModal();
      await simpleModalPage.expectModalToBeOpen();
      await simpleModalPage.closeModal();
      await simpleModalPage.expectModalToBeClosed();
    }
  });
});
