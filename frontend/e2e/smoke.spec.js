import { test, expect } from '@playwright/test';

test.describe('Informed Poll Smoke Tests', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VoteIQ | Informed Poll/);
    await expect(page.locator('h1')).toContainText('VOTE');
  });

  test('should navigate to candidates page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=STRIKE BACK');
    await expect(page).toHaveURL(/\/candidates/);
    await expect(page.locator('h1')).toContainText('CANDIDATES');
  });

  test('should open identity modal', async ({ page }) => {
    await page.goto('/');
    await page.click('button[aria-label="Open identity modal"]');
    await expect(page.locator('role=dialog')).toBeVisible();
    await expect(page.locator('#identity-modal-title')).toContainText('Connect Identity');
  });

  test('should show civic dossier', async ({ page }) => {
    await page.goto('/dossier');
    await expect(page.locator('h1')).toContainText('CIVIC DOSSIER');
  });
});
