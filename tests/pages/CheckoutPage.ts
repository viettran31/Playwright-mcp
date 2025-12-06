import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async completeCheckout(): Promise<boolean> {
    const checkoutBtn = this.page.getByRole('button', { name: /checkout|proceed to checkout|buy now/i });
    if (await checkoutBtn.count() === 0) return false;
    await checkoutBtn.first().click();
    const confirmBtn = this.page.getByRole('button', { name: /confirm|place order|complete purchase/i });
    if (await confirmBtn.count() === 0) return true; // assume single-step
    await confirmBtn.first().click();
    return true;
  }
}
