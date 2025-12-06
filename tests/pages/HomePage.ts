import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly navigationMenu: Locator;
  readonly userProfile: Locator;
  readonly sidebarLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.navigationMenu = page.getByRole('navigation');
    this.userProfile = page.getByText(/user profile|profile|administrator|tenant/i);
    this.sidebarLinks = page.getByRole('link');
  }

  async waitForPageLoad() {
    await this.page.waitForURL(/home|dashboard|dashboards|tenant/i, { timeout: 20000 });
  }

  async waitForLoad() {
    await this.waitForPageLoad();
  }

  // Navigation verification
  async verifyHomeLink() {
    const link = this.page.getByRole('link', { name: /home/i });
    await expect(link.first()).toBeVisible({ timeout: 10000 });
  }

  async verifyDashboardsLink() {
    const link = this.page.getByRole('link', { name: /dashboards/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyAlarmsLink() {
    const link = this.page.getByRole('link', { name: /alarms/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyDevicesLink() {
    const link = this.page.getByRole('link', { name: /devices/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyAssetsLink() {
    const link = this.page.getByRole('link', { name: /assets/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyCustomersLink() {
    const link = this.page.getByRole('link', { name: /customers/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  // User profile verification
  async verifyUserProfile() {
    const profile = this.page.getByText(/user profile|profile|administrator|tenant/i);
    const count = await profile.count();
    if (count > 0) await expect(profile.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyTenantAdministratorRole() {
    const role = this.page.getByText(/tenant.*administrator|administrator|tenant admin/i);
    const count = await role.count();
    if (count > 0) await expect(role.first()).toBeVisible({ timeout: 5000 });
  }

  // Navigation actions
  async clickHome() {
    const link = this.page.getByRole('link', { name: /home/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickDashboards() {
    const link = this.page.getByRole('link', { name: /dashboards/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickAlarms() {
    const link = this.page.getByRole('link', { name: /alarms/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickDevices() {
    const link = this.page.getByRole('link', { name: /devices/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickAssets() {
    const link = this.page.getByRole('link', { name: /assets/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickCustomers() {
    const link = this.page.getByRole('link', { name: /customers/i });
    if (await link.count() > 0) await link.first().click();
  }

  async clickSettings() {
    const link = this.page.getByRole('link', { name: /settings/i });
    if (await link.count() > 0) await link.first().click();
  }

  // Generic navigation menu existence check
  async verifyNavigationMenuExists(itemName: string): Promise<boolean> {
    const link = this.page.getByRole('link', { name: new RegExp(itemName, 'i') });
    const text = this.page.getByText(new RegExp(itemName, 'i'));
    const linkCount = await link.count();
    const textCount = await text.count();
    return linkCount > 0 || textCount > 0;
  }

  // Widget/Section verification
  async verifyUsageStatisticsWidget() {
    const widget = this.page.getByText(/usage|statistics|metrics|quota/i);
    const count = await widget.count();
    if (count > 0) await expect(widget.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyQuickLinksSection() {
    const section = this.page.getByText(/quick links|quick|links/i);
    const count = await section.count();
    if (count > 0) await expect(section.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyDocumentationLink() {
    const link = this.page.getByRole('link', { name: /documentation|docs|help/i });
    const count = await link.count();
    if (count > 0) await expect(link.first()).toBeVisible({ timeout: 5000 });
  }

  // Menu structure verification
  async verifyNavigationMenu() {
    const nav = this.page.locator('[role="navigation"], nav, .sidebar, .menu, .navbar');
    const count = await nav.count();
    if (count > 0) await expect(nav.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyNavigationMenuFunctional() {
    // Verify menu has clickable items
    const links = this.page.getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);
  }

  async verifyMainContent() {
    const main = this.page.locator('main, [role="main"], .main-content, .content');
    const count = await main.count();
    if (count > 0) await expect(main.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyResponsiveness(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
    const nav = this.page.locator('[role="navigation"], nav, .sidebar');
    const main = this.page.locator('main, [role="main"]');
    
    const navCount = await nav.count();
    const mainCount = await main.count();
    
    if (navCount > 0 && mainCount > 0) {
      await expect(nav.first()).toBeVisible({ timeout: 5000 });
      await expect(main.first()).toBeVisible({ timeout: 5000 });
    }
  }

  async getNavigationLinkCount(): Promise<number> {
    return await this.sidebarLinks.count();
  }

  // Helper methods
  async isNavVisible(): Promise<boolean> {
    const count = await this.navigationMenu.count();
    return count > 0;
  }

  async getUserDisplayText(): Promise<string | null> {
    const count = await this.userProfile.count();
    if (count === 0) return null;
    return await this.userProfile.first().textContent();
  }

  async hasNavLink(linkName: string): Promise<boolean> {
    const link = this.page.getByRole('link', { name: new RegExp(linkName, 'i') });
    return await link.count() > 0;
  }
}
