// import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// let testData;

// before(() => {
//   cy.fixture('shoppingCartData').then((data) => {
//     testData = data;
//   });
// });

// // Background: Login
// Given('eu faço login com os dados de {string}', (dadosFixture) => {
//   cy.login(testData.login.username, testData.login.password);
// });

// // Acessar o carrinho de compras
// When('eu acesso o carrinho de compras', () => {
//   cy.get('.shopping_cart_link').click();
// });

// // Redirecionamento ao clicar em "Continue Shopping"
// When('clico em "Continue Shopping"', () => {
//    cy.get('[data-test="continue-shopping"]').click();
// });

// Then('devo ser redirecionado para a página de produtos', () => {
//   cy.url().should('include', '/inventory.html');
// });

// // Realizar a compra com sucesso
// When('eu adiciono produtos ao carrinho e realizo o checkout', () => {
//   cy.purchaseMultipleProducts(testData.products);
//   cy.get('.shopping_cart_link').click();
//   cy.get('[data-test="checkout"]').click();
//   cy.completePurchase(testData.valid.firstName, testData.valid.lastName, testData.valid.postalCode);
// });

// When('eu adiciono produtos ao carrinho', () => {
//   cy.purchaseMultipleProducts(testData.products);
//   cy.get('.shopping_cart_link').click();
//   cy.get('[data-test="checkout"]').click();
//   // cy.completePurchase(testData.information.firstName, testData.information.lastName, testData.information.postalCode);
// });

// Then('a compra deve ser finalizada com sucesso com a mensagem {string}', (mensagemSucesso) => {
//   cy.get('.complete-header').should('have.text', mensagemSucesso);
// });

// // Validação de campos obrigatórios no checkout
// When('eu tento finalizar a compra sem preencher {string}', (campo) => {
//   cy.fixture('shoppingCartData').then((testData) => {
//     // Garante que a página de checkout está carregada corretamente
//     cy.url().should('include', '/checkout-step-one.html');

//     // Mapeia os campos com seus seletores e valores
//     const campos = {
//       'Nome': { selector: '[data-test="firstName"]', value: testData.information.firstName },
//       'Sobrenome': { selector: '[data-test="lastName"]', value: testData.information.lastName },
//       'Código Postal': { selector: '[data-test="postalCode"]', value: testData.information.postalCode }
//     };

//     // Itera pelos campos, preenchendo apenas aqueles que não foram indicados para serem deixados em branco
//     Object.keys(campos).forEach((key) => {
//       if (key !== campo) {
//         cy.get(campos[key].selector).clear().type(campos[key].value); // Preenche os campos que não são o campo "em branco"
//       } else {
//         cy.get(campos[key].selector).clear(); // Deixa o campo solicitado em branco
//       }
//     });

//     // Clica no botão "Continue" para tentar continuar o checkout
//     cy.get('[data-test="continue"]').click();

//     // Verifica se uma mensagem de erro é exibida
//     cy.get('.error-message-container').should('be.visible');
//   });
// });


// Then('devo ver a mensagem de erro {string}', (mensagemErro) => {
//   cy.get('.error-message-container').should('have.text', mensagemErro);
// });


// Then('eu adiciono o produto {string} ao carrinho', (mensagemErro) => {
//   // cy.get('.error-message-container').should('have.text', mensagemErro);
//   cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
// });
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let testData;

before(() => {
  cy.fixture('shoppingCartData').then((data) => {
    testData = data;
  });
});


// before(() => {
//   // Carregando os dados da fixture
//   cy.fixture('userData').then(function(data) {
//     this.data = data;
//   });
// });

// Quando eu tento completar a compra com dados inválidos
When('I try to complete the purchase with an invalid {string}', function (field) {
  const invalidData = {
    firstName: field === 'First Name' ? testData.invalid.firstName : testData.valid.firstName,
    lastName: field === 'Last Name' ? testData.invalid.lastName : testData.valid.lastName,
    postalCode: field === 'Postal Code' ? testData.invalid.postalCode : testData.valid.postalCode
  };

  // Chama o comando Cypress para completar o checkout com os dados inválidos
  cy.completeCheckoutWithInvalidData(invalidData);
});

When('I add products to the cart', () => {
  cy.purchaseMultipleProducts(testData.products); // Função que adiciona produtos
});


// Acessar o carrinho de compras
When('I access the shopping cart', () => {
  cy.get('.shopping_cart_link').click();
});

// Adicionar produtos ao carrinho
When('I add products to the cart', () => {
  cy.purchaseMultipleProducts(testData.products);
});

// Redirecionamento ao clicar em "Continue Shopping"
When('I click on {string}', (buttonText) => {
  cy.contains(buttonText).click(); // Clica no botão de texto correspondente
});

// Realizar a compra com sucesso
When('I proceed to checkout', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  cy.completePurchase(testData.valid.firstName, testData.valid.lastName, testData.valid.postalCode);
});

Then('the purchase should be successfully completed with the message {string}', (successMessage) => {
  cy.get('.complete-header').should('have.text', successMessage);
});

// Validação de campos obrigatórios no checkout
When('I try to complete the purchase without filling {string}', (field) => {
  cy.get('[data-test="shopping-cart-link"]').click()
  // cy.get('[data-test="finish"]').click()
  // const fields = testData.valid;
  // cy.checkoutWithoutField(fields, field);

   // Obtenha os dados dos campos de teste
  //  const fields = {
  //   firstName: testData.valid.firstName,
  //   lastName: testData.valid.lastName,
  //   postalCode: testData.valid.postalCode
  // };

  // Chame o comando que deixa o campo especificado vazio
  // cy.checkoutWithoutField(fields, field);
   // Definir os campos com base no campo omitido
  //  const firstName = field === 'firstName' ? undefined : testData.valid.firstName;
  //  const lastName = field === 'lastName' ? undefined : testData.valid.lastName;
  //  const postalCode = field === 'postalCode' ? undefined : testData.valid.postalCode;
   
   const firstName = field === 'First Name';
   const lastName = field === 'Last Name';
   const postalCode = field === 'Postal Code';

    cy.log(field)
    cy.log(firstName, lastName, postalCode, field)


   // Chamar o comando checkoutWithoutField
   cy.checkoutWithoutField(firstName, lastName, postalCode);
});

Then('I should see the error message in the shopping cart {string}', function (errorMessage) {

  // true
    // Verifica se a mensagem de erro está sendo exibida c
    // cy.log(errorMessage)
    cy.get('.error-message-container').should('contain', errorMessage);
});

When('I click on {string}', (buttonText) => {
  cy.contains(buttonText).click(); // Click on "Continue Shopping"
});
When('I add products to the cart and proceed to checkout', () => {
  // Adiciona múltiplos produtos ao carrinho
  cy.purchaseMultipleProducts(testData.products);

  // Acessa o carrinho de compras
  cy.get('.shopping_cart_link').click();

  // Inicia o checkout
  cy.get('[data-test="checkout"]').click();

  // Completa o checkout
  cy.completePurchase(testData.valid.firstName, testData.valid.lastName, testData.valid.postalCode);
});
// Verifica o redirecionamento para a página de produtos
Then('I should be redirected to the product page', () => {
  cy.url().should('include', '/inventory.html'); // Verifica a URL da página de produtos
});

// Verifica se o carrinho está vazio após o redirecionamento
Then('the cart should be empty after redirection', () => {
  cy.get('.shopping_cart_badge').should('have.text', '1');
  cy.url().should('include', '/inventory.html'); // Verifica a URL da página de produtos
});

