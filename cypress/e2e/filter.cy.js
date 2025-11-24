import HeaderPage from '../pages/HeaderPage'; 

// --- Configuration Constants ---
// Placeholder options to filter out from dropdown lists
const INVALID_OPTIONS = ['', 'Select Option', '11test', 'Text course'];
// Selector for the tutor cards (Used to count results)
const TUTOR_CARD_SELECTOR = '.tutor-card-wrapper'; 
// API route to intercept for result synchronization
const TUTOR_API_ROUTE = '**/api/v1/find/tutor?**'; 
// Exact text content of the zero results message (used for secondary assertion)
const NO_TUTORS_MATCH_MESSAGE = 'No tutors match your search criteria';

// !!! CRITICAL: YOU MUST DEFINE THIS SELECTOR !!!
// Use the unique class/ID of the container element that holds the 'No tutors match...' message.
const NO_RESULTS_SELECTOR = '.empty-state-message-container'; // <<<--- REPLACE WITH YOUR REAL SELECTOR

describe('Tutor Search and Filter Feature', () => {

    const userEmail = Cypress.env('testUser').email;
    const userPassword = Cypress.env('testUser').password;
    let initialTutorCount; 

    beforeEach(() => {
        cy.loginWithUI(userEmail, userPassword);
        // Intercept API call to wait for data before checking the UI
        cy.intercept('GET', TUTOR_API_ROUTE).as('getTutors');
        
        // Handle known application error gracefully
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes("Cannot read properties of undefined (reading 'data')")) {
                cy.log("⚠️ Ignoring known application error:", err.message);
                return false;
            }
        });
    });


    it('should test combinations of Level, Subject, and Gender filters with dynamic assertions', () => {

        const searchText = 'Maths';
        const subjectIndexToClick = 2; // Example index

        // --- 1. INITIAL NAVIGATION AND DATA CAPTURE ---
        cy.log('*** 1. Initial Navigation and Setup ***');

        cy.get('input[placeholder="Search Students, Subjects ..."]', { timeout: 10000 })
            .type(searchText, { force: true }); 

        HeaderPage.clickNthSubjectInDropdown(subjectIndexToClick);

        cy.contains('Highly Experienced GCSE Maths Tutors', { timeout: 10000 })
            .should('be.visible');

        // Wait for the initial data fetch request to complete
        cy.wait('@getTutors', { timeout: 15000 }).then(() => {
            
            // Check DOM count immediately after API completes
            const countFromDOM = Cypress.$(TUTOR_CARD_SELECTOR).length;
            initialTutorCount = countFromDOM;
            cy.log(`Initial Tutor Count: ${initialTutorCount}`);

            // 🎯 ASSERTION: Check initial page state (tutors found vs. zero results)
            if (initialTutorCount === 0) {
                 // FIX: Asserting on the container selector (more robust than just text)
                 cy.get(NO_RESULTS_SELECTOR).should('be.visible');
                 // Secondary check for text content
                 cy.contains(NO_TUTORS_MATCH_MESSAGE).should('be.visible');
            } else {
                 cy.contains('We Found', { timeout: 10000 }).should('be.visible');
            }
        });


        // --- 2. PREPARE FILTER OPTIONS ---
        cy.log('*** 2. Preparing Static Selectors ***');

        cy.get('select[name="level"]').as('LevelSelect');
        cy.get('select[name="gender"]').as('GenderSelect');
        
        cy.get('[name="sortBy"]').select('Most Rated')
            .should('have.value', 'most-rated'); 


        // --- 3. EXECUTE TRIPLE NESTED LOOPS ---
        cy.log('*** 3. Starting Triple Nested Filter Combination Test ***');

        // LEVEL LOOP
        cy.get('@LevelSelect').find('option').then(($levelOptions) => {
            const levelTexts = [...$levelOptions].map(opt => opt.text.trim()).filter(text => text !== '');

            cy.wrap(levelTexts).each((levelText) => {
                cy.log(`*** STARTING LEVEL: ${levelText} ***`);
                cy.get('@LevelSelect').select(levelText)
                    // 🎯 ASSERTION: Verify Level Select is Active
                    .find(':selected').should('have.text', levelText);
                
                // SUBJECT LOOP
                cy.get('select[name="subject"]').should('not.be.disabled').find('option').then(($subjectOptions) => {
                    const subjectTexts = [...$subjectOptions].map(opt => opt.text.trim());
                    const validSubjectTexts = subjectTexts.filter(text => !INVALID_OPTIONS.includes(text));

                    cy.wrap(validSubjectTexts).each((subjectText) => {
                        cy.log(`-> Subject: ${subjectText}`);
                        
                        cy.get('select[name="subject"]').select(subjectText)
                            // 🎯 ASSERTION: Verify Subject Select is Active
                            .find(':selected').should('have.text', subjectText);
                        
                        // GENDER LOOP
                        cy.get('@GenderSelect').find('option').then(($genderOptions) => {
                            const genderTexts = [...$genderOptions].map(opt => opt.text.trim()).filter(text => text !== '');

                            cy.wrap(genderTexts).each((genderText) => {
                                cy.log(`Testing Combination: L=${levelText}, S=${subjectText}, G=${genderText}`);

                                cy.get('@GenderSelect').select(genderText)
                                    // 🎯 ASSERTION: Verify Gender Select is Active
                                    .find(':selected').should('have.text', genderText);

                                // Wait for the new filtered results API request to complete
                                cy.wait('@getTutors', { timeout: 15000 }); 

                                // --- FINAL ASSERTIONS (Tutor Count and Zero Results) ---
                                
                                cy.get('body').then($body => {
                                    const currentTutorCount = $body.find(TUTOR_CARD_SELECTOR).length;

                                    if (currentTutorCount > 0) {
                                        // 🎯 ASSERTION A: Tutors were found
                                        cy.log(`✅ Success: Tutors found. Current Count: ${currentTutorCount}`);
                                        cy.contains('We Found').should('be.visible');
                                        expect(currentTutorCount).to.be.lte(initialTutorCount); 
                                    } else {
                                        // 🎯 ASSERTION B: Zero tutors found
                                        cy.log(`⚠️ Zero Results Expected/Found for: L=${levelText}, S=${subjectText}, G=${genderText}`);
                                        
                                        // FIX: Check the container selector
                                        cy.get(NO_RESULTS_SELECTOR).should('be.visible');
                                        cy.contains('We Found').should('not.exist');
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });

        cy.log('*** Triple Nested filter test complete. ***');
    });
});