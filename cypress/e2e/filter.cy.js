import HeaderPage from '../pages/HeaderPage'; 

describe('Search Tutors Feature', () => {
    
    beforeEach(() => {
      
          cy.loginWithUI('ninimariamvarghese+223@techversantinfotech.com', 'Tech@Valley01'); 
    });

    // In cypress/e2e/filter.cy.js

it('should successfully filter the tutor list by name', () => {
    const querySubject = 'Maths'; 
    const expectedTutorName = 'Carmen Pergold'; // Example for assertion
    
    // Type the query (triggers the dropdown)
    HeaderPage.typeSearchQuery(querySubject); // Use the simple type since you want to click a suggestion

    // Click the 3rd result (index 2 for the 3rd item)
    HeaderPage.clickNthSubjectInDropdown(2); 

    // ASSERTION: Verify the resulting page (e.g., the subject listing page)
    // cy.url().should('include', '/subjects/maths'); 
});    
       

describe('Comprehensive Subject Filter Automation', () => {
    
    

    it('should search for Maths, click GCSE subject, and verify final filters', () => {
        const query = 'Maths'; 
        const subjectIndexToClick = 2; // Index 2 = the 3rd item (e.g., Maths [GCSE])
        
        // --- 1. SEARCH ACTION (Type and reveal dropdown) ---
        HeaderPage.typeSearchQuery(query); 
        
        // --- 2. CLICK DROPDOWN ITEM ---
        HeaderPage.clickNthSubjectInDropdown(subjectIndexToClick);
        
        // --- 3. VERIFICATION: ASSERTION ON FINAL FILTER PAGE ---
        
        // A. Verify navigation to the subject results page
        cy.url().should('include', '/tutor/GCSE-Maths'); 
        
        // B. Verify the "Selected Filters" box is present and contains 'Maths'
        cy.get('.selected-filters').should('contain', 'Maths');

        // C. Verify the filter controls (Level, Subject, Gender) are set correctly
        // We target the filter controls area based on your image.
        const filterControlSelector = '.filter-control-container'; // Placeholder for the filter box (red box)
        
        // Verify Level dropdown shows GCSE
        cy.get(filterControlSelector).contains('Level').next().should('contain', 'GCSE');
        
        // Verify Subject dropdown shows Maths
        cy.get(filterControlSelector).contains('Subject').next().should('contain', 'Maths');
        
        // Verify the total number of tutors found is present (e.g., "We Found 133 Tutors")
        cy.contains('We Found').should('be.visible');
    });
});
                
 
});