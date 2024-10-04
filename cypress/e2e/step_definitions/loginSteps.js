import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('I load the login data', () => {
  cy.fixture('loginData').as('users');
});

When('I log in with the user type {string}', function (userType) {
  const user = this.users.login[userType];
  cy.login(user.username, user.password);
});

Then('I should see the inventory page', () => {
  cy.url().should('include', '/inventory');
});

Then('I should see the error message {string}', function (errorKey) {
  const errorMessage = this.users.errorMessages[errorKey];
  cy.get('[data-test="error"]').should('contain', errorMessage);
});

Then('I should see the error message "invalidLogin"', function () {
  const errorMessage = this.users.errorMessages.invalidLogin;
  cy.get('[data-test="error"]').should('contain', errorMessage);
});

When('I log out', () => {
  cy.logout();
});

Then('I should see the initial page', () => {
  cy.get('[data-test="username"]').should('be.visible');
});
