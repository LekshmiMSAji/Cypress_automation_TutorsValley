describe('LOGIN Test using Custom Command', () => {
    it('should successfully log in and reach the dashboard', () => {
        
    const userEmail = Cypress.env('testUser').email;
    const userPassword = Cypress.env('testUser').password;
      cy.loginWithUI(userEmail, userPassword); 
        //cy.visit('https://beta.tutorsvalley.com/dashboard');
        // Since the assertion cy.url().should('include', '/dashboard') 
        // is already inside your custom command, no further steps are needed here 
        // for a basic login test.
    });
});
