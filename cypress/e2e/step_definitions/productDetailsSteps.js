import { When, Then } from 'cypress-cucumber-preprocessor/steps';

let productListDescription;
let productListPrice;


When('I am on the product details page for {string}', (productName) => {
  cy.get('.inventory_item').contains(productName).click();
});

When('I click on the product {string}', (productName) => {
  cy.get('.inventory_item').contains(productName).click();
});

Then('I should see the product details page for {string}', (productName) => {
  cy.get('.inventory_details_name').should('have.text', productName);
});

Then('I should see the product price {string}', (productPrice) => {
  cy.get('.inventory_details_price').should('contain.text', productPrice);
});

When('I click the Add to Cart button', () => {
  cy.get('.btn_inventory').contains('Add to cart').click();
});

When('I remove the product from the cart', () => {
  cy.get('[data-test="remove"]').click();
});

Then('the product {string} should be removed from the cart', (productName) => {
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('[data-test="cart-list"]').should('not.contain.text', productName);
});


When('I complete the purchase with the information {string}, {string}, and {string}', (firstName, lastName, zipCode) => {
  cy.get('[data-test="shopping-cart-link"]').click()
  cy.get('[data-test="checkout"]').click()
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(zipCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

Then('the purchase should be completed successfully', () => {
  cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
});

Then('an error message should be displayed for the missing information', () => {
  cy.get('[data-test="error"]').should('be.visible');
});

Then('I should see the product description {string}', (productDescription) => {
  cy.get('.inventory_details_desc').should('include.text', 'carry.allTheThings');
  cy.get('.inventory_details_desc').should('include.text', 'Sly Pack');
});

Then('the products should be displayed in the cart with correct names and prices', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get('.cart_item').contains(row.productName).should('exist');
    cy.get('.cart_item').contains(row.productPrice).should('exist');
  });
});

Then('Add to Cart button should change to Remove', () => {
  cy.get('[data-test="remove"]').should('include.text', 'Remove');
});

Then('the prices should be formatted correctly', () => {
  cy.get('[data-test="inventory-item-price"]').invoke('text').then((detailPrice) => {
    const productDetailPrice = detailPrice.trim();
  
    // Comparar as descrições
    expect(productListPrice).to.eq(productDetailPrice);
  });
});

Then('the description should be formatted correctly', () => {
  // Comando customizado para realizar login
  // Passo 3: Capturar a descrição do produto na página de detalhes e comparar
  cy.get('.inventory_details_desc').invoke('text').then((detailDescription) => {
    const productDetailDescription = detailDescription.trim();
  
    // Comparar as descrições
    cy.log(productListDescription);
    cy.log(productDetailDescription);


    expect(productListDescription).to.eq(productDetailDescription);
  });
});
  
When('I view the product with a very long description', () => {
  
  cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]').first().invoke('text').then((description) => {
    productListDescription = description.trim();
  });
   // Passo 2: Clicar no produto para acessar a página de detalhes
   cy.get('[data-test="inventory-item-name"]').first().click();
  
  // cy.get('[data-test="inventory-list"]').contains('Sauce Labs Backpack').click(); // Exemplo de produto com descrição longa
});

When('I view the product with a very long prices', () => {
  
  cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').first().invoke('text').then((price) => {
    productListPrice = price.trim();
  });
   // Passo 2: Clicar no produto para acessar a página de detalhes
   cy.get('[data-test="inventory-item-name"]').first().click();
  
  // cy.get('[data-test="inventory-list"]').contains('Sauce Labs Backpack').click(); // Exemplo de produto com descrição longa
});

When('I attempt to complete the purchase with missing {string}', (missingField) => {
  // Navegar para o checkout
  cy.get('.shopping_cart_link').click(); // Clica no ícone do carrinho
  cy.get('[data-test="checkout"]').click(); // Clica no botão de checkout

  // Preencher os outros campos, exceto o que está faltando
  if (missingField !== 'First Name') {
    cy.get('[data-test="firstName"]').type('John');
  }
  if (missingField !== 'Last Name') {
    cy.get('[data-test="lastName"]').type('Doe');
  }
  if (missingField !== 'Postal Code') {
    cy.get('[data-test="postalCode"]').type('12345');
  }

  // Tentar continuar com a compra
  cy.get('[data-test="continue"]').click();

  // Verificar se uma mensagem de erro foi exibida
  cy.get('[data-test="error"]').should('be.visible');
});

