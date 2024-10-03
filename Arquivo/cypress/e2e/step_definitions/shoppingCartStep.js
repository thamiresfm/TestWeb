import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let testData;

before(() => {
  cy.fixture('shoppingCartData').then((data) => {
    testData = data;
  });
});

// Background: Login
Given('eu faço login com os dados de {string}', (dadosFixture) => {
  cy.login(testData.login.username, testData.login.password);
});

// Acessar o carrinho de compras
When('eu acesso o carrinho de compras', () => {
  cy.get('.shopping_cart_link').click();
});

// Redirecionamento ao clicar em "Continue Shopping"
When('clico em "Continue Shopping"', () => {
   cy.get('[data-test="continue-shopping"]').click();
});

Then('devo ser redirecionado para a página de produtos', () => {
  cy.url().should('include', '/inventory.html');
});

// Realizar a compra com sucesso
When('eu adiciono produtos ao carrinho e realizo o checkout', () => {
  cy.purchaseMultipleProducts(testData.products);
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  cy.completePurchase(testData.information.firstName, testData.information.lastName, testData.information.postalCode);
});

Then('a compra deve ser finalizada com sucesso com a mensagem {string}', (mensagemSucesso) => {
  cy.get('.complete-header').should('have.text', mensagemSucesso);
});

// Validação de campos obrigatórios no checkout
When('eu tento finalizar a compra sem preencher {string}', (campo) => {
  if (campo === 'Nome') {
    cy.carryOutPurchase('', testData.information.lastName, testData.information.postalCode);
  } else if (campo === 'Sobrenome') {
    cy.carryOutPurchase(testData.information.firstName, '', testData.information.postalCode);
  } else if (campo === 'Código Postal') {
    cy.carryOutPurchase(testData.information.firstName, testData.information.lastName, '');
  }
  cy.get('[data-test="continue"]').click();
});

Then('devo ver a mensagem de erro {string}', (mensagemErro) => {
  cy.get('.error-message-container').should('have.text', mensagemErro);
});
