const BasePage =  {

    visit () {
        cy.visit(Cypress.env('baseUrl'))
    },

    clickMarketButton (){
        cy.contains('Market').click()
    }
};

export default BasePage;