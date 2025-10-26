import { Page } from '@playwright/test';
import { BaseStoryPage } from './BaseStoryPage';

export class ConfirmModalPage extends BaseStoryPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDefaultStory() {
    await this.navigateToStory('modal-renderer-confirm-modal--default');
  }

  async navigateToDangerOnlyStory() {
    await this.navigateToStory('modal-renderer-confirm-modal--danger-only');
  }

  async clickDeleteItem() {
    await this.clickButton('🗑️ Удалить элемент');
  }

  async clickSaveChanges() {
    await this.clickButton('💾 Сохранить изменения');
  }

  async clickWarningAction() {
    await this.clickButton('⚠️ Предупреждение');
  }

  async confirmAction() {
    await this.clickButton('Подтвердить');
  }

  async confirmDelete() {
    await this.clickButton('Да, удалить');
  }

  async cancelAction() {
    await this.clickButton('Отмена');
  }

  async expectConfirmModalToBeVisible(message: string) {
    await this.waitForModalToBeVisible();
    await this.expectTextToBeVisible(message);
  }

  async expectConfirmModalToBeHidden() {
    await this.waitForModalToBeHidden();
  }

  async expectActionResultToBeVisible(result: string) {
    await this.expectTextToBeVisible(result);
  }

  async expectDeletedItemsToBeVisible(items: string[]) {
    await this.expectTextToBeVisible('Удаленные элементы:');
    for (const item of items) {
      await this.expectTextToBeVisible(item);
    }
  }

  async expectButtonToBeDisabled(buttonText: string) {
    await this.expectElementToBeVisible(`button:has-text("${buttonText}"):disabled`);
  }

  async testDeleteConfirmation() {
    await this.clickDeleteItem();
    await this.expectConfirmModalToBeVisible('Вы уверены, что хотите удалить этот элемент?');
    
    // Отменяем удаление
    await this.cancelAction();
    await this.expectConfirmModalToBeHidden();
    await this.expectActionResultToBeVisible('Удаление отменено');
  }

  async testSaveConfirmation() {
    await this.clickSaveChanges();
    await this.expectConfirmModalToBeVisible('Сохранить внесенные изменения?');
    
    // Подтверждаем сохранение
    await this.confirmAction();
    await this.expectConfirmModalToBeHidden();
    await this.expectActionResultToBeVisible('Изменения сохранены');
  }

  async testDangerOnlyScenario() {
    // Пытаемся удалить первый элемент
    await this.clickButton('button:has-text("Удалить"):first-of-type');
    await this.expectConfirmModalToBeVisible('Удалить "Важный документ"?');
    
    // Подтверждаем удаление
    await this.confirmDelete();
    await this.expectConfirmModalToBeHidden();
    
    // Проверяем, что элемент появился в списке удаленных
    await this.expectDeletedItemsToBeVisible(['Важный документ']);
    
    // Проверяем, что кнопка стала неактивной
    await this.expectButtonToBeDisabled('Удален');
  }
}
