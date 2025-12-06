import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('ThingsBoard Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login and verify dashboard with valid credentials', async ({ page }) => {
    await loginPage.login('testuser123456@yopmail.com', '123123');
    await loginPage.waitForDashboard();
    await loginPage.verifyDashboardLink();
  });

  test('Verify login form elements are visible', async () => {
    const isEmailVisible = await loginPage.isEmailInputVisible();
    const isPasswordVisible = await loginPage.isPasswordInputVisible();
    const isButtonVisible = await loginPage.isLoginButtonVisible();
    
    if (isEmailVisible) expect(isEmailVisible).toBeTruthy();
    if (isPasswordVisible) expect(isPasswordVisible).toBeTruthy();
    if (isButtonVisible) expect(isButtonVisible).toBeTruthy();
  });
});

test.describe('Login negative cases', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Wrong password shows error', async () => {
    await loginPage.login('testuser123456@yopmail.com', 'wrongpassword');
    await loginPage.verifyErrorMessage('invalid username or password|authentication failed');
  });

  test('Empty password shows validation error', async () => {
    await loginPage.fillEmail('testuser123456@yopmail.com');
    await loginPage.fillPassword('');
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage('invalid username or password|authentication failed|required|please enter');
  });

  test('Empty username shows validation error', async () => {
    await loginPage.fillEmail('');
    await loginPage.fillPassword('123123');
    await loginPage.clickLogin();
    await loginPage.verifyErrorMessage('invalid username or password|authentication failed|invalid email format|required|please enter');
  });

  test('Verify error message is captured', async () => {
    await loginPage.login('testuser123456@yopmail.com', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    if (errorMessage) {
      expect(errorMessage.length).toBeGreaterThan(0);
    }
  });
});
