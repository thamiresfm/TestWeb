
Feature: Shopping Cart Page

  Background: 
    Given I log in with standard user
  
  Scenario: Redirect to product page when clicking "Continue Shopping"
    When I add the product "Sauce Labs Backpack" to the cart
    And I access the shopping cart
    And I click on "Continue Shopping"
    Then I should be redirected to the product page
    And the cart should be empty after redirection

  Scenario: Successfully completing a purchase
    When I add products to the cart and proceed to checkout
    Then the purchase should be successfully completed with the message "Thank you for your order!"

  Scenario Outline: Validating required fields during checkout
    And I add products to the cart
    When I try to complete the purchase without filling "<field>"
    Then I should see the error message in the shopping cart "Error: <errorMessage>"

    Examples:
      | field        | errorMessage               |
      | First Name   | First Name is required     |
      | Last Name    | Last Name is required      |
      | Postal Code  | Postal Code is required    |


