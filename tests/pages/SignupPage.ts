import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly signupLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly privacyCheckbox: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLink = page.getByRole('link', { name: /sign up/i });
    this.firstNameInput = page.getByRole('textbox', { name: /first name/i });
    this.lastNameInput = page.getByRole('textbox', { name: /last name/i });
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByLabel(/create a password/i);
    this.confirmPasswordInput = page.getByLabel(/repeat your password/i);
    this.privacyCheckbox = page.getByRole('checkbox', { name: /accept.*privacy|privacy policy/i });
    this.signupButton = page.getByRole('button', { name: /sign up|create|register/i });
  }

  async navigate(url: string = 'https://demo.thingsboard.io/login') {
    await this.page.goto(url);
  }

  async navigateToSignup(url: string = 'https://demo.thingsboard.io/signup') {
    await this.page.goto(url);
  }

  async openSignup() {
    // If we're on the login page, click the signup link
    if (await this.signupLink.count() > 0) {
      await this.signupLink.click();
    } else {
      // Otherwise navigate directly to signup
      await this.navigateToSignup();
    }
    // Wait for signup form to be ready
    await this.firstNameInput.waitFor({ timeout: 10000 });
  }

  async clickSignupLink() {
    await this.openSignup();
  }

  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.confirmPasswordInput.fill(value);
  }

  async acceptPrivacy() {
    const c = await this.privacyCheckbox.count();
    if (c > 0) await this.privacyCheckbox.check();
    else {
      const fallback = this.page.locator('input[type="checkbox"]');
      if (await fallback.count() > 0) await fallback.first().check();
    }
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    // Don't call openSignup here - assume we're already on the signup form
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.acceptPrivacy();
    await this.clickSignup();
  }

  async isSignupFormReady(): Promise<boolean> {
    const c1 = await this.firstNameInput.count();
    const c2 = await this.lastNameInput.count();
    const c3 = await this.emailInput.count();
    const c4 = await this.passwordInput.count();
    return c1 + c2 + c3 + c4 > 0;
  }

  async isFirstNameInputVisible(): Promise<boolean> {
    return await this.firstNameInput.count() > 0;
  }

  async getValidationErrors(): Promise<string[]>
  {
    const errors = this.page.getByText(/required|invalid|please enter|must be/i);
    const count = await errors.count();
    const out: string[] = [];
    for (let i=0;i<count;i++) {
      const t = await errors.nth(i).textContent();
      if (t) out.push(t.trim());
    }
    return out;
  }

  async verifySignupRedirect() {
    // Wait for redirect to signup form or success page
    await this.page.waitForURL(/signup|created|success/i, { timeout: 10000 });
  }

  async verifySuccessMessage() {
    // Check for success messages
    const successMsg = this.page.getByText(/successfully|account.*created|registered|confirmation/i);
    const count = await successMsg.count();
    if (count > 0) {
      await expect(successMsg.first()).toBeVisible({ timeout: 5000 });
    }
  }
}
