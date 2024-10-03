

Cypress.Commands.add('addToCart', (productName) => {
    cy.contains('.inventory_item', productName).within(() => {
      cy.get('.btn_inventory').should('contain.text', 'Add to cart').click();
      cy.get('.btn_inventory').should('contain.text', 'Remove'); // Verifica se o botão mudou para "Remove"
    });
  });
  
  Cypress.Commands.add('removeFromCart', (productName) => {
    cy.contains('.inventory_item', productName).within(() => {
      cy.get('.btn_inventory').should('contain.text', 'Remove').click();
      cy.get('.btn_inventory').should('contain.text', 'Add to cart'); // Verifica se o botão mudou para "Add to cart"
    });
  });

    // Remover produto do carrinho na página de detalhes
    Cypress.Commands.add('removeFromCartProduct', () => {
      cy.get('[data-test="remove-sauce-labs-backpack"]').click(); // Clica no botão "Remove" na página de detalhes
    });
    
  
  
  Cypress.Commands.add('verifyProductInCart', (productName, productPrice) => {
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item_label').within(() => {
      cy.get('.inventory_item_name').should('have.text', productName);
      cy.get('.inventory_item_price').should('have.text', productPrice);
    });
  });
  
  Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    cy.get('[data-test="firstName"]').clear().type(firstName);
    cy.get('[data-test="lastName"]').clear().type(lastName);
    cy.get('[data-test="postalCode"]').clear().type(postalCode);
    cy.get('[data-test="continue"]').click();
    
    // Verifica se o botão de finalização está visível e clica
    cy.get('[data-test="finish"]').should('be.visible').click();
  });
  
  Cypress.Commands.add('checkSorting', (sortingValue) => {
    cy.get('.product_sort_container').select(sortingValue);
  
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
  
    if (sortingValue === 'az' || sortingValue === 'za') {
        cy.get('.inventory_item_name').should('be.visible').then(($items) => {
            const productNames = $items.map((i, el) => Cypress.$(el).text().trim().toLowerCase()).get();
            
            cy.log('Nomes obtidos:', productNames);
            
            const sortedNames = sortingValue === 'az' 
                ? [...productNames].sort() 
                : [...productNames].sort().reverse();
            
            cy.log('Nomes ordenados esperados:', sortedNames);
  
            expect(productNames).to.deep.equal(sortedNames);
        });
    } else if (sortingValue === 'lohi' || sortingValue === 'hilo') {
        cy.get('.inventory_item_price').should('be.visible').then(($items) => {
            const productPrices = $items.map((i, el) => parseFloat(Cypress.$(el).text().replace('$', ''))).get();
  
            cy.log('Preços obtidos:', productPrices);
  
            const sortedPrices = sortingValue === 'lohi' 
                ? [...productPrices].sort((a, b) => a - b)
                : [...productPrices].sort((a, b) => b - a);
            
            cy.log('Preços ordenados esperados:', sortedPrices);
  
            expect(productPrices).to.deep.equal(sortedPrices);
        });
    }
  });
  
  // Cypress.Commands.add('addToCart', (productName) => {
  //   // Tenta adicionar ao carrinho na tela de listagem de produtos
  //   cy.get('body').then(($body) => {
  //     if ($body.find(`[data-test="add-to-cart-${productName}"]`).length > 0) {
  //       // Se está na página de listagem de produtos, clica no botão correspondente
  //       cy.get(`[data-test="add-to-cart-${productName}"]`).click();
  //     } else {
  //       // Se está na página de detalhes do produto, clica no botão de adicionar da página de detalhes
  //       cy.get('[data-test="add-to-cart"]').click();
  //     }
  //   });
  // });
  
  
  Cypress.Commands.add('addToCart', () => {
    // Acessa a página de detalhes do primeiro produto
    cy.get('.inventory_item_name').eq(0).click();
  
    // Verifique se a URL está correta
    cy.url().should('include', '/inventory-item.html');
  
    // Adiciona o produto ao carrinho com logs
    cy.get('body').then(($body) => {
        if ($body.find('[data-test="add-to-cart"]').length > 0) {
            cy.log('Botão de adicionar ao carrinho encontrado na página de detalhes.');
            cy.get('[data-test="add-to-cart"]').click();
        } else if ($body.find('[data-test*="add-to-cart"]').length > 0) {
            cy.log('Botão de adicionar específico encontrado (ex: sauce-labs-backpack).');
            cy.get('[data-test*="add-to-cart"]').click();
        } else {
            cy.log('Nenhum botão de adicionar encontrado! Verifique a página.');
        }
    });
  
    // Vá para o carrinho e verifique se o produto foi adicionado
    cy.get('.shopping_cart_link').click();
    
    // Verificar se ao menos um produto está no carrinho
    cy.get('.cart_item').should('exist').and('be.visible');
  });

  Cypress.Commands.add('addToCart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  });
  
  

  Cypress.Commands.add('checkSorting', (criterio) => {
    if (criterio === 'nome A-Z' || criterio === 'nome Z-A') {
      cy.get('.inventory_item_name').should('be.visible').then(($items) => {
        const productNames = $items.map((i, el) => Cypress.$(el).text().trim().toLowerCase()).get();
        const sortedNames = criterio === 'nome A-Z'
          ? [...productNames].sort()
          : [...productNames].sort().reverse();
        
        // Adiciona logs para depuração
        cy.log('Nomes obtidos:', productNames);
        cy.log('Nomes esperados:', sortedNames);
        
        expect(productNames).to.deep.equal(sortedNames);
      });
    }
});


