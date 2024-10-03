// Acessar a página de detalhes do produto
Cypress.Commands.add('goToProductDetails', (productName) => {
    cy.contains('.inventory_item_name', productName).click(); // Clica no nome do produto para acessar a página de detalhes
  });
  
  // Verificar nome e preço na página de detalhes
  Cypress.Commands.add('verifyProductDetails', (productName, productPrice) => {
    cy.get('.inventory_details_name').should('have.text', productName); // Verifica o nome do produto
    cy.get('.inventory_details_price').should('have.text', productPrice); // Verifica o preço do produto
  });
  
  // Adicionar produto ao carrinho da página de detalhes
  Cypress.Commands.add('addToCartFromDetails', () => {
    cy.get('[data-test="add-to-cart"]').click(); // Clica no botão "Add to Cart" na página de detalhes
  });
  
  // Remover produto do carrinho na página de detalhes
  Cypress.Commands.add('removeFromCartFromDetails', () => {
    cy.get('[data-test="remove"]').click(); // Clica no botão "Remove" na página de detalhes
  });
  
  // Adicionar e verificar produto no carrinho
  Cypress.Commands.add('addAndVerifyProductInCart', (productName, productPrice) => {
    // cy.addToCartFromDetails(); // Adiciona ao carrinho
    cy.get('.shopping_cart_link').click(); // Acessa o carrinho
    cy.get('.cart_item_label .inventory_item_name').should('have.text', productName); // Verifica o nome do produto no carrinho
    cy.get('.cart_item_label .inventory_item_price').should('have.text', productPrice); // Verifica o preço do produto no carrinho
  });
  
  Cypress.Commands.add('addToCartFromDetails', () => {
    cy.get('.inventory_details_name').should('be.visible'); // Verifica se o nome do produto está visível
    cy.get('[data-test="add-to-cart"]').should('be.visible').click(); // Verifica se o botão "Add to Cart" está visível e clica
  });
  
  // Adicionar produto e finalizar compra
  Cypress.Commands.add('addToCartAndCheckout', (firstName, lastName, postalCode) => {
    // cy.addToCartFromDetails(); // Adiciona ao carrinho da página de detalhes
    cy.get('.shopping_cart_link').click(); // Vai para o carrinho
    cy.get('[data-test="checkout"]').click(); // Inicia o checkout
    // Preenche as informações de envio
    if (firstName) cy.get('[data-test="firstName"]').clear().type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').clear().type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').clear().type(postalCode);
    cy.get('[data-test="continue"]').click(); // Avança
    cy.get('[data-test="finish"]').click(); // Finaliza a compra
    // Verifica a mensagem de sucesso
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });
  