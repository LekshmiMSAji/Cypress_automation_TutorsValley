const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // If you were to use external environment files, 
      // you would modify the config object here.
      
      return config; // Always return the config object
    },
    
    // --- ADD THIS 'env' BLOCK ---
    env: {
        testUser: {
            email: 'ninimariamvarghese+223@techversantinfotech.com',
            password: 'Tech@Valley01'
        }
    }
    // ----------------------------
  },
});