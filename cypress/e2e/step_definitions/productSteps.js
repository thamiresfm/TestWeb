
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";


beforeEach(() => {
  cy.fixture('productData').as("productData");
  cy.fixture('loginData').as("userData");
});

Given('I log in with standard user', function ()  {
  const user = this.userData.login["admin_user"];
    cy.login(user.username, user.password);
});

Given('I add the product {string} to the cart', (productName) => {
  cy.addToCart(productName); 
});

When('I sort the products by {string}', (sortingType) => {
  cy.checkSorting(sortingType); 
});

Then('the products should be correctly sorted by {string}', (criteria) => {
  cy.checkSorting(criteria);
});

Then('the cart should contain the product {string} with the price {string}', (productName, productPrice) => {
  cy.verifyProductInCart(productName, productPrice); 
});

When('I remove the product from the cart on the product page', (productName) => {
  cy.removeFromCartProduct(productName); 
});

Then('the product {string} should not be in the cart', (productName) => {
  cy.get('[data-test="shopping-cart-link"]').should('not.contain', productName); 
});

When('I try to remove the product {string} from the cart', (productName) => {
  cy.removeFromCartProduct(productName); 
});
