Feature: Testes de Login com Vários Usuários

  Background:
    Given eu faço login com o usuário "standard_user" e senha "secret_sauce"

  Scenario Outline: Login com sucesso com o usuário "<username>"
    When eu faço login com o usuário "<username>" e senha "<password>"
    Then eu devo ver a página de inventário

    Examples:
      | username                 | password     |
      | standard_user            | secret_sauce |
      | problem_user             | secret_sauce |
      | performance_glitch_user  | secret_sauce |

  Scenario Outline: Exibir erro para o usuário "<username>"
    When eu faço login com o usuário "<username>" e senha "<password>"
    Then eu devo ver a mensagem de erro "<errorKey>"

    Examples:
      | username           | password     | errorKey          |
      | locked_out_user    | secret_sauce | lockedOut         |
      | error_usern        | secret_sauce | invalidLogin      |
      |                    |              | usernameRequired  |

  Scenario: Deve fazer logout corretamente após o login de qualquer usuário
    When eu faço login com o usuário "standard_user" e senha "secret_sauce"
    When eu faço logout
    Then eu devo ver a página inicial

  Scenario Outline: Deve exibir erro ao tentar logar com <descrição>
    When eu faço login com o usuário "<username>" e senha "<password>"
    Then eu devo ver a mensagem de erro "invalidLogin"

    Examples:
      | descrição                                 | username                               | password                                  |
      | nome de usuário muito longo               | user123456789012345678901234567890     | secret_sauce                              |
      | senha muito longa                         | standard_user                          | password123456789012345678901234567890    |
      | nome de usuário com caracteres especiais  | !@#$%^&*()_+                           | secret_sauce                              |
      | senha com caracteres especiais            | standard_user                          | !@#$%^&*()_+                              |