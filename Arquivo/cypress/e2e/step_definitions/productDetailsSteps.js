import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('eu faço login na aplicação', () => {
  cy.login('standard_user', 'secret_sauce');
});

When('eu acesso os detalhes do produto {string}', (product) => {
  cy.goToProductDetails(product);
});

Then('o nome e o preço na página de detalhes devem ser {string} e {string}', (expectedName, expectedPrice) => {
  cy.verifyProductDetails(expectedName, expectedPrice);
});

When('eu adiciono o produto {string} ao carrinho', (product) => {
  cy.goToProductDetails(product);
  cy.addToCartFromDetails();});

Then('o produto {string} com o preço {string} deve estar no carrinho', (expectedName, expectedPrice) => {
  cy.addAndVerifyProductInCart(expectedName, expectedPrice);
});

When('eu removo o produto {string} do carrinho', (product) => {
  cy.removeFromCartFromDetails();
});

Then('o produto {string} deve ser removido do carrinho', (product) => {
  cy.get('.cart_item_label').should('not.exist');
});

// Finalizar compra
When('eu finalizo a compra com as informações {string}, {string} e {string}', (firstName, lastName, postalCode) => {
  cy.addToCartAndCheckout(firstName, lastName, postalCode);
});

// Verificar finalização da compra
Then('a compra deve ser finalizada com sucesso', () => {
  cy.url().should('include', '/checkout-complete.html');
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
});
