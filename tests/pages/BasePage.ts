import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisible(selector: string | Locator, timeout: number = 10000): Promise<boolean> {
    try {
      if (typeof selector === 'string') {
        const loc = this.page.locator(selector);
        await loc.first().waitFor({ state: 'visible', timeout });
        return true;
      } else {
        await selector.first().waitFor({ state: 'visible', timeout });
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  async isButtonEnabled(locator: Locator): Promise<boolean> {
    const count = await locator.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      const item = locator.nth(i);
      const disabled = await item.getAttribute('disabled');
      if (!disabled) return true;
    }
    return false;
  }
}
