class HeaderPage {

    // --- 1. SELECTORS (Finding the elements) ---

    // Search Bar Input
    getSearchBar() {
        // Use the placeholder text as a reliable way to find the search bar
        return cy.get('input[placeholder="Search Students, Subjects ..."]');
    }

    // Hamburger Menu/Side Navigation Toggle (Top Left)
    getMenuToggle() {
        // You'll need to inspect this element to find its selector (e.g., an ID or class)
        return cy.get('.hamburger-menu-icon'); // Placeholder selector
    }

    // Notification Bell Icon
    getNotificationBell() {
        // Likely a button or icon with a specific class or ID
        return cy.get('[aria-label="Notifications"]'); // Example: using an ARIA label
        cy.log("Log file");
    }
// In cypress/pages/HeaderPage.js

// ... other methods ...

// New method to click the Nth subject in the dropdown
// In cypress/pages/HeaderPage.js

// Method to click the Nth subject in the dropdown
clickNthSubjectInDropdown(index) {
    // 1. Force a hover/focus on the search bar to ensure the dropdown appears
    this.getSearchBar().trigger('mouseover'); 
    
    // 2. Select the parent container and assert it is now visible
    // You might need to adjust this selector:
    cy.get('.top-bar-search-dropdown-wrapper').should('be.visible');

    // 3. Click the element at the specified index (0-based)
    // We use {force: true} as a last resort because Cypress knows the element should be visible
    cy.get('.search-bar-dropdown-body-content h6').eq(index).click(); 
}
// ... rest of the file ...

getSearchBar() {
    // Must match the exact placeholder text visible on the dashboard
    return cy.get('input[placeholder="Search Students, Subjects ..."]'); 
}
    getProfileIcon() {
        
        return cy.get('.user-profile-avatar'); 
    }

    typeSearchQuery(query) {
        this.getSearchBar().type(query);
    }
typeAndSubmitSearch(query) {
    this.getSearchBar().type(query + '{enter}');
}
    // Action to clear the search bar
    clearSearchQuery() {
        this.getSearchBar().clear();
    }
    
    // Action to open the side menu
    clickMenuToggle() {
        this.getMenuToggle().click();
    }

    // Action to check notifications
    clickNotificationBell() {
        this.getNotificationBell().click();
    }

    // Action to open the profile dropdown or navigate to the profile page
    clickProfileIcon() {
        this.getProfileIcon().click();
    }
    // ... getSearchBar() is correct ...
    getSearchBar() {
        return cy.get('input[placeholder="Search Students, Subjects ..."]');
    }

    // FIX 1: Combined method for reliable typing/submission
    typeAndSubmitSearch(query) {
        // This is necessary because typing and pressing Enter separately failed
        this.getSearchBar().type(query + '{enter}');
    }

    // FIX 2: Method to forcefully click the Nth subject
    clickNthSubjectInDropdown(index) {
        // We use {force: true} because the parent element is setting display: none,
        // which prevents the click even if the element is functionally active.
        cy.get('.search-bar-dropdown-body-content h6').eq(index).click({ force: true });
    }
    // ... other methods ...
}


// Export a single instance of the class so you can easily import it into tests
export default new HeaderPage();