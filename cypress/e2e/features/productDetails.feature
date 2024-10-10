# Feature: Página de Detalhe do Produto

#   Background:
#     Given eu faço login na aplicação

#   Scenario: Verificar se o nome e o preço são iguais na página de detalhes
#     When eu acesso os detalhes do produto "Sauce Labs Backpack"
#     Then o nome e o preço na página de detalhes devem ser "Sauce Labs Backpack" e "$29.99"

#   Scenario: Adicionar produto ao carrinho e verificar no carrinho
#     When eu adiciono o produto "Sauce Labs Backpack" ao carrinho
#     Then o produto "Sauce Labs Backpack" com o preço "$29.99" deve estar no carrinho

#   Scenario: Remover produto do carrinho
#     And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
#     When eu removo o produto "Sauce Labs Backpack" do carrinho
#     Then o produto "Sauce Labs Backpack" deve ser removido do carrinho

#   Scenario: Adicionar produto ao carrinho e finalizar compra
#     And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
#     When eu finalizo a compra com as informações "John", "Doe" e "12345"
#     Then a compra deve ser finalizada com sucesso

# Feature: Product Details Page Functionality

#   Background:
#     Given I log in with standard user

  # @product-details
  # Scenario Outline: View product details and verify information
  #   When I click on the product "<productName>"
  #   Then I should see the product details page for "<productName>"
  #   And I should see the product description "<productDescription>"
  #   And I should see the product price "<productPrice>"

  #   Examples:
  #     | productName              | productDescription                                                                                               | productPrice     |
  #     | Sauce Labs Backpack      | Carry.allTheThings() with the sleek, streamlined ...                                                             | $29.99           |
  #     | Sauce Labs Bolt T-Shirt  | Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun cotton ...  | $15.99           |
  
  # @add-to-cart
  # Scenario: Add a product to the cart from the product details page
  #   And I am on the product details page for "Sauce Labs Backpack"
  #   When I click the Add to Cart button the product "Sauce Labs Backpack"
  #   Then the should change to Remove



  # Scenario: Verify that the product name and price are correct on the details page
  #   When I access the details of the product "Sauce Labs Backpack"
  #   Then the product name and price on the details page should be "Sauce Labs Backpack" and "$29.99"

  # Scenario: Add product to the cart and verify in the cart
  #   When I add the product "Sauce Labs Backpack" to the cart
  #   Then the product "Sauce Labs Backpack" with the price "$29.99" should be in the cart

  # Scenario: Remove product from the cart
  #   Given I add the product "Sauce Labs Backpack" to the cart
  #   When I remove the product "Sauce Labs Backpack" from the cart
  #   Then the product "Sauce Labs Backpack" should be removed from the cart

  # Scenario: Add product to the cart and complete the purchase
  #   Given I add the product "Sauce Labs Backpack" to the cart
  #   When I complete the purchase with the information "John", "Doe", and "12345"
  #   Then the purchase should be completed successfully

  # Scenario: Add a product to the cart from the product details page
  #   Given I am on the product details page for "Sauce Labs Backpack"
  #   When I click the "Add to Cart" button
  #   Then the product should be added to the cart
  #   And the "Add to Cart" button should change to "Remove"

  # Scenario: Validate product details with long descriptions and prices
  #   Given I view the product with a very long description
  #   Then the description should be truncated or properly displayed
  #   And the price should be formatted correctly





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
