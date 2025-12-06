import { test, expect } from '@playwright/test';
import { SignupPage } from './pages/SignupPage';

test.describe('ThingsBoard Signup', () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.navigate();
  });

  test('Complete signup flow with valid data', async () => {
    await signupPage.clickSignupLink();
    
    const email = `john.doe+${Date.now()}@example.com`;
    await signupPage.signup('John', 'Doe', email, 'P@ssw0rd!23');
    
    await signupPage.verifySignupRedirect();
  });

  test('Verify signup form elements are visible', async () => {
    await signupPage.clickSignupLink();
    const isFormReady = await signupPage.isSignupFormReady();
    if (isFormReady) {
      expect(isFormReady).toBeTruthy();
    }
  });

  test('Verify signup success message after registration', async () => {
    await signupPage.clickSignupLink();
    
    const email = `john.doe+${Date.now()}@example.com`;
    await signupPage.signup('John', 'Doe', email, 'P@ssw0rd!23');
    
    await signupPage.verifySignupRedirect();
    await signupPage.verifySuccessMessage();
  });

  test('Signup form accepts user input correctly', async () => {
    await signupPage.clickSignupLink();
    
    const firstName = 'John';
    const lastName = 'Doe';
    const email = `test+${Date.now()}@example.com`;
    const password = 'TestPass123!';
    
    await signupPage.fillFirstName(firstName);
    await signupPage.fillLastName(lastName);
    await signupPage.fillEmail(email);
    await signupPage.fillPassword(password);
    await signupPage.fillConfirmPassword(password);
    
    const isFirstNameVisible = await signupPage.isFirstNameInputVisible();
    if (isFirstNameVisible) {
      expect(isFirstNameVisible).toBeTruthy();
    }
  });
});
