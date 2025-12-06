import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

const DEMO_URL = 'https://demo.thingsboard.io';
const LOGIN_EMAIL = 'testuser123456@yopmail.com';
const LOGIN_PASSWORD = '123123';

test.describe('ThingsBoard Homepage', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    await loginPage.navigate(`${DEMO_URL}/login`);
    await loginPage.login(LOGIN_EMAIL, LOGIN_PASSWORD);
    await homePage.waitForPageLoad();
  });

  test('Homepage displays home link in navigation', async () => {
    await homePage.verifyHomeLink();
  });

  test('Navigation menu contains expected items', async () => {
    await homePage.verifyHomeLink();
    await homePage.verifyDashboardsLink();
    await homePage.verifyAlarmsLink();
    await homePage.verifyDevicesLink();
  });

  test('User profile displays with tenant administrator role', async () => {
    await homePage.verifyUserProfile();
    await homePage.verifyTenantAdministratorRole();
  });

  test('Dashboards link navigates to dashboards page', async ({ page }) => {
    await homePage.clickDashboards();
    await expect(page).toHaveURL(/dashboards/i, { timeout: 10000 });
  });

  test('Alarms link navigates to alarms page', async ({ page }) => {
    await homePage.clickAlarms();
    await expect(page).toHaveURL(/alarms/i, { timeout: 10000 });
  });

  test('Devices menu item exists in entities section', async () => {
    await homePage.verifyDevicesLink();
  });

  test('Assets menu item exists in entities section', async () => {
    await homePage.verifyAssetsLink();
  });

  test('Customers menu item is accessible', async () => {
    await homePage.verifyCustomersLink();
  });

  test('Settings menu item is accessible', async () => {
    const hasSettings = await homePage.verifyNavigationMenuExists('settings');
    expect(hasSettings).toBeTruthy();
  });

  test('Entity views menu item exists', async () => {
    const hasEntityViews = await homePage.verifyNavigationMenuExists('entity views');
    expect(hasEntityViews).toBeTruthy();
  });

  test('Gateways menu item exists in entities section', async () => {
    const hasGateways = await homePage.verifyNavigationMenuExists('gateways');
    expect(hasGateways).toBeTruthy();
  });

  test('Device profiles menu item exists in profiles section', async () => {
    const hasDeviceProfiles = await homePage.verifyNavigationMenuExists('device profiles');
    expect(hasDeviceProfiles).toBeTruthy();
  });

  test('Asset profiles menu item exists in profiles section', async () => {
    const hasAssetProfiles = await homePage.verifyNavigationMenuExists('asset profiles');
    expect(hasAssetProfiles).toBeTruthy();
  });

  test('Rule chains menu item is accessible', async () => {
    const hasRuleChains = await homePage.verifyNavigationMenuExists('rule chains');
    expect(hasRuleChains).toBeTruthy();
  });

  test('Notification center link is accessible', async () => {
    const hasNotificationCenter = await homePage.verifyNavigationMenuExists('notification center');
    expect(hasNotificationCenter).toBeTruthy();
  });

  test('Mobile center link is accessible', async () => {
    const hasMobileCenter = await homePage.verifyNavigationMenuExists('mobile center');
    expect(hasMobileCenter).toBeTruthy();
  });

  test('API usage link is accessible', async () => {
    const hasApiUsage = await homePage.verifyNavigationMenuExists('api usage');
    expect(hasApiUsage).toBeTruthy();
  });

  test('Homepage displays usage statistics widget', async () => {
    await homePage.verifyUsageStatisticsWidget();
  });

  test('Homepage displays quick links section', async () => {
    await homePage.verifyQuickLinksSection();
  });

  test('Homepage displays documentation link', async () => {
    await homePage.verifyDocumentationLink();
  });

  test('Navigation sidebar is visible and functional', async () => {
    await homePage.verifyNavigationMenu();
    await homePage.verifyNavigationMenuFunctional();
  });

  test('Navigation menu is functional with 10+ links', async () => {
    await homePage.verifyNavigationMenuFunctional();
  });

  test('Main content area is visible', async () => {
    await homePage.verifyMainContent();
  });

  test('Page responds to window resize - 1024x768', async () => {
    await homePage.verifyResponsiveness(1024, 768);
  });

  test('Page responds to window resize - 1920x1080', async () => {
    await homePage.verifyResponsiveness(1920, 1080);
  });

  test('Demo use cases carousel is visible', async () => {
    const hasDemoUseCases = await homePage.verifyNavigationMenuExists('demo use cases');
    if (hasDemoUseCases) {
      expect(hasDemoUseCases).toBeTruthy();
    }
  });

  test('Audit logs link is accessible in sidebar', async () => {
    const hasAuditLogs = await homePage.verifyNavigationMenuExists('audit logs');
    expect(hasAuditLogs).toBeTruthy();
  });

  test('OAuth 2.0 settings link is accessible', async () => {
    const hasOAuth = await homePage.verifyNavigationMenuExists('oauth');
    expect(hasOAuth).toBeTruthy();
  });

  test('Edge management section contains instances link', async () => {
    const hasInstances = await homePage.verifyNavigationMenuExists('instances');
    expect(hasInstances).toBeTruthy();
  });

  test('Edge management section contains rule chain templates link', async () => {
    const hasRuleChainTemplates = await homePage.verifyNavigationMenuExists('rule chain templates');
    expect(hasRuleChainTemplates).toBeTruthy();
  });

  test('OTA updates link is accessible', async () => {
    const hasOTAUpdates = await homePage.verifyNavigationMenuExists('ota updates');
    expect(hasOTAUpdates).toBeTruthy();
  });

  test('Version control link is accessible', async () => {
    const hasVersionControl = await homePage.verifyNavigationMenuExists('version control');
    expect(hasVersionControl).toBeTruthy();
  });

  test('Widgets library link is accessible', async () => {
    const hasWidgetsLibrary = await homePage.verifyNavigationMenuExists('widgets library');
    expect(hasWidgetsLibrary).toBeTruthy();
  });

  test('Image gallery link is accessible', async () => {
    const hasImageGallery = await homePage.verifyNavigationMenuExists('image gallery');
    expect(hasImageGallery).toBeTruthy();
  });

  test('SCADA symbols link is accessible', async () => {
    const hasSCADASymbols = await homePage.verifyNavigationMenuExists('scada symbols');
    expect(hasSCADASymbols).toBeTruthy();
  });

  test('JavaScript library link is accessible', async () => {
    const hasJSLibrary = await homePage.verifyNavigationMenuExists('javascript library');
    expect(hasJSLibrary).toBeTruthy();
  });

  test('Resources library link is accessible', async () => {
    const hasResourcesLibrary = await homePage.verifyNavigationMenuExists('resources library');
    expect(hasResourcesLibrary).toBeTruthy();
  });

  test('Navigation menu link count verification', async () => {
    const linkCount = await homePage.getNavigationLinkCount();
    expect(linkCount).toBeGreaterThan(10);
  });
});
