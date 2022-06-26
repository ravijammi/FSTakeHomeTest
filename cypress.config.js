const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "t4ki3b",
  env: {
    baseUrl: 'https://fruitshoppe.firebaseapp.com/#/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
