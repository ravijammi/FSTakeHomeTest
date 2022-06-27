/// <reference types="cypress" />

import marketPage from '../support/pageObjects/Market.page'
import cartPage from '../support/pageObjects/Cart.page'
import homePage from '../support/pageObjects/Home.page'
import checkoutPage from '../support/pageObjects/Checkout.page'

describe('FullStory recording', () => {
    it('Basic functionality is correctly recorded', () => {

       cy.intercept('https://rs.fullstory.com/rec/bundle*').as('fsData')

        homePage.visit()
        homePage.clickMarketButton()

        cy.wait('@fsData').then((interceptedFSData) => {
	    assert.isNotNull(interceptedFSData.response.body, '1st Data recorded')
        }) 

        marketPage.addBananasToCart()

        cy.wait('@fsData').then((interceptedFSData) => {
	    let reqBody = interceptedFSData.request.body
        console.log("Bananas Added to cart:" + reqBody)
	    assert.isTrue(reqBody.includes("\"Kind\":8197"))
        })

        marketPage.addCocktailMixItem()
        
        cy.wait('@fsData').then((interceptedFSData) => {
	    let reqBody = interceptedFSData.request.body
        assert.isTrue(reqBody.includes("\"Kind\":8197"))
        })
        
        marketPage.clickCartButton()
        
        cy.wait('@fsData').then((interceptedFSData) => {
	    let reqBody = interceptedFSData.request.body
            assert.isTrue(reqBody.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/cart\"]"))
        })
        
        cartPage.clickCheckoutButton()

        cy.wait('@fsData').then((interceptedFSData) => {
            let reqBody = interceptedFSData.request.body
            assert.isTrue(reqBody.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/checkout\"]"))
        })

        checkoutPage.fillOutPurchaseInfo()
        cy.wait('@fsData').then((interceptedFSData) => {
	    let reqBody = interceptedFSData.request.body
	    console.log("PurchaseInfo:"+reqBody)
	    console.log("Count:"+reqBody.match(/"Kind":18/g).length)
        })

        checkoutPage.clickPurchaseButton()

        cy.wait('@fsData').then((interceptedFSData) => {
	    assert.isTrue(interceptedFSData.request.body.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/confirm\"]"))
        })
        
    })
})
