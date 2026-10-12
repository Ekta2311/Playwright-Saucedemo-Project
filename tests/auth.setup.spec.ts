import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

test('save authenticated state for BDD scenarios', async ({ page, context }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html$/);

  const authDir = path.join(process.cwd(), 'playwright', '.auth');
  await fs.mkdir(authDir, { recursive: true });

  await context.storageState({
    path: path.join(authDir, 'user.json')
  });

  const sessionStorageData = await page.evaluate(() => {
    const data: Record<string, string> = {};
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index);
      if (key !== null) {
        data[key] = window.sessionStorage.getItem(key) ?? '';
      }
    }
    return data;
  });

  await fs.writeFile(
    path.join(authDir, 'session-storage.json'),
    JSON.stringify(sessionStorageData, null, 2)
  );
});
