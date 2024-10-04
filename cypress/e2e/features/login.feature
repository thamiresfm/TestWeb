Feature: Login tests with different types of users

  Background:
    Given I load the login data

  @login-success
  Scenario Outline: Successful login with the user "<userType>"
    When I log in with the user type "<userType>"
    Then I should see the inventory page

    Examples:
      | userType                 |
      | standard_user            |
      | admin_user               |
      | performance_glitch_user  |

  @login-error
  Scenario Outline: Show error when attempting login with the user "<userType>"
    When I log in with the user type "<userType>"
    Then I should see the error message "<errorKey>"

    Examples:
      | userType            | errorKey           |
      | locked_out_user     | lockedOut          |
      | empty_username      | usernameRequired   |
      | empty_password      | passwordRequired   |
      | invalid_user        | invalidLogin       |

  @login-input-extremes
  Scenario Outline: Should show error when attempting login with the user type "<userType>"
    When I log in with the user type "<userType>"
    Then I should see the error message "invalidLogin"

    Examples:
      | userType           |
      | long_username      |
      | long_password      |
      | special_username   |
      | special_password   |

  @logout
  Scenario: Should log out successfully after successful login
    When I log in with the user type "standard_user"
    And I log out
    Then I should see the initial page
