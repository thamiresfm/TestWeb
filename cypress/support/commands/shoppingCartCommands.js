Cypress.Commands.add('purchaseMultipleProducts', (products) => {
    cy.wrap(products).each((product) => {
      cy.contains('.inventory_item', product.name).within(() => {
        cy.get('.inventory_item_name').should('have.text', product.name);
        cy.get('.inventory_item_price').should('have.text', product.price);
        cy.get('.btn_inventory').click();
      });
      cy.get('.shopping_cart_badge').should('be.visible');
    });
  });


  Cypress.Commands.add('completePurchase', (firstName, lastName, postalCode) => {
    // Preenche as informações de envio
    if (firstName) cy.get('[data-test="firstName"]').clear().type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').clear().type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').clear().type(postalCode);
  
    // Clica no botão "Continue"
    cy.get('[data-test="continue"]').click();
  
    // Clica no botão "Finish"
    cy.get('[data-test="finish"]').click();
  
    // Verifica a conclusão do checkout
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });
  
  