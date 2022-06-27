/// <reference types="cypress" />

import marketPage from '../support/pageObjects/Market.page'
import cartPage from '../support/pageObjects/Cart.page'
import homePage from '../support/pageObjects/Home.page'
import checkoutPage from '../support/pageObjects/Checkout.page'

describe('FullStory recording', () => {
    it('Basic functionality is correctly recorded', () => {

        cy.intercept('https://rs.fullstory.com/rec/bundle*').as('fsData')
        
        // Go to home page
        homePage.visit()

        // Click 'Market' button
        homePage.clickMarketButton()

        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
            assert.isNotNull(interceptedFSData.response.body, '1st Data recorded')
        }) 

        // Once in marktet page add Bananas to cart
        marketPage.addBananasToCart()

        // Wait for the FS '/rec/bundle' api call and intercept for validation        
        cy.wait('@fsData').then((interceptedFSData) => {
	        let reqBody = interceptedFSData.request.body
	        assert.isTrue(reqBody.includes("\"Kind\":8197"))
        })

        // Add one more item to cart
        marketPage.addCocktailMixItemToCart()
        
        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
	        let reqBody = interceptedFSData.request.body
            assert.isTrue(reqBody.includes("\"Kind\":8197"))
        })
        
        // Go to Cart
        marketPage.clickCartButton()
        
        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
	        let reqBody = interceptedFSData.request.body
            assert.isTrue(reqBody.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/cart\"]"))
        })
        
        // Procedd to checkout 
        cartPage.clickCheckoutButton()

        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
            let reqBody = interceptedFSData.request.body
            assert.isTrue(reqBody.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/checkout\"]"))
        })

        // Fill the checkout page by providng all purchase info
        checkoutPage.fillOutPurchaseInfo()
        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
	        let reqBody = interceptedFSData.request.body
	        // There should be only 5 value change events captured.
            // Sensitive fields such as "Credit Card" and "Security Code" should be excluded. 
            assert.equal(5, reqBody.match(/"Kind":18/g).length)
        })

        // Proceed with purchase
        checkoutPage.clickPurchaseButton()
        
        // Wait for the FS '/rec/bundle' api call and intercept for validation
        cy.wait('@fsData').then((interceptedFSData) => {
	        assert.isTrue(interceptedFSData.request.body.includes("\"Kind\":37,\"Args\":[\"https://fruitshoppe.firebaseapp.com/#/confirm\"]"))
        })
        
    })
})
