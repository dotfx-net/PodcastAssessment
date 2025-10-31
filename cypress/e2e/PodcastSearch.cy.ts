describe('Podcast search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('searches for an unexistent podcast', () => {
    cy.get('[data-testid="podcast-card"]').should('have.length.at.least', 1);

    // count updates with filter
    cy.get('[data-testid="podcast-count"]').invoke('text').then((total) => {
      cy.get('[data-testid="podcast-search"]').clear().type('-non-existent-');
      cy.get('[data-testid="podcast-card"]').should('have.length', 0);
      cy.get('[data-testid="podcast-search"]').clear();
      cy.get('[data-testid="podcast-card"]').its('length').should('eq', Number(total));
    });
  });
});
