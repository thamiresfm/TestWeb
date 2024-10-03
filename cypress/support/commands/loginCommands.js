
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/'); 
    if (username && password ) {
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();
      cy.log('log out any message we want here')
      cy.log('another message', ['one', 'two', 'three'])
    } else {
      cy.get('[data-test="login-button"]').click();
    }
  });
  
  Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
    cy.get('[data-test="error"]').should('have.text', expectedMessage);
  });
  
  Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.get('[data-test="username"]').should('be.visible');
  });
  