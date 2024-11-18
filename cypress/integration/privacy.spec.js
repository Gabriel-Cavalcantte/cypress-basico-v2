/// <reference types="Cypress" />

Cypress._.times(3, function (){
    it(`Experimente a funcionalidade Cypress._.times()`, function(){
        cy.visit(`./src/index.html`)
        cy.clock()
        cy.get('#firstName').type(`Gabriel`).click()
        cy.get('#lastName').type(`Almeida`).click()
        cy.get('#email').type(`emailtest@gmail.com`).click()
        cy.get('#open-text-area').type(`emailtest@gmail.com`).click()
        cy.contains('button', `Enviar`).click()
        cy.get(`.success > strong`).should(`be.visible`)
    })

    it(``)
})