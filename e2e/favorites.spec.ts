import { expect, test } from '@playwright/test';

async function switchToGridLayout(page: Parameters<typeof test>[0]['page']) {
  await page.getByRole('button', { name: 'Side nav' }).click();
  await page.getByRole('radio', { name: 'Grid' }).click();
}

const mockItem = {
  id: 101,
  title: 'Example Hacker News story',
  url: 'https://example.com/story',
  by: 'tester',
  score: 42,
  time: 1700000000,
  type: 'story',
};

test.beforeEach(async ({ page }) => {
  await page.route('**/topstories.json**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([mockItem.id]),
    });
  });

  await page.route('**/item/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockItem),
    });
  });

  await page.route('**/api/items/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        size: 1,
        hasMore: false,
        entities: [mockItem],
      }),
    });
  });
});

test('adds a favorite item to the drawer', async ({ page }) => {
  await page.goto('/news/top');
  await switchToGridLayout(page);

  await expect(page.locator('.tile-title').first()).toBeVisible();
  await page.locator('.favorite-icon').first().click();

  await page.getByRole('button', { name: 'Side nav' }).click();
  await expect(page.getByText('Favorites')).toBeVisible();
  await expect(page.locator('.favorites-list a').first()).toContainText(mockItem.title);
});

test('removes a favorite item from the drawer', async ({ page }) => {
  await page.goto('/news/top');
  await switchToGridLayout(page);

  await expect(page.locator('.tile-title').first()).toBeVisible();
  await page.locator('.favorite-icon').first().click();

  await page.getByRole('button', { name: 'Side nav' }).click();
  await expect(page.locator('.favorites-list a').first()).toContainText(mockItem.title);

  const removeButton = page.locator('.remove-favorite-button').first();
  await expect(removeButton).toBeVisible();
  await removeButton.click({ force: true });
  await expect(page.locator('.favorites-list')).toContainText('No favorites yet.');
});
