Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');

  if (username) {
    cy.get('[data-test="username"]').should('exist').clear().type(username);
  } else {
    cy.get('[data-test="username"]').should('exist').clear();
  }

  if (password) {
    cy.get('[data-test="password"]').should('exist').clear().type(password);
  } else {
    cy.get('[data-test="password"]').should('exist').clear();
  }

  cy.get('[data-test="login-button"]').should('exist').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').click();
  cy.get('[data-test="username"]').should('be.visible');
});

Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
  cy.get('[data-test="error"]').should('have.text', expectedMessage);
});
