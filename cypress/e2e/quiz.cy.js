describe('QUIZ', () => {
  it('passes', () => {
    cy.visit('https://beta.tutorsvalley.com/')
    cy.contains('Login').click()
    cy.get('input[name="email"]').type('ninimariamvarghese+232@techversantinfotech.com');
    cy.get('input[name="password"]').type('Tech@Valley01');
    cy.contains('button', 'Login').click();
    cy.contains('button','I Agree').click();
    cy.contains('button','Close').click();
    

  })
})
