Cypress.Commands.add('loginWithUI', (email, password) => {
    cy.visit('https://beta.tutorsvalley.com/login')
    cy.contains('Login').click() 
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.contains('button', 'Login').click() 
       cy.contains('button', 'I Agree').click()
    cy.contains('button', 'Close').click()
    //cy.url().should('include', '/dashboard')
})

