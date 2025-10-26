import { Page } from '@playwright/test';
import { BaseStoryPage } from './BaseStoryPage';

export class SimpleModalPage extends BaseStoryPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDefaultStory() {
    await this.navigateToStory('modal-renderer-simple-modal--default');
  }

  async navigateToCustomOptionsStory() {
    await this.navigateToStory('modal-renderer-simple-modal--with-custom-options');
  }

  async openModal() {
    await this.clickButton('Открыть модалку');
  }

  async closeModal() {
    await this.clickButton('Закрыть');
  }

  async closeAllModals() {
    await this.clickButton('Закрыть все');
  }

  async expectModalToBeOpen() {
    await this.waitForModalToBeVisible();
    await this.expectTextToBeVisible('Простая модалка');
    await this.expectElementToHaveText('[data-testid="modal-count"]', '1');
  }

  async expectModalToBeClosed() {
    await this.waitForModalToBeHidden();
    await this.expectElementToHaveText('[data-testid="modal-count"]', '0');
  }

  async expectMultipleModalsOpen(count: number) {
    await this.expectElementToHaveText('[data-testid="modal-count"]', count.toString());
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
    await this.expectElementToHaveText('[data-testid="modal-count"]', '0');
    await this.waitForModalToBeHidden();
  }
}
