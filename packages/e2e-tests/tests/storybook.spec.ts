import { test, expect } from '@playwright/test';
import { SimpleModalPage } from './page-objects/SimpleModalPage';
import { FormModalPage } from './page-objects/FormModalPage';
import { ConfirmModalPage } from './page-objects/ConfirmModalPage';

test.describe('Modal Renderer Storybook Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to Simple Modal story', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    await simpleModalPage.navigateToDefaultStory();
    
    // Проверяем, что история загрузилась
    await expect(page.locator('h3')).toContainText('Демонстрация модалок');
  });

  test('should open and close simple modal in story', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    await simpleModalPage.navigateToDefaultStory();
    
    // Проверяем начальное состояние
    await simpleModalPage.expectElementToHaveText('[data-testid="modal-count"]', '0');
    
    // Открываем модалку
    await simpleModalPage.openModal();
    await simpleModalPage.expectModalToBeOpen();
    
    // Закрываем модалку
    await simpleModalPage.closeModal();
    await simpleModalPage.expectModalToBeClosed();
  });

  test('should test custom options story', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    await simpleModalPage.navigateToCustomOptionsStory();
    
    await simpleModalPage.testCustomOptionsModal();
  });

  test('should test form modal story', async ({ page }) => {
    const formModalPage = new FormModalPage(page);
    await formModalPage.navigateToDefaultStory();
    
    await formModalPage.testFormSubmission('John Doe', 'john@example.com');
  });

  test('should test form validation story', async ({ page }) => {
    const formModalPage = new FormModalPage(page);
    await formModalPage.navigateToValidationStory();
    
    await formModalPage.testFormValidation();
  });

  test('should test confirm modal story', async ({ page }) => {
    const confirmModalPage = new ConfirmModalPage(page);
    await confirmModalPage.navigateToDefaultStory();
    
    await confirmModalPage.testDeleteConfirmation();
    await confirmModalPage.testSaveConfirmation();
  });

  test('should test danger only story', async ({ page }) => {
    const confirmModalPage = new ConfirmModalPage(page);
    await confirmModalPage.navigateToDangerOnlyStory();
    
    await confirmModalPage.testDangerOnlyScenario();
  });

  test('should test keyboard navigation', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    await simpleModalPage.navigateToDefaultStory();
    
    await simpleModalPage.testKeyboardNavigation();
  });

  test('should test multiple modals', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    await simpleModalPage.navigateToDefaultStory();
    
    await simpleModalPage.testMultipleModals();
  });

  test('should test mobile responsiveness', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    
    // Устанавливаем размер мобильного устройства
    await simpleModalPage.setViewportSize(375, 667);
    await simpleModalPage.navigateToDefaultStory();
    
    // Открываем модалку на мобильном
    await simpleModalPage.openModal();
    await simpleModalPage.waitForModalToBeVisible();
    
    // Проверяем, что модалка адаптирована под мобильный экран
    await simpleModalPage.expectElementToBeVisible('.modal-content');
    
    // Закрываем модалку
    await simpleModalPage.closeModal();
    await simpleModalPage.waitForModalToBeHidden();
  });

  test('should test story navigation', async ({ page }) => {
    const simpleModalPage = new SimpleModalPage(page);
    const formModalPage = new FormModalPage(page);
    const confirmModalPage = new ConfirmModalPage(page);
    
    // Проверяем навигацию между историями
    await simpleModalPage.navigateToDefaultStory();
    await simpleModalPage.expectTextToBeVisible('Демонстрация модалок');
    
    // Переходим к другой истории
    await formModalPage.navigateToDefaultStory();
    await formModalPage.expectTextToBeVisible('Демонстрация модалки с формой');
    
    // Переходим к третьей истории
    await confirmModalPage.navigateToDefaultStory();
    await confirmModalPage.expectTextToBeVisible('Демонстрация модалок подтверждения');
  });
});
