describe('Podcasts list', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to a podcast detail page', () => {
    cy.get('.podcast-grid').should('be.visible');
    cy.get('[data-testid="podcast-card"]').should('have.length.at.least', 1);
    cy.get('.podcast-grid > [data-testid="podcast-card"]').first().click();
    cy.url().should('include', '/podcast/');
    cy.get('.podcast-detail-layout').should('be.visible');
  });
});
