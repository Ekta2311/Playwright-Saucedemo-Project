import {
  BeforeAll,
  Before,
  After,
  AfterAll,
  Status,
  type ITestCaseHookParameter
} from '@cucumber/cucumber';
import { chromium, type Browser } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import type { SauceDemoWorld } from './world';

const baseURL = 'https://www.saucedemo.com';
const authDir = path.join(process.cwd(), 'playwright', '.auth');
const storageStatePath = path.join(authDir, 'user.json');
const sessionStoragePath = path.join(authDir, 'session-storage.json');
let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false'
  });
});

Before(async function (this: SauceDemoWorld, { pickle }: ITestCaseHookParameter) {
  const usesSavedLogin = pickle.tags.some((tag) => tag.name === '@authenticated');
  const contextOptions: { baseURL: string; storageState?: string } = { baseURL };

  if (usesSavedLogin) {
    await fs.access(storageStatePath);
    contextOptions.storageState = storageStatePath;
  }

  this.context = await browser.newContext(contextOptions);
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  if (usesSavedLogin) {
    try {
      const sessionData = JSON.parse(
        await fs.readFile(sessionStoragePath, 'utf8')
      ) as Record<string, string>;

      await this.context.addInitScript(
        ({ origin, data }) => {
          if (window.location.origin === origin) {
            for (const [key, value] of Object.entries(data)) {
              window.sessionStorage.setItem(key, value);
            }
          }
        },
        { origin: baseURL, data: sessionData }
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }

  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

After(async function (this: SauceDemoWorld, { pickle, result }: ITestCaseHookParameter) {
  const failed = result?.status === Status.FAILED;
  const safeName = pickle.name.replace(/[^a-z0-9-_]+/gi, '-').slice(0, 80);
  const evidenceDir = path.join(process.cwd(), 'evidence');
  await fs.mkdir(evidenceDir, { recursive: true });

  if (failed && this.page && this.context) {
    await this.page.screenshot({
      path: path.join(evidenceDir, `${safeName}.png`),
      fullPage: true
    });
    await this.context.tracing.stop({
      path: path.join(evidenceDir, `${safeName}-trace.zip`)
    });
  } else if (this.context) {
    await this.context.tracing.stop();
  }

  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
