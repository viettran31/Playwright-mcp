import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly searchInput: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
    this.productItems = page.locator('.product, .product-item, article');
  }

  async search(query: string): Promise<number> {
    const count = await this.searchInput.count();
    if (count === 0) return 0;
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(400);
    return await this.productItems.count();
  }

  async addToCartByName(name: string): Promise<boolean> {
    const item = this.page.getByText(new RegExp(name, 'i')).first();
    if (await item.count() === 0) return false;
    const addBtn = item.locator('button', { hasText: /add to cart|add|buy/i });
    if (await addBtn.count() === 0) return false;
    await addBtn.first().click();
    return true;
  }
}
