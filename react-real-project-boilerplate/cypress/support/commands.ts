/// <reference types="cypress" />

Cypress.Commands.add("login",  () => {
    // Arrange
    const user = Cypress.env('username'); // Loading environment variables from cypress.config.ts file
    const password = Cypress.env('password');

    // Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value',password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('contain', '/submodule-list');
});

Cypress.Commands.add("submoduleListLinks",  () => {
    // Arrange

    // Act
    cy.findByRole('main').as('main');
        
    cy.get('@main').should('exist');

    cy.get('@main').findAllByRole('link').as('linkListItem');

    // Assert
    cy.get('@linkListItem').should('have.length.at.least', 2);
});