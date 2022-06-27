const MarketPage =  {

    clickCartButton () {
        cy.contains('My Cart').click()
    },

    addBananasToCart (){
        cy.get('.fruit-banans .cta-add-to-cart').click()
    },

    addCocktailMixItemToCart (){
        cy.get('.fruit-mixeddrink .cta-add-to-cart').click()
    },

};

export default MarketPage;