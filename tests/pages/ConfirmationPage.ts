import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  readonly message: any;
  constructor(page: Page) {
    super(page);
    this.message = page.getByText(/thank you|order confirmation|purchase confirmed|confirmation/i);
  }

  async getMessage(): Promise<string | null> {
    const c = await this.message.count();
    if (c === 0) return null;
    const t = await this.message.first().textContent();
    return t ? t.trim() : null;
  }
}
