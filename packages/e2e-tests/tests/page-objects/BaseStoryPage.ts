import { Page, Locator, expect } from '@playwright/test';

export class BaseStoryPage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Базовые локаторы
  protected get storyTitle(): Locator {
    return this.page.locator('h3').first();
  }
  protected get storyDescription(): Locator {
    return this.page.locator('p').first();
  }
  protected get modalOverlay(): Locator {
    return this.page.locator('.modal-overlay');
  }
  protected get modalContent(): Locator {
    return this.page.locator('.modal-content');
  }
  protected get modalCloseButton(): Locator {
    return this.page.getByRole('button', { name: 'Закрыть' });
  }
  protected get modalCancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Отмена' });
  }
  protected get modalConfirmButton(): Locator {
    return this.page.getByRole('button', { name: 'Подтвердить' });
  }
  protected get modalSubmitButton(): Locator {
    return this.page.getByRole('button', { name: 'Сохранить' });
  }
  protected get modalDeleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Да, удалить' });
  }

  // Навигация
  async navigateToStory(storyId: string) {
    await this.page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Проверки видимости
  async expectElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementNotToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeHidden();
  }

  async expectElementToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  async expectTextToBeVisible(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }

  async expectTextNotToBeVisible(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeHidden();
  }

  async expectStoryTitleToContain(title: string) {
    await expect(this.storyTitle).toContainText(title);
  }

  async expectStoryDescriptionToContain(description: string) {
    await expect(this.storyDescription).toContainText(description);
  }

  // Взаимодействие с элементами
  async clickButton(text: string) {
    await this.page.click(`text=${text}`);
  }

  async clickButtonByRole(role: 'button' | 'link' | 'menuitem', name: string) {
    await this.page.getByRole(role, { name }).click();
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async fillInputByLabel(label: string, value: string) {
    await this.page.getByLabel(label).fill(value);
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  // Модальные окна
  async waitForModalToBeVisible() {
    await expect(this.modalOverlay).toBeVisible();
    await expect(this.modalContent).toBeVisible();
  }

  async waitForModalToBeHidden() {
    await expect(this.modalOverlay).toBeHidden();
  }

  async expectModalToBeOpen() {
    await expect(this.modalContent).toBeVisible();
  }

  async expectModalToBeClosed() {
    await expect(this.modalContent).toBeHidden();
  }

  async closeModalByButton() {
    await this.modalCloseButton.click();
  }

  async closeModalByCancel() {
    await this.modalCancelButton.click();
  }

  async confirmModal() {
    await this.modalConfirmButton.click();
  }

  async submitModal() {
    await this.modalSubmitButton.click();
  }

  async deleteModal() {
    await this.modalDeleteButton.click();
  }

  async clickModalOverlay() {
    await this.page.click('.modal-overlay', { position: { x: 10, y: 10 } });
  }

  // Утилиты
  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async waitForElement(selector: string, timeout = 5000) {
    await this.page.locator(selector).waitFor({ timeout });
  }

  async waitForText(text: string, timeout = 5000) {
    await this.page.locator(`text=${text}`).waitFor({ timeout });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Проверки состояния
  async expectButtonToBeEnabled(buttonText: string) {
    await expect(
      this.page.getByRole('button', { name: buttonText }),
    ).toBeEnabled();
  }

  async expectButtonToBeDisabled(buttonText: string) {
    await expect(
      this.page.getByRole('button', { name: buttonText }),
    ).toBeDisabled();
  }

  async expectInputToHaveValue(selector: string, value: string) {
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  async expectInputToBeInvalid(selector: string) {
    await expect(this.page.locator(selector)).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  }

  async expectInputToBeValid(selector: string) {
    const element = this.page.locator(selector);
    // Проверяем, что элемент не имеет aria-invalid или имеет значение false
    await expect(element).not.toHaveAttribute('aria-invalid', 'true');
  }
}
