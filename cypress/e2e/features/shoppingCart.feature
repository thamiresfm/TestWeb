# Feature: Página de Carrinho de Compras

#   Background:
#     Given eu faço login com os dados de "testData"

#   Scenario: Redirecionar para a página de produtos ao clicar em "Continue Shopping"
#     And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
#     When eu acesso o carrinho de compras
#     And clico em "Continue Shopping"
#     Then devo ser redirecionado para a página de produtos

#   Scenario: Realizar a compra com sucesso
#     When eu adiciono produtos ao carrinho e realizo o checkout
#     Then a compra deve ser finalizada com sucesso com a mensagem "Thank you for your order!"

#   Scenario Outline: Validação de campos obrigatórios durante o checkout
#     And eu adiciono produtos ao carrinho
#     When eu tento finalizar a compra sem preencher "<campo>"
#     Then devo ver a mensagem de erro "Error: <mensagemDeErro>"

#     Examples:
#       | campo        | mensagemDeErro              |
#       | Nome         | First Name is required      |
#       | Sobrenome    | Last Name is required       |
#       | Código Postal| Postal Code is required     |
Feature: Shopping Cart Page

  Background: 
    Given I log in with standard user
  
  # Scenario: Redirect to product page when clicking "Continue Shopping"
  #   When I add the product "Sauce Labs Backpack" to the cart
  #   And I access the shopping cart
  #   And I click on "Continue Shopping"
  #   Then I should be redirected to the product page
  #   And the cart should be empty after redirection

  # Scenario: Successfully completing a purchase
  #   When I add products to the cart and proceed to checkout
  #   Then the purchase should be successfully completed with the message "Thank you for your order!"

  Scenario Outline: Validating required fields during checkout
    And I add products to the cart
    When I try to complete the purchase without filling "<field>"
    Then I should see the error message "Error: <errorMessage>"

    Examples:
      | field        | errorMessage               |
      | First Name   | First Name is required    |
      # | Last Name    | Last Name is required      |
      # | Postal Code  | Postal Code is required    |

  # Scenario Outline: Validating invalid input during checkout
  #   Given I add products to the cart
  #   When I try to complete the purchase with an invalid "<field>"
  #   Then I should see the error message "Error: <errorMessage>"

  #   Examples:
  #     | field        | errorMessage                       |
  #     | Postal Code  | Postal Code must be numeric        |
  #     | First Name   | First Name is too short            |
