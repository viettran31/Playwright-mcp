import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly totalLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item, .tb-cart-item, .cart-row');
    this.totalLocator = page.locator('.total, .cart-total, [data-testid="cart-total"]');
  }

  async countItems(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItemByName(name: string): Promise<boolean> {
    const item = this.page.getByText(new RegExp(name, 'i')).first();
    if (await item.count() === 0) return false;
    const removeBtn = item.locator('button', { hasText: /remove|delete|trash/i });
    if (await removeBtn.count() === 0) return false;
    await removeBtn.first().click();
    return true;
  }

  async getTotal(): Promise<number | null> {
    const c = await this.totalLocator.count();
    if (c === 0) return null;
    const text = await this.totalLocator.first().textContent();
    if (!text) return null;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? null : num;
  }
}
