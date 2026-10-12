import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import type { LoginPage } from '../../pages/LoginPage';
import type { InventoryPage } from '../../pages/InventoryPage';
import type { CartPage } from '../../pages/CartPage';
import type { CheckoutPage } from '../../pages/CheckoutPage';

export class SauceDemoWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(SauceDemoWorld);
