
Cypress.Commands.add('addToCart', (productName) => {
  cy.get('.inventory_item', { timeout: 15000 })
    .contains(productName) 
    .should('be.visible')
    .parents('.inventory_item')  
    .within(() => {
      cy.get('[data-test*="add-to-cart"]')  
        .should('be.visible') 
        .click();  
    });
});

Cypress.Commands.add('removeFromCartProduct', (productName) => {
  cy.log(`Attempting to remove product: ${productName}`);
  cy.get('[data-test="shopping-cart-link"]').click();
});

Cypress.Commands.add('verifyProductInCart', (productName, productPrice) => {
  cy.get('[data-test="shopping-cart-link"]').click();
  cy.get('.cart_item').contains(productName).should('exist');
  cy.get('.cart_item').contains(productPrice).should('exist');
});

Cypress.Commands.add('checkSorting', (sortingType) => {
  cy.get('.product_sort_container').select(sortingType);
});
