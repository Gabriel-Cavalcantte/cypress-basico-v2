Cypress.Commands.add(`fillMandatoryFieldsAndSubmit`,function () {
    cy.get('#firstName').type(`Gabriel`).click()
    cy.get('#lastName').type(`Almeida`).click()
    cy.get('#email').type(`emailtest@gmail.com`).click()
    cy.get('#open-text-area').type(`emailtest@gmail.com`).click()
    cy.get('.button').click()

});