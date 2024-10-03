Feature: Ordenação e carrinho na página de produtos

  Background:
    Given eu faço login com o usuário "standard_user" e senha "secret_sauce"

  Scenario Outline: Ordenar produtos por diferentes critérios
    When eu ordeno os produtos por "<tipoDeOrdenacao>"
    Then os produtos devem estar corretamente ordenados por "<criterio>"

    Examples:
      | tipoDeOrdenacao | criterio       |
      | az              | Name (A to Z)  |
      | za              | Name (Z to A)      |
      | lohi            | Price (low to high)    |
      | hilo            | Price (high to low)    |

  Scenario: Adicionar um produto ao carrinho e verificar nome e preço
    When eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    Then o carrinho deve conter o produto "Sauce Labs Backpack" com o preço "$29.99"

  Scenario: Remover um produto do carrinho e verificar remoção
    Given que eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    When eu removo o produto "Sauce Labs Backpack" do carrinho
    Then o produto "Sauce Labs Backpack" não deve estar no carrinho
