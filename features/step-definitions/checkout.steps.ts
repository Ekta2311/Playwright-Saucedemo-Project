import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { SauceDemoWorld } from '../support/world';

Given('I open the login page', async function (this: SauceDemoWorld) {
  await this.loginPage.open();
});

When(
  'I log in with username {string} and password {string}',
  async function (this: SauceDemoWorld, username: string, password: string) {
    await this.loginPage.signIn(username, password);
  }
);

Then('I should see the products page', async function (this: SauceDemoWorld) {
  await expect(this.page).toHaveURL(/inventory\.html$/);
  await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
});

Given(
  'I open the products page as an authenticated user',
  async function (this: SauceDemoWorld) {
    await this.page.goto('/inventory.html');
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }
);

When('I add {string} to the cart', async function (this: SauceDemoWorld, productName: string) {
  await this.inventoryPage.addProduct(productName);
});

When('I remove {string} from the cart', async function (this: SauceDemoWorld, productName: string) {
  const card = this.cartPage.items.filter({
    has: this.page.getByText(productName, { exact: true })
  });
  await card.getByRole('button', { name: 'Remove' }).click();
});

When('I open the cart', async function (this: SauceDemoWorld) {
  await this.inventoryPage.openCart();
});

Then('the cart should contain {string}', async function (this: SauceDemoWorld, productName: string) {
  await expect(
    this.cartPage.items.filter({
      has: this.page.getByText(productName, { exact: true })
    })
  ).toHaveCount(1);
});

Then('the cart should be empty', async function (this: SauceDemoWorld) {
  await expect(this.cartPage.items).toHaveCount(0);
});

When('I start checkout', async function (this: SauceDemoWorld) {
  await this.cartPage.startCheckout();
  await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
});

When(
  'I enter first name {string}, last name {string} and postal code {string}',
  async function (
    this: SauceDemoWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.checkoutPage.enterCustomerDetails(firstName, lastName, postalCode);
  }
);

When('I continue to the order overview', async function (this: SauceDemoWorld) {
  await this.checkoutPage.continueButton.click();
  await expect(this.page).toHaveURL(/checkout-step-two\.html$/);
});

Then('the order overview should contain {string}', async function (this: SauceDemoWorld, productName: string) {
  await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  await expect(this.page.getByText('Payment Information')).toBeVisible();
  await expect(this.page.getByText('Shipping Information')).toBeVisible();
});

When('I finish the order', async function (this: SauceDemoWorld) {
  await this.checkoutPage.finishButton.click();
});

Then('I should see the order confirmation', async function (this: SauceDemoWorld) {
  await expect(this.page).toHaveURL(/checkout-complete\.html$/);
  await expect(this.checkoutPage.confirmationMessage).toBeVisible();
});

Then(
  'empty cart checkout should be blocked with a message or cart redirect',
  async function (this: SauceDemoWorld) {
    await expect(this.page).not.toHaveURL(/checkout-complete\.html$/, {
      timeout: 1000
    });
    await expect
      .poll(
        async () => {
          const returnedToCart = /cart\.html$/.test(this.page.url());
          const validationMessageVisible = await this.checkoutPage.errorMessage.isVisible();
          return returnedToCart || validationMessageVisible;
        },
        { timeout: 3000 }
      )
      .toBe(true);
  }
);

When(
  'I attempt checkout from an empty cart with valid customer information',
  async function (this: SauceDemoWorld) {
    const checkoutButton = this.cartPage.checkoutButton;
    if (await checkoutButton.isEnabled()) {
      await checkoutButton.click();
    }

    const checkoutState = async (): Promise<string> => {
      if (/cart\.html$/.test(this.page.url())) return 'cart';
      if (/checkout-step-one\.html$/.test(this.page.url())) return 'information';
      if (await this.checkoutPage.errorMessage.isVisible()) return 'rejected';
      return 'loading';
    };

    await expect.poll(checkoutState, { timeout: 5000 }).toMatch(/cart|information|rejected/);
    if ((await checkoutState()) !== 'information') return;

    await this.checkoutPage.enterCustomerDetails('Test', 'Customer', '12345');
    await this.checkoutPage.continueButton.click();

    const overviewState = async (): Promise<string> => {
      if (/checkout-step-two\.html$/.test(this.page.url())) return 'overview';
      if (/cart\.html$/.test(this.page.url())) return 'cart';
      if (await this.checkoutPage.errorMessage.isVisible()) return 'rejected';
      return 'loading';
    };

    await expect
      .poll(overviewState, { timeout: 5000 })
      .toMatch(/overview|cart|rejected/);
    if ((await overviewState()) === 'overview') {
      await this.checkoutPage.finishButton.click();
    }
  }
);

Then('I should see a login error', async function (this: SauceDemoWorld) {
  await expect(this.loginPage.errorMessage).toBeVisible();
  await expect(this.page).not.toHaveURL(/inventory\.html$/);
});

When('I reload the browser page', async function (this: SauceDemoWorld) {
  await this.page.reload();
});

Then('I should still see the products page', async function (this: SauceDemoWorld) {
  await expect(this.page).toHaveURL(/inventory\.html$/);
  await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
});

Then('the cart badge should show {string}', async function (this: SauceDemoWorld, count: string) {
  await expect(this.inventoryPage.cartBadge).toHaveText(count);
});

When('I continue without entering customer details', async function (this: SauceDemoWorld) {
  await this.checkoutPage.continueButton.click();
});

Then(
  'I should see a checkout validation error mentioning {string}',
  async function (this: SauceDemoWorld, fieldName: string) {
    await expect(this.checkoutPage.errorMessage).toContainText(new RegExp(fieldName, 'i'));
  }
);
