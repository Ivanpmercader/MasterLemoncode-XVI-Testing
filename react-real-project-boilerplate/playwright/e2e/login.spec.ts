import { test, expect } from '@playwright/test';

async function checkInputsInLogin(page) {
  // Act
  await page.goto('/');

  const textboxInput = page.getByRole('textbox', { name: 'Usuario *' });
  const passwordInput = page.getByLabel('Contraseña *');

  //Assert
  await expect(textboxInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  return {
    textboxInput,
    passwordInput
  }
}

test('should visit login in root url', async ({ page }) => {
  //Arrange

  //Act
  await page.goto('/');

  //Assert
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('should visit login and check if inputs are visible', async ({ page }) => {
  //Arrange
  // Act
  // await page.goto('/');

  // const textboxInput = page.getByRole('textbox', { name: 'Usuario *' });
  // const passwordInput = page.getByLabel('Contraseña *');

  //Assert
  // await expect(textboxInput).toBeVisible();
  // await expect(passwordInput).toBeVisible();

  await checkInputsInLogin(page);
});


test('should visit login and fill the inputs', async ({ page }) => {
  //Arrange
  const user: string = 'admin';
  const password: string = 'test';

  // Act

  const { textboxInput, passwordInput} = await checkInputsInLogin(page);
  // await page.goto('/');

  // const textboxInput = page.getByRole('textbox', { name: 'Usuario *' });
  // const passwordInput = page.getByLabel('Contraseña *');

  await textboxInput.fill(user);
  await passwordInput.fill(password);

  //Assert
  // await expect(textboxInput).toBeVisible();
  // await expect(passwordInput).toBeVisible();

  await expect(textboxInput).toHaveValue(user);
  await expect(passwordInput).toHaveValue(password);
});

test('should visit login, fill inputs and navigate to submodule list', async ({ page }) => {
  //Arrange
  const user: string = 'admin';
  const password: string = 'test';

  // Act
  const { textboxInput, passwordInput} = await checkInputsInLogin(page);
  await textboxInput.fill(user);
  await passwordInput.fill(password);
  
  const button = page.getByRole('button', { name: /login/i });
  await button.click();

  await page.waitForURL('#/submodule-list');
  const submoduleListTitle = page.getByRole('heading', { name: /origin - project tracker/i });
  
  const main = page.getByRole('main');
  const linkListItems = main.getByRole('link'); //Check if exist links inside of main

  //Assert
  await expect(submoduleListTitle).toBeVisible();
  await expect(linkListItems).toHaveCount(2);
});
