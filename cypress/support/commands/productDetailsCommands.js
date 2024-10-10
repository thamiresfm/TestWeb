Cypress.Commands.add('goToProductDetails', (productName) => {
  cy.get('.inventory_item').contains(productName).click();
});

Cypress.Commands.add('addToCartFromDetails', () => {
  cy.get('.btn_inventory').contains('Add to cart').click();
});

Cypress.Commands.add('removeFromCartFromDetails', () => {
  cy.get('[data-test="remove"]').click();
});

Cypress.Commands.add('verifyProductDetails', (name, price) => {
  cy.get('.inventory_details_name').should('have.text', name);
  cy.get('.inventory_details_price').should('contain.text', price);
});

Cypress.Commands.add('addAndVerifyProductInCart', (name, price) => {
  cy.get('.shopping_cart_badge').should('be.visible');
  cy.get('.cart_item_label').should('contain', name);
  cy.get('.cart_item_price').should('contain', price);
});
