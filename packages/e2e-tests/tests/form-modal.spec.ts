import { test } from './fixtures/modal-fixtures';

test.describe('form Modal Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should navigate to Form Modal default story', async ({
    formModalPage,
  }) => {
    await formModalPage.navigateToDefaultStory();
    await formModalPage.expectStoryTitleToContain(
      'Демонстрация модалки с формой',
    );
  });

  test('should test form submission with valid data', async ({
    formModalPage,
  }) => {
    await formModalPage.navigateToDefaultStory();
    await formModalPage.testFormSubmission('John Doe', 'john@example.com');
  });

  test('should test form validation', async ({ formModalPage }) => {
    await formModalPage.navigateToValidationStory();
    await formModalPage.testFormValidation();
  });

  test('should test form cancellation', async ({ formModalPage }) => {
    await formModalPage.navigateToDefaultStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    await formModalPage.cancelForm();
    await formModalPage.expectFormModalToBeClosed();
  });

  test('should test form with empty fields', async ({ formModalPage }) => {
    await formModalPage.navigateToDefaultStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    // Пытаемся отправить пустую форму
    await formModalPage.submitForm();

    // Проверяем, что форма не закрылась (валидация сработала)
    await formModalPage.expectModalToBeOpen();

    await formModalPage.cancelForm();
    await formModalPage.expectFormModalToBeClosed();
  });

  test('should test form with invalid email', async ({ formModalPage }) => {
    await formModalPage.navigateToValidationStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    await formModalPage.fillForm('John', 'invalid-email');
    await formModalPage.submitForm();

    // Проверяем, что форма не закрылась из-за невалидного email
    await formModalPage.expectModalToBeOpen();

    await formModalPage.cancelForm();
    await formModalPage.expectFormModalToBeClosed();
  });

  test('should test keyboard navigation in form', async ({ formModalPage }) => {
    await formModalPage.navigateToDefaultStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    // Нажимаем Escape для закрытия
    await formModalPage.pressKey('Escape');
    await formModalPage.expectFormModalToBeClosed();
  });

  test('should test form input validation', async ({ formModalPage }) => {
    await formModalPage.navigateToValidationStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    // Проверяем валидацию полей
    await formModalPage.expectInputToBeInvalid('#name');
    await formModalPage.expectInputToBeInvalid('#email');

    await formModalPage.cancelForm();
    await formModalPage.expectFormModalToBeClosed();
  });

  test('should test form with special characters', async ({
    formModalPage,
  }) => {
    await formModalPage.navigateToDefaultStory();

    await formModalPage.testFormSubmission(
      'José María',
      'jose.maria@example.com',
    );
  });

  test('should test form accessibility', async ({ formModalPage }) => {
    await formModalPage.navigateToDefaultStory();

    await formModalPage.openFormModal();
    await formModalPage.expectModalToBeOpen();

    // Проверяем, что поля имеют правильные лейблы
    await formModalPage.expectTextToBeVisible('Имя:');
    await formModalPage.expectTextToBeVisible('Email:');

    await formModalPage.cancelForm();
    await formModalPage.expectFormModalToBeClosed();
  });
});
