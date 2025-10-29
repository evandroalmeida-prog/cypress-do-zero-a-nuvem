Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text,
          { delay: 0 })
    //cy.get('button[type="submit"]').click() // Substituído pelo exerc 8
    cy.contains('button','Enviar').click()
 
})

