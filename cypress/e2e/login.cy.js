describe('LOGIN Test using Custom Command', () => {
    it('should successfully log in and reach the dashboard', () => {
        
        // Call the custom command defined in commands.js
        // Provide your actual username and password here
      cy.loginWithUI('ninimariamvarghese+223@techversantinfotech.com', 'Tech@Valley01'); 
        
        // Since the assertion cy.url().should('include', '/dashboard') 
        // is already inside your custom command, no further steps are needed here 
        // for a basic login test.
    });
});