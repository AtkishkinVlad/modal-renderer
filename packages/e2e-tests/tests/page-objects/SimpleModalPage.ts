import { Page } from '@playwright/test';
import { BaseStoryPage } from './BaseStoryPage';

export class SimpleModalPage extends BaseStoryPage {
  constructor(page: Page) {
    super(page);
  }

  // Специфичные локаторы для Simple Modal
  private readonly openModalButton = this.page.getByRole('button', { name: 'Открыть модалку' });
  private readonly openAnotherModalButton = this.page.getByRole('button', { name: 'Open Another Simple Modal' });
  private readonly closeLastModalButton = this.page.getByRole('button', { name: 'Close Last Modal' });
  private readonly closeAllModalsButton = this.page.getByRole('button', { name: 'Закрыть все' });
  private readonly modalCount = this.page.locator('[data-testid="modal-count"]');

  // Навигация к историям
  async navigateToDefaultStory() {
    await this.navigateToStory('modal-renderer-simple-modal--default');
  }

  async navigateToCustomOptionsStory() {
    await this.navigateToStory('modal-renderer-simple-modal--with-custom-options');
  }

  // Взаимодействие с модалками
  async openModal() {
    await this.openModalButton.click();
  }

  async openAnotherModal() {
    await this.openAnotherModalButton.click();
  }

  async closeModal() {
    await this.closeModalByButton();
  }

  async closeLastModal() {
    await this.closeLastModalButton.click();
  }

  async closeAllModals() {
    await this.closeAllModalsButton.click();
  }

  // Проверки состояния
  async expectModalCountToBe(count: number) {
    await this.expectElementToHaveText('[data-testid="modal-count"]', count.toString());
  }

  async expectModalCountToContain(text: string) {
    await this.expectElementToHaveText('[data-testid="modal-count"]', text);
  }

  async expectModalToBeOpen() {
    await this.waitForModalToBeVisible();
    await this.expectTextToBeVisible('Простая модалка');
  }

  async expectModalToBeClosed() {
    await this.waitForModalToBeHidden();
  }

  async expectMultipleModalsOpen(count: number) {
    await this.expectModalCountToBe(count);
  }

  // Тестовые сценарии
  async testBasicModalFlow() {
    await this.openModal();
    await this.expectModalToBeOpen();
    await this.closeModal();
    await this.expectModalToBeClosed();
  }

  async testCustomOptionsModal() {
    await this.openModal();
    await this.waitForModalToBeVisible();
    
    // Проверяем, что модалка не закрывается при клике вне области
    await this.clickModalOverlay();
    await this.waitForModalToBeVisible();
    
    // Закрываем через кнопку
    await this.closeModal();
    await this.waitForModalToBeHidden();
  }

  async testKeyboardNavigation() {
    await this.openModal();
    await this.waitForModalToBeVisible();
    
    // Нажимаем Escape для закрытия
    await this.pressKey('Escape');
    await this.waitForModalToBeHidden();
  }

  async testMultipleModals() {
    // Открываем несколько модалок быстро
    await this.openModal();
    await this.openModal();
    await this.openModal();
    
    // Проверяем, что все модалки открыты
    await this.expectMultipleModalsOpen(3);
    
    // Закрываем все модалки
    await this.closeAllModals();
    await this.expectModalCountToBe(0);
    await this.waitForModalToBeHidden();
  }

  async testOverlayClick() {
    await this.openModal();
    await this.expectModalToBeOpen();
    await this.clickModalOverlay();
    await this.expectModalToBeClosed();
  }

  async testMobileResponsiveness() {
    await this.setViewportSize(375, 667);
    await this.openModal();
    await this.waitForModalToBeVisible();
    await this.expectModalToBeOpen();
    await this.closeModal();
    await this.waitForModalToBeHidden();
  }
}
