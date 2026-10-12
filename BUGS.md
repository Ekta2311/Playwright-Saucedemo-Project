# Exploratory Testing — Bug Log

## Bug Reports

### BUG-001 — Application allows checkout completion with an empty cart

- **Precondition:** User is logged in and has not added any products.
- **Steps to reproduce:**
  1. Log in to Sauce Demo.
  2. Open the cart without adding a product.
  3. Click **Checkout**.
  4. Enter valid customer information.
  5. Click **Continue**.
  6. If the overview page allows it, click **Finish**.
- **Expected result:** Checkout is blocked, with an appropriate message or a redirect to
  the cart; no order confirmation is shown.
- **Actual result:** The app navigated to `checkout-complete.html` and displayed "Thank
  you for your order!" with no products in the cart.
- **Severity:** Medium — an order can be completed without any products.
- **Priority:** P2 — checkout validation should prevent this invalid order, but it does
  not block normal purchases.
- **Reproduction status:** Confirmed by two targeted automated runs and the full BDD run
- **Attachment:** [Screenshot](evidence/BUG_IMG.png)
- **Video:** [BUG_REC.mp4](BUG_REC.mp4)
