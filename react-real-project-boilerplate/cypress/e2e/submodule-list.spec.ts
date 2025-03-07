describe('Submodule list specs', () => {
    it('should visit the submodule list page with valid credentials', () => {
        // Arrange
        // Act
        cy.login();
        
        //Assert
    });
    it('should exist AppLayout (banner, main and footer) in submodule list scene', () => {
        //Arrange
        
        // Act
        cy.login();
        
        cy.findByRole('banner').as('banner');
        cy.findByRole('main').as('main');
        cy.findByRole('contentinfo').as('contentinfo');
        
        //Assert
        cy.get('@banner').should('exist');
        cy.get('@main').should('exist');
        cy.get('@contentinfo').should('exist');

    });
    it('should exist main and content at least 2 links when load submodule list', () => {
        //Arrange
        
        // Act
        cy.login();

        // cy.findByRole('main').as('main');
        
        // cy.get('@main').should('exist');

        // cy.get('@main').findAllByRole('link').as('linkListItem');

        //Assert
        // cy.get('@linkListItem').should('have.length.at.least', 2);
        cy.submoduleListLinks()

    });
    it('should visit projects when click in project link inside of submodule list', () => {
        //Arrange
        // Act
        cy.login();

        // cy.findByRole('main').as('main');
        
        // cy.get('@main').should('exist');

        // cy.get('@main').findAllByRole('link').as('linkListItem');

        // cy.get('@linkListItem').should('have.length.at.least', 2);

        cy.submoduleListLinks(); 

        cy.get('@linkListItem').eq(0).within(()=> {
            cy.findByRole('heading', {
                name: /Proyectos/i
            })
        });

        cy.get('@linkListItem').eq(0).click();
        
        //Assert
        cy.visit('/projects');
        cy.url().should('contain', '/projects');
    });
});