import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel(/username \(email\)|email|username/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /log in|login|sign in/i });
    this.errorMessage = page.getByText(/invalid username or password|authentication failed|invalid email format|required|please enter/i);
  }

  async navigate(url: string = 'https://demo.thingsboard.io/login') {
    await this.page.goto(url);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async enterUsername(username: string) {
    await this.fillEmail(username);
  }

  async enterPassword(password: string) {
    await this.fillPassword(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async waitForDashboard(timeout: number = 20000) {
    await this.page.waitForURL(/home|dashboard|dashboards|tenant/i, { timeout });
  }

  async verifyDashboardLink() {
    await expect(this.page.getByRole('link', { name: /dashboards/i })).toBeVisible({ timeout: 20000 });
  }

  async verifyErrorMessage(expected?: string) {
    if (expected) {
      const loc = this.page.getByText(new RegExp(expected, 'i'));
      await expect(loc).toBeVisible({ timeout: 5000 });
    } else {
      await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    }
  }

  async getErrorMessage(): Promise<string | null> {
    const count = await this.errorMessage.count();
    if (count === 0) return null;
    const text = await this.errorMessage.first().textContent();
    return text ? text.trim() : null;
  }

  async isEmailInputVisible(): Promise<boolean> {
    const count = await this.emailInput.count();
    return count > 0;
  }

  async isPasswordInputVisible(): Promise<boolean> {
    const count = await this.passwordInput.count();
    return count > 0;
  }

  async isLoginButtonVisible(): Promise<boolean> {
    const count = await this.loginButton.count();
    return count > 0;
  }
}
