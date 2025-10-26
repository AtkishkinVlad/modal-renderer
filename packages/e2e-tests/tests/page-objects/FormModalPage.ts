import { Page } from '@playwright/test';
import { BaseStoryPage } from './BaseStoryPage';

export class FormModalPage extends BaseStoryPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDefaultStory() {
    await this.navigateToStory('modal-renderer-form-modal--default');
  }

  async navigateToValidationStory() {
    await this.navigateToStory('modal-renderer-form-modal--with-validation');
  }

  async openFormModal() {
    await this.clickButton('Открыть форму');
  }

  async openFormModalWithValidation() {
    await this.clickButton('Открыть форму с валидацией');
  }

  async fillNameField(name: string) {
    await this.fillInput('input[type="text"]', name);
  }

  async fillEmailField(email: string) {
    await this.fillInput('input[type="email"]', email);
  }

  async submitForm() {
    await this.clickButton('Сохранить');
  }

  async cancelForm() {
    await this.clickButton('Отмена');
  }

  async expectFormToBeVisible() {
    await this.waitForModalToBeVisible();
    await this.expectTextToBeVisible('Форма в модалке');
  }

  async expectFormToBeHidden() {
    await this.waitForModalToBeHidden();
  }

  async expectFormDataToBeDisplayed(name: string, email: string) {
    await this.expectTextToBeVisible('Данные формы:');
    await this.expectTextToBeVisible(name);
    await this.expectTextToBeVisible(email);
  }

  async expectValidationErrorsToBeVisible() {
    await this.expectTextToBeVisible('Ошибки валидации:');
  }

  async testFormSubmission(name: string, email: string) {
    await this.openFormModal();
    await this.expectFormToBeVisible();
    
    // Заполняем форму
    await this.fillNameField(name);
    await this.fillEmailField(email);
    
    // Проверяем, что поля заполнились
    await this.expectElementToHaveText('input[type="text"]', name);
    await this.expectElementToHaveText('input[type="email"]', email);
    
    // Отправляем форму
    await this.submitForm();
    
    // Проверяем, что модалка закрылась и данные отобразились
    await this.expectFormToBeHidden();
    await this.expectFormDataToBeDisplayed(name, email);
  }

  async testFormValidation() {
    await this.openFormModalWithValidation();
    await this.expectFormToBeVisible();
    
    // Пытаемся отправить пустую форму
    await this.submitForm();
    
    // Проверяем, что модалка не закрылась (валидация сработала)
    await this.expectFormToBeVisible();
    
    // Закрываем через отмену
    await this.cancelForm();
    await this.expectFormToBeHidden();
  }
}
