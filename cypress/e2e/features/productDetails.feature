Feature: Página de Detalhe do Produto

  Background:
    Given eu faço login na aplicação

  Scenario: Verificar se o nome e o preço são iguais na página de detalhes
    When eu acesso os detalhes do produto "Sauce Labs Backpack"
    Then o nome e o preço na página de detalhes devem ser "Sauce Labs Backpack" e "$29.99"

  Scenario: Adicionar produto ao carrinho e verificar no carrinho
    When eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    Then o produto "Sauce Labs Backpack" com o preço "$29.99" deve estar no carrinho

  Scenario: Remover produto do carrinho
    And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    When eu removo o produto "Sauce Labs Backpack" do carrinho
    Then o produto "Sauce Labs Backpack" deve ser removido do carrinho

  Scenario: Adicionar produto ao carrinho e finalizar compra
    And eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    When eu finalizo a compra com as informações "John", "Doe" e "12345"
    Then a compra deve ser finalizada com sucesso
