import type { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly productCards: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProduct(productName: string): Promise<void> {
    const productCard = this.productCards.filter({
      has: this.page.getByText(productName, { exact: true })
    });

    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
