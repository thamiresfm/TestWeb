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


  Cypress.Commands.add('completePurchase', (firstName='', lastName='', postalCode='') => {
    cy.log(firstName, lastName, postalCode)
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
  
  Cypress.Commands.add('carryOutPurchase', (firstName, lastName, postalCode) => {

    // Preenche as informações de envio se forem fornecidas, caso contrário, deixa o campo em branco
    if (firstName !== undefined) cy.get('[data-test="firstName"]').clear().type(firstName);
    if (lastName !== undefined) cy.get('[data-test="lastName"]').clear().type(lastName);
    if (postalCode !== undefined) cy.get('[data-test="postalCode"]').clear().type(postalCode);
  
    // Tenta continuar o checkout
    cy.get('[data-test="continue"]').click();
  
    // Verifica se uma mensagem de erro é exibida ao deixar os campos obrigatórios vazios
    cy.get('.error-message-container').should('be.visible');
  });
  