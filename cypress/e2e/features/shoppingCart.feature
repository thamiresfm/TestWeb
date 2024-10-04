Feature: Página de Carrinho de Compras

  Background:
    Given eu faço login com os dados de "testData"

  Scenario: Redirecionar para a página de produtos ao clicar em "Continue Shopping"
    And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    When eu acesso o carrinho de compras
    And clico em "Continue Shopping"
    Then devo ser redirecionado para a página de produtos

  Scenario: Realizar a compra com sucesso
    When eu adiciono produtos ao carrinho e realizo o checkout
    Then a compra deve ser finalizada com sucesso com a mensagem "Thank you for your order!"

  Scenario Outline: Validação de campos obrigatórios durante o checkout
    And eu adiciono produtos ao carrinho
    When eu tento finalizar a compra sem preencher "<campo>"
    Then devo ver a mensagem de erro "Error: <mensagemDeErro>"

    Examples:
      | campo        | mensagemDeErro              |
      | Nome         | First Name is required      |
      | Sobrenome    | Last Name is required       |
      | Código Postal| Postal Code is required     |
