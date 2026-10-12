@all
Feature: Shopping and checkout
  As a Sauce Demo customer
  I want to purchase a product
  So that I can complete an order

  @e2e
  Scenario: Standard user completes a purchase
    Given I open the login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should see the products page
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I start checkout
    And I enter first name "Test", last name "Customer" and postal code "12345"
    And I continue to the order overview
    Then the order overview should contain "Sauce Labs Backpack"
    When I finish the order
    Then I should see the order confirmation

  @data-driven
  Scenario Outline: Login rejects invalid details
    Given I open the login page
    When I log in with username "<username>" and password "<password>"
    Then I should see a login error

    Examples:
      | username      | password     |
      | invalid_user  | secret_sauce |
      | standard_user | wrong_pass   |
      |               |              |

  @authenticated
  Scenario: Cart item remains after browser reload
    Given I open the products page as an authenticated user
    When I add "Sauce Labs Backpack" to the cart
    And I reload the browser page
    Then I should still see the products page
    And the cart badge should show "1"
    When I open the cart
    Then the cart should contain "Sauce Labs Backpack"

  @authenticated
  Scenario: Checkout rejects missing customer information
    Given I open the products page as an authenticated user
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I start checkout
    And I continue without entering customer details
    Then I should see a checkout validation error mentioning "First Name"

  @authenticated
  Scenario: Customer can remove an item from the cart
    Given I open the products page as an authenticated user
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty

  @authenticated @bug-regression @BUG-001
  Scenario: Empty cart checkout does not complete an order
    Given I open the products page as an authenticated user
    When I open the cart
    Then the cart should be empty
    When I attempt checkout from an empty cart with valid customer information
    Then empty cart checkout should be blocked with a message or cart redirect
