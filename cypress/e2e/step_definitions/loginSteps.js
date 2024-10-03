import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('eu carrego os dados de login', () => {
  cy.fixture('loginData').as('loginData');
});

When('eu faço login com o usuário {string} e senha {string}', (username, password) => {
  cy.login(username, password);
  
});

Then('eu devo ver a página de inventário', () => {
  cy.url().should('include', '/inventory');
});

Then('eu devo ver a mensagem de erro {string}', (errorKey) => {
  cy.get('@loginData').then((data) => {
    const errorMessage = data.errorMessages[errorKey];
    cy.verifyErrorMessage(errorMessage);
  });
});

When('eu faço logout', () => {
  cy.logout();
});

Then('eu devo ver a página inicial', () => {
  cy.get('[data-test="username"]').should('be.visible');
});
