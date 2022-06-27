const CheckoutPage =  {

    clickPurchaseButton () {
        cy.contains('Purchase').click()
    },
    
    fillOutPurchaseInfo () {
        cy.get('#billing-firstname').type("Peter")
        cy.get('#billing-lastname').type('Parker')
        cy.get('#billing-address-1').type('1234 Spider Street')
        cy.get('#billing-city').type('Spidey City')
        cy.get('#billing-state').type('CA')
        cy.get('#billing-zip').type('4321')
        cy.get('#shipping-same-billing').check();
        cy.get('#credit_card_number').type('8686868')
        cy.get('#credit_card_cvv').type('123')
        cy.get('#im-sure-check').check()
    }

};

export default CheckoutPage;
