Feature: Sorting and cart on the products page

  Background:
    Given I log in with standard user

  Scenario Outline: Sort products by different criteria "<sortingType>"
    When I sort the products by "<sortingType>"
    Then the products should be correctly sorted by "<criteria>"

    Examples:
      | sortingType | criteria             |
      | az          | Name (A to Z)        |
      | za          | Name (Z to A)        |
      | lohi        | Price (low to high)  |
      | hilo        | Price (high to low)  |

  Scenario: Add a product to the cart and verify name and price
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart should contain the product "Sauce Labs Backpack" with the price "$29.99"

  Scenario: Remove a product from the cart and verify removal
    Given I add the product "Sauce Labs Bike Light" to the cart
    When I remove the product from the cart on the product page
    Then the product "Sauce Labs Backpack" should not be in the cart

  Scenario: Add multiple products to the cart and verify their names and prices
    When I add the product "Sauce Labs Backpack" to the cart
    And I add the product "Sauce Labs Bike Light" to the cart
    Then the cart should contain the product "Sauce Labs Backpack" with the price "$29.99"
    And the cart should contain the product "Sauce Labs Bike Light" with the price "$9.99"

