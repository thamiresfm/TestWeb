import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Background - Login
Given('eu faço login na aplicação', () => {
  cy.login('standard_user', 'secret_sauce');
});

// Acessar a página de detalhes do produto
When('eu acesso os detalhes do produto {string}', (product) => {
  cy.goToProductDetails(product);
});

// Verificar nome e preço na página de detalhes
Then('o nome e o preço na página de detalhes devem ser {string} e {string}', (expectedName, expectedPrice) => {
  cy.verifyProductDetails(expectedName, expectedPrice);
});

// Adicionar produto ao carrinho
When('eu adiciono o produto {string} ao carrinho', (product) => {
  cy.goToProductDetails(product);
  cy.addToCartFromDetails();
});

// Verificar produto no carrinho
Then('o produto {string} com o preço {string} deve estar no carrinho', (expectedName, expectedPrice) => {
  cy.addAndVerifyProductInCart(expectedName, expectedPrice);
});

// Remover produto do carrinho
When('eu removo o produto {string} do carrinho', (product) => {
  cy.removeFromCartFromDetails();
});

// Verificar remoção do produto
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
