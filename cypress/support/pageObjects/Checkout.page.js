const CheckoutPage =  {

    clickPurchaseButton () {
        cy.contains('Purchase').click()
    },
    
    fillOutPurchaseInfo () {
        cy.get('#billing-firstname').type("Pen")
        cy.get('#billing-lastname').type('Pen')
        cy.get('#billing-address-1').type('1 Penguin Street')
        cy.get('#billing-city').type('Penguin City')
        cy.get('#billing-state').type('CA')
        cy.get('#billing-zip').type('1337')
        cy.get('#shipping-same-billing').check();
        cy.get('#credit_card_number').type('13371337')
        cy.get('.form-inline > :nth-child(2)').type('9')
        cy.get('.form-inline > :nth-child(3)').type('7331')
        cy.get('#credit_card_cvv').type('1337')
        cy.get('#im-sure-check').check()
    }

};

export default CheckoutPage;
