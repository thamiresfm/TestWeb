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

When('eu adiciono produtos ao carrinho', () => {
  cy.purchaseMultipleProducts(testData.products);
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  // cy.completePurchase(testData.information.firstName, testData.information.lastName, testData.information.postalCode);
});

Then('a compra deve ser finalizada com sucesso com a mensagem {string}', (mensagemSucesso) => {
  cy.get('.complete-header').should('have.text', mensagemSucesso);
});

// Validação de campos obrigatórios no checkout
When('eu tento finalizar a compra sem preencher {string}', (campo) => {
  cy.fixture('shoppingCartData').then((testData) => {
    // Garante que a página de checkout está carregada corretamente
    cy.url().should('include', '/checkout-step-one.html');

    // Mapeia os campos com seus seletores e valores
    const campos = {
      'Nome': { selector: '[data-test="firstName"]', value: testData.information.firstName },
      'Sobrenome': { selector: '[data-test="lastName"]', value: testData.information.lastName },
      'Código Postal': { selector: '[data-test="postalCode"]', value: testData.information.postalCode }
    };

    // Itera pelos campos, preenchendo apenas aqueles que não foram indicados para serem deixados em branco
    Object.keys(campos).forEach((key) => {
      if (key !== campo) {
        cy.get(campos[key].selector).clear().type(campos[key].value); // Preenche os campos que não são o campo "em branco"
      } else {
        cy.get(campos[key].selector).clear(); // Deixa o campo solicitado em branco
      }
    });

    // Clica no botão "Continue" para tentar continuar o checkout
    cy.get('[data-test="continue"]').click();

    // Verifica se uma mensagem de erro é exibida
    cy.get('.error-message-container').should('be.visible');
  });
});


Then('devo ver a mensagem de erro {string}', (mensagemErro) => {
  cy.get('.error-message-container').should('have.text', mensagemErro);
});
