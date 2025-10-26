import { test as base, expect } from '@playwright/test';
import { BaseStoryPage } from '../page-objects/BaseStoryPage';
import { SimpleModalPage } from '../page-objects/SimpleModalPage';
import { FormModalPage } from '../page-objects/FormModalPage';
import { ConfirmModalPage } from '../page-objects/ConfirmModalPage';

// Базовый fixture с общими page-objects
export const test = base.extend<{
  basePage: BaseStoryPage;
  simpleModalPage: SimpleModalPage;
  formModalPage: FormModalPage;
  confirmModalPage: ConfirmModalPage;
}>({
  basePage: async ({ page }, use) => {
    const basePage = new BaseStoryPage(page);
    await use(basePage);
  },

  simpleModalPage: async ({ page }, use) => {
    const simpleModalPage = new SimpleModalPage(page);
    await use(simpleModalPage);
  },

  formModalPage: async ({ page }, use) => {
    const formModalPage = new FormModalPage(page);
    await use(formModalPage);
  },

  confirmModalPage: async ({ page }, use) => {
    const confirmModalPage = new ConfirmModalPage(page);
    await use(confirmModalPage);
  },
});

// Утилиты для тестов
export const testUtils = {
  async navigateToStorybook(page: any) {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  },

  async expectStoryToLoad(page: any, storyTitle: string) {
    await expect(page.locator('h3')).toContainText(storyTitle);
  },

  async takeScreenshotOnFailure(page: any, testName: string) {
    if (test.info().status === 'failed') {
      await page.screenshot({
        path: `test-results/screenshots/${testName}-failed.png`,
        fullPage: true,
      });
    }
  },
};

export { expect };
