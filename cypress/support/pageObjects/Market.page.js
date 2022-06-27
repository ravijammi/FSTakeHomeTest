const MarketPage =  {

    clickCartButton () {
        cy.contains('My Cart').click()
    },

    addBananasToCart (){
        cy.get(':nth-child(1) > .fruit-box > .fruit-footer > .row > .text-right > .btn').click()
    },

    addCocktailMixItem (){
        cy.get(':nth-child(5) > .fruit-box > .fruit-footer > .row > .text-right > .btn').click()
    },

};

export default MarketPage;