Feature: Product Details Page Functionality

  Background:
    Given I log in with standard user

  Scenario Outline: View product details and verify information
    When I click on the product "<productName>"
    Then I should see the product details page for "<productName>"
    And I should see the product description "<productDescription>"
    And I should see the product price "<productPrice>"

    Examples:
      | productName             | productDescription                                                                                               | productPrice |
      | Sauce Labs Backpack     | A versatile backpack perfect for all your gear, with ergonomic design and sturdy straps.                          | $29.99       |

  Scenario: Add a product to the cart from the product details page
    And I am on the product details page for "Sauce Labs Backpack"
    When I click the Add to Cart button
    Then Add to Cart button should change to Remove

  Scenario: Remove product from the cart
    And I am on the product details page for "Sauce Labs Backpack"
    When I click the Add to Cart button
    And I remove the product from the cart
    Then the product "Sauce Labs Backpack" should be removed from the cart

  Scenario: Validate product details with long descriptions 
    When I view the product with a very long description
    Then the description should be formatted correctly

  Scenario: Validate product details with prices
    When I view the product with a very long prices
    Then the prices should be formatted correctly

  Scenario: Try to complete purchase with missing information
    And I add the product "Sauce Labs Backpack" to the cart
    When I attempt to complete the purchase with missing "First Name"
    Then an error message should be displayed for the missing information
