import { Page, Locator, expect } from '@playwright/test';

export class BaseStoryPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToStory(storyId: string) {
    await this.page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForModalToBeVisible() {
    await expect(this.page.locator('.modal-overlay')).toBeVisible();
    await expect(this.page.locator('.modal-content')).toBeVisible();
  }

  async waitForModalToBeHidden() {
    await expect(this.page.locator('.modal-overlay')).not.toBeVisible();
  }

  async clickButton(text: string) {
    await this.page.click(`text=${text}`);
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async expectTextToBeVisible(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }

  async expectTextNotToBeVisible(text: string) {
    await expect(this.page.locator(`text=${text}`)).not.toBeVisible();
  }

  async expectElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementNotToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).not.toBeVisible();
  }

  async expectElementToHaveText(selector: string, text: string) {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  async clickModalOverlay() {
    await this.page.click('.modal-overlay', { position: { x: 10, y: 10 } });
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }
}
