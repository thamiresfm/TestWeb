import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let testData;

before(() => {
  cy.fixture('productData').then((t) => {
    testData = t;
  });
});

Given('eu faço login com o usuário {string} e senha {string}', (username, password) => {
  cy.login(username, password); 
});

Given('que eu adiciono o produto {string} ao carrinho', (productName) => {
  cy.addToCart(productName); 
});


When('eu ordeno os produtos por {string}', (tipoDeOrdenacao) => {
  cy.checkSorting(tipoDeOrdenacao); 
});

Then('os produtos devem estar corretamente ordenados por {string}', (criterio) => {
  cy.checkSorting(criterio);
});


When('eu adiciono o produto {string} ao carrinho', (productName) => {
  cy.addToCart(productName); 
});


Then('o carrinho deve conter o produto {string} com o preço {string}', (productName, productPrice) => {
  cy.verifyProductInCart(productName, productPrice); 
});


When('eu removo o produto do carrinho na tela do produto', (productName) => {
  cy.removeFromCartProduct(productName); 
});

Then('o produto {string} não deve estar no carrinho', (productName) => {
  cy.get('[data-test="shopping-cart-link"]').should('not.contain', productName); 
});