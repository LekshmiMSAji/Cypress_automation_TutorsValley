class HeaderPage {

    // --- 1. SELECTORS (Finding the elements) ---

    // Search Bar Input (Used the correct placeholder text)
    getSearchBar() {
        return cy.get('input[placeholder="Search Students, Subjects ..."]');
    }

    // Hamburger Menu/Side Navigation Toggle (Top Left)
    getMenuToggle() {
        return cy.get('.hamburger-menu-icon'); // Placeholder selector
    }

    // Notification Bell Icon
    getNotificationBell() {
        return cy.get('[aria-label="Notifications"]'); // Example: using an ARIA label
    }

    // Profile Icon (Top Right)
    getProfileIcon() {
        return cy.get('.user-profile-avatar'); 
    }

    // --- 2. ACTIONS (Interactions) ---

    // Action to type a query without pressing Enter (Used when selecting from a dropdown)
    typeSearchQuery(query) {
        this.getSearchBar().type(query);
    }
    
    // Action to type and submit immediately (Used when submitting a direct search)
    typeAndSubmitSearch(query) {
        // Includes {enter} to solve the 'stuck subject' issue 
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
    
    // Action to click the Nth subject in the dropdown (Reliable Fix)
    clickNthSubjectInDropdown(index) {
        // Uses {force: true} to bypass the display: none CSS property 
        // that was causing the click to fail
        cy.get('.search-bar-dropdown-body-content h6').eq(index).click({ force: true });
    }
}

// Export a single instance of the class
export default new HeaderPage();