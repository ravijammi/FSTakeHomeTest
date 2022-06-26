const CartPage =  {

    clickCheckoutButton () {
        cy.contains('Checkout').click()
    },

    removeFirstItem () {
        cy.get(':nth-child(2) > .row > .text-right > .glyphicon').click()
    },
};

export default CartPage;
