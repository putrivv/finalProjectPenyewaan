import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000/',
		specPattern: [
            'cypress/unit/**/*.cy.{js,jsx,ts,tsx}',
            'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
        ],
		setupNodeEvents(on, config) {
			
		},
	},
});