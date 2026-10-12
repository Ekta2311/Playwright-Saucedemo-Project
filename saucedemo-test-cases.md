# SauceDemo Test Cases

**Application:** https://www.saucedemo.com/
**Total test cases:** 20

This file contains the test cases converted from the supplied spreadsheet. Test case content is retained; blank priority values remain marked as not specified.

## Test Cases

### TC_001 — Login with valid credentials

- **Priority:** P1

**Preconditions**

1. Application should be accessible- https://www.saucedemo.com/
2. Test Data: Valid Credentials
Username: standard_user
Password: secret_sauce

**Test Steps**

1. Open SauceDemo.
2. Enter valid credentials and click Login button.

**Expected Result**

User should log in successfully with valid credentials and should be navigated to Products page

---

### TC_002 — Login with Invalid credentials

- **Priority:** P1

**Preconditions**

1. Application should be accessible- https://www.saucedemo.com/
2. Test Data: Invalid Credentials
Username: standard_user
Password: abcd123

**Test Steps**

1. Open SauceDemo.
2. Enter Invalid credentials and click Login button.

**Expected Result**

User should not be able to log in with invalid credentials and an appropriate error shoud occur.

---

### TC_003 — Add single product to the cart

- **Priority:** P1

**Preconditions**

User Logged in to the application

**Test Steps**

Click on 'Add to cart' button on any of the product

**Expected Result**

When user add any product to the cart then the number of the added products should display on the cart icon in the top right corner

---

### TC_004 — Open cart and verify added product

- **Priority:** P1

**Preconditions**

User added one product to the cart

**Test Steps**

Click on cart icon and check the added product

**Expected Result**

1. User should be navigated to 'Your Cart' page and Cart icon should display the number of added product
2.  On 'Your Cart' page, the product Quantity, product name, product description and amount should display.
3. On each added product, a 'Remove' button should be displayed so the user can remove the product to the cart at any time as per their wish

---

### TC_005 — Verify the product page after the product is added to the cart

- **Priority:** P1

**Preconditions**

User added one product to the cart

**Test Steps**

Add product to cart and navigate back to Products page

**Expected Result**

1. On the Products page, the 'Add to Cart' button should be replaced with a 'Remove' button only for the products that have already been added to the cart.

---

### TC_006 — Verify the product page when the product is removed from the cart

- **Priority:** P1

**Preconditions**

A product should be added to the cart

**Test Steps**

User removed already added product from the cart

**Expected Result**

The product should be removed from the 'Your cart' page and the number of the product should be removed on cart Icon on 'Products' and 'Your Cart page' and the product should appear back on the product page

---

### TC_007 — Verify Complete purchase with multiple products

- **Priority:** P1

**Preconditions**

User Logged in to the application

**Test Steps**

1. Add three different products.
2. Open cart and verify all three products.

**Expected Result**

When user add 3 products to the cart then the number of the added products should display on the cart icon in the top right corner and total should be correct.

---

### TC_008 — Verify the checkout functionality with valid details

- **Priority:** P1

**Preconditions**

1. User Logged in to the application
2. User added single or multiple products to the cart
3.  On 'Your cart' page a checkout button should apprear on the below right side of the page

**Test Steps**

1. User clicked on 'Checkout button'
2. User enter valid First name, last name and zip code and click on continue button
3. User clicks on 'Finish button'

**Expected Result**

1. User should be redirected to 'Your Information' page and  3 fields: First Name, Last Name and Zip/Postal Code should appear
2. Checkout Overview page should appear displaying all the products (with the quantity, description and amount )  user added in the cart
3. User should be logged out and redirected to Login page

---

### TC_009 — Verify the checkout functionality with missing first name

- **Priority:** P1

**Preconditions**

1. User Logged in to the application
2. User added single or multiple products to the cart
3.  On 'Your cart' page a checkout button should apprear on the below right side of the page

**Test Steps**

1. User Open cart.
2. User Clicks on Checkout button
3. Leave First Name blank.
4. Enter Last Name and Postal Code
5. Click on Continue button

**Expected Result**

Checkout does not proceed, and a required First Name validation error should displayed.

---

### TC_010 — Verify Checkout with missing last name

- **Priority:** Not specified

**Preconditions**

1. User Logged in to the application
2. User added single or multiple products to the cart
3.  On 'Your cart' page a checkout button should apprear on the below right side of the page

**Test Steps**

1. Proceed to checkout information
2. User Enter First Name and Postal Code
3. Leave Last Name blank
4. Click on Continue button

**Expected Result**

Checkout does not proceed, and a required Last Name error should  displayed.

---

### TC_011 — Verify Checkout with missing postal code

- **Priority:** Not specified

**Preconditions**

1. User Logged in to the application
2. User added single or multiple products to the cart
3.  On 'Your cart' page a checkout button should apprear on the below right side of the page

**Test Steps**

1. Proceed to checkout information.
2. User  Enter First Name and Last Name
3. Leave Postal Code blank
4. Click on Continue button

**Expected Result**

Checkout does not proceed, and a required Postal Code error should displayed.

---

### TC_012 — Verify Removing a product before checkout

- **Priority:** P2

**Preconditions**

User is logged in.

**Test Steps**

1. User added two products to the cart.
2. Open cart.
3. Remove one product.
4. Proceed through checkout.
5. Verify overview and finish.

**Expected Result**

Only the remaining product should appears in checkout, the total reflects that product, and order confirmation is displayed

---

### TC_013 — Verify cart contents and prices across checkout

- **Priority:** P1

**Preconditions**

User is logged in and has at least two products in the cart

**Test Steps**

1. Record product names and prices in inventory.
2. Open cart and compare values.
3. Proceed to checkout overview.
4. Compare products and prices again.

**Expected Result**

Product names and prices remain consistent across inventory, cart and checkout overview.

---

### TC_014 — Verify Checkout with all information fields empty

- **Priority:** P1

**Preconditions**

User is logged in and has added one product in the cart

**Test Steps**

1. Open 'Checkout: Your Information' page
2. Leave all fields blank.
3. Click on Continue button

**Expected Result**

Checkout is blocked and the application displays the appropriate required-field error.

---

### TC_015 — Verify Recover from checkout validation error

- **Priority:** P2

**Preconditions**

User is logged in and has one product in the cart

**Test Steps**

1. Proceed to checkout information.
2. User leave Postal Code blank and click Continue.
3. Enter a valid Postal Code.
4. Click Continue again.
5. Finish the order.

**Expected Result**

Validation error is resolved, checkout proceeds, and the order confirmation page is displayed

---

### TC_016 — Verify poduct amount total and tax on checkout

- **Priority:** P1

**Preconditions**

User is logged in and has at least one product in the cart

**Test Steps**

1. User Add products to cart
2. Proceed through checkout
3. Record Item total and Tax
4. Verify the displayed Total

**Expected Result**

Item total matches the sum of product prices, and Total equals Item total plus Tax.

---

### TC_017 — Verify cart state after order completion

- **Priority:** P2

**Preconditions**

User has completed a purchase

**Test Steps**

1. Inspect the order confirmation
2. Click Back Home
3. Inspect the cart

**Expected Result**

Once the checkout is completed then the cart should be empty

---

### TC_018 — Verify Cancel checkout and return to shopping

- **Priority:** P3

**Preconditions**

User is logged in and has one product in the cart

**Test Steps**

1. Open cart
2. Click on Checkout button
3. Click Cancel on the checkout information page
4. Verify the cart state

**Expected Result**

User returns to the cart without placing an order, and the product remains available in the cart.

---

### TC_019 — Verify Attempt checkout with an empty cart

- **Priority:** P3

**Preconditions**

User is logged in and has not entered any item in the cart

**Test Steps**

1. Open the cart without adding products.
2. Click on Checkout button if available.
3. Observe the result.

**Expected Result**

No unintended purchase can be completed. Record whether the demo allows progression from an empty cart.

---

### TC_020 — Verify navigation back from checkout overview

- **Priority:** P1

**Preconditions**

User is logged in and has completed checkout information

**Test Steps**

1. Reach Checkout: Overview
2. Click on  Cancel button
3. Inspect 'Your cart page'and cart state.

**Expected Result**

User returns to shopping without completing an order, and no unintended purchase occurs

---
