const CartPage =  {

    clickCheckoutButton () {
        cy.contains('Checkout').click()
    },

    removeFirstItem () {
        cy.get('li:nth-child(2) .text-danger').click()
    },
};

export default CartPage;
